import React from "react";

import ArticlesClient from "../ClientPages/ArticleClient";
import { getArticles } from "@/app/api/lib/fetchingData/getArticles";

export const dynamic = "force-dynamic";

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
