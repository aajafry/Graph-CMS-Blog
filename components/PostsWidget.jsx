import React, { useEffect, useState } from "react";

import Link from "next/link";
import Moment from "react-moment";

import { getRecentPosts, getRelatedPosts } from "../services/index";

export default function PostsWidget({ categories, slug }) {
  const [posts, SetPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) => SetPosts(result));
    } else {
      getRecentPosts().then((result) => SetPosts(result));
    }
  }, [categories, slug]);

  return (
    <div className="rounded-lg shadow-lg p-8 mb-8">
      <h2 className=" text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Post" : "Recent Posts"}
      </h2>
      {posts.map((post) => (
        <div key={post.slug} className="flex items-center w-full mb-4">
          <div className="flex-none w-16">
            <img
              className="align-middle rounded-full h-16 w-16"
              src={post.featuredImage.url}
              alt={post.title}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              <Moment format="MMM DD, YYYY">{post.createdAt}</Moment>
            </p>

            <p className="text-md">
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
