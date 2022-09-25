import Head from "next/head";
import React from "react";
import { getAuthors, getAuthorsPost } from "../../services/index";

import { PostsCard, Widgets } from "../../components/index";

export default function CategoryDetails({ posts }) {
  return (
    <div className=" container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog | Author </title>
        <meta name="description" content="CMS Blog Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className=" col-span-1 lg:col-span-8">
          {posts?.map((post) => (
            <PostsCard key={post.node.slug} post={post.node} />
          ))}
        </div>
        <div className=" col-span-1 lg:col-span-4">
          <div className="relative lg:sticky lg:top-32">
            <Widgets />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time.
export async function getStaticProps({ params }) {
  const posts = await getAuthorsPost(params.slug);
  return {
    props: {
      posts,
    },
  };
}
// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const authors = await getAuthors();
  return {
    paths: authors.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
