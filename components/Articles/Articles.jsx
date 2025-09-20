import React from "react";

import ArticlesClient from "../ClientPages/ArticleClient";

export const dynamic = "force-dynamic";
async function getArticles() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/articles`, {
    cache: "no-store",
  });
  if (!res.ok) {
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
    console.error(error);
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
