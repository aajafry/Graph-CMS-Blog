import Head from "next/head";
import React from "react";
import {
  Author,
  Comments,
  CommentsFrom,
  PostDetails,
  Widgets,
} from "../../components/index";

import { getPostDetails, getPosts } from "../../services/index";

export default function SinglePost({ post }) {
  return (
    <div className=" container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog | Blog </title>
        <meta name="description" content="CMS Blog Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className=" col-span-1 lg:col-span-8">
          <PostDetails post={post} />
          <Author author={post.author} />
          <CommentsFrom slug={post.slug} />
          <Comments slug={post.slug} />
        </div>

        <div className=" col-span-1 lg:col-span-4">
          <div className="relative lg:sticky lg:top-32">
            <Widgets
              categories={post.categories.map((category) => category.slug)}
              slug={post.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time.
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
  };
}
// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
