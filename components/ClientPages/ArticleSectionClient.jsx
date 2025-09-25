"use client";
import React from "react";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const ArticleSectionClient = ({ initialArticles, initialError }) => {
  if (initialError) {
    return (
      <div className="bg-[#06080e] w-full min-h-[100vh] flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {initialError}</div>
      </div>
    );
  }

  if (initialArticles.length === 0) {
    return (
      <div className="text-center text-gray-400 text-xl">No articles found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {initialArticles.map((article) => (
        <div
          key={article._id}
          className="bg-[#ffff] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-1 border-amber-50"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
              {article.title}
            </h2>

            <p className="text-gray-700 mb-4 line-clamp-3">{article.summary}</p>

            <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
              <span>By {article.author}</span>
              <span>{article.publishedDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={`/articles/${article.slug}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleSectionClient;
