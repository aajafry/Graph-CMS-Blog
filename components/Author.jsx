import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Author({ author }) {
  return (
    <div className=" text-center mt-20 mb-8 p-12 relative rounded-lg shadow-lg bg-gray-100">
      <div className=" absolute left-0 right-2"></div>
      <Image
        unoptimized
        src={author.photo.url}
        alt={author.name}
        height="100px"
        width="100px"
        className=" rounded-full align-middle mx-auto"
      />
      <h2 className=" font-bold text-2xl my-4">
        <Link href={`/author/${author.slug}`}>{author.name}</Link>
      </h2>
      <p className=" text-xl text-gray-600">{author.bio}</p>
    </div>
  );
}
