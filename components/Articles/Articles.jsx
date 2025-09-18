import React from "react";

import SkeletonLoader from "../Loader/SkeletonLoader";
import ArticlesClient from "../ClientPages/ArticleClient";

async function getArticles() {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/articles`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    // You can now handle errors on the server without client state
    throw new Error("Failed to fetch the articles");
  }

  return res.json();
}

const Articles = async () => {
  let articles = [];
  let hasError = false;

  try {
    articles = await getArticles();
  } catch (error) {
    console.error(error); // Log the error on the server
    hasError = true;
  }

  if (hasError || !articles || articles.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#06080e] text-white flex items-center justify-center">
        <p className="text-red-400">Error loading articles.</p>
      </div>
    );
  }

  return <ArticlesClient articles={articles} />;
};

export default Articles;
