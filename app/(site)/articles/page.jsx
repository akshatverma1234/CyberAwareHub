import React from "react";
import { getArticles } from "@/app/api/lib/fetchingData/getArticles";
import ArticleSectionClient from "@/components/ClientPages/ArticleSectionClient";

const ArticlesPage = async () => {
  let articles = [];
  let error = null;

  try {
    articles = await getArticles();
  } catch (err) {
    console.error(err);
    error = "Failed to load articles from the database.";
  }

  return (
    <div className="bg-[#06080e] w-full min-h-[100vh]">
      <div className="py-12 px-4 sm:px-8 lg:px-[80px] relative">
        <div className="w-full flex items-center justify-center">
          <div className="mb-4 text-center mt-12 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              Knowledge Base
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Practical guides, deep dives, and best practices for a safer
              digital world
            </p>
          </div>
        </div>
        <ArticleSectionClient initialArticles={articles} initialError={error} />
      </div>
    </div>
  );
};

export default ArticlesPage;
