import Head from "next/head";
import { Author, Widgets } from "../../components/index";
import { getAuthors } from "../../services/index";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog | Author </title>
        <meta name="description" content="CMS Blog Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.map((post) => (
            <Author key={post.slug} author={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="relative lg:sticky lg:top-32">
            <Widgets />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getAuthors()) || [];
  return {
    props: { posts },
  };
}
