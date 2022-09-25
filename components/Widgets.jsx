import React from "react";
import { CategoriesWidget, PostsWidget } from "./index";

export default function Widgets({ categories, slug }) {
  return (
    <>
      <PostsWidget categories={categories} slug={slug} />
      <CategoriesWidget />
    </>
  );
}
