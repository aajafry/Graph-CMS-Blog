import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="container shadow-lg mx-auto px-10 mb-8 relative lg:sticky top-0 -z-999">
      <div className="  w-full py-6 inline-block">
        <div className="md:float-left block">
          <span className="cursor-pointer font-bold text-2xl uppercase">
            <Link href="/">cms blog</Link>
          </span>
        </div>
        <div className=" hidden md:float-right md:contents">
          <span className="md:float-right cursor-pointer font-semibold ml-4 align-middle mt-2 uppercase">
            <Link href="/author">Authors</Link>
          </span>
        </div>
      </div>
    </header>
  );
}
