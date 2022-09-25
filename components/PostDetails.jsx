import Link from "next/link";
import React from "react";
import Moment from "react-moment";

import { BsCalendarDate } from "react-icons/bs";

export default function PostDetails({ post }) {
  return (
    <div key={post.title} className=" shadow-lg rounded-lg pb-12 mb-8 lg:p-8">
      <div className=" relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className=" px-4 lg:px-0">
        <div className=" flex items-center w-full mb-8">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="w-10 h-10 rounded-full align-middle"
            />
            <p className="text-gray-700 inline align-middle text-lg ml-4">
              <Link href={`/author/${post.author.slug}`}>
                {post.author.name}
              </Link>
            </p>
          </div>
          <div className=" font-medium text-gray-700">
            <span className=" flex items-center justify-center">
              <BsCalendarDate className="mr-4 text-xl" />
              <Moment format="MMM DD, YYYY">{post.createdAt}</Moment>
            </span>
          </div>
        </div>
        <h2 className=" text-2xl font-semibold mb-8"> {post.title}</h2>

        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      </div>
    </div>
  );
}
