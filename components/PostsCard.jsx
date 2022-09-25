import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";

import { BsCalendarDate } from "react-icons/bs";

export default function PostsCard({ post }) {
  return (
    <div className=" shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className=" relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          unoptimized
          className="object-top absolute h-80 w-full  object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
        />
      </div>
      <h2 className=" text-center font-semibold cursor-pointer transition duration-100 mb-2 hover:text-blue-700">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className=" block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex justify-center items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <Image
            unoptimized
            className="rounded-full align-middle"
            src={post.author.photo.url}
            alt={post.author.name}
            height="40%"
            width="40%"
          />
          <p className="text-gray-700 inline align-middle text-lg ml-4">
            <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link>
          </p>
        </div>
        <div className=" font-medium text-gray-700">
          <span className=" flex items-center justify-center">
            <BsCalendarDate className="mr-4 text-xl" />
            <Moment format="MMM DD, YYYY">{post.createdAt}</Moment>
          </span>
        </div>
      </div>
      <p className=" text-center text-gray-700 text-lg font-normal px-4 lg:px-10 mb-8">
        {post.excerpt}
      </p>
      <div className=" text-center">
        <span className=" inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer capitalize transition duration-500 transform hover:translate-y-1 ">
          <Link href={`/post/${post.slug}`}>continue reading</Link>
        </span>
      </div>
    </div>
  );
}
