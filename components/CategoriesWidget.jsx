import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getCategories } from "../services/index";

export default function CategoriesWidget() {
  const [categories, SetCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCat) => SetCategories(newCat));
  }, []);

  return (
    <div className="rounded-lg shadow-lg p-8 mb-8">
      <h2 className=" text-xl mb-8 font-semibold border-b pb-4">Categories</h2>
      {categories.map((category) => (
        <div key={category.slug} className="flex items-center w-full mb-4">
          <p className=" border-b w-full pb-4 mb-4 cursor-pointer">
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
