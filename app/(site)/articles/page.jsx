"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#06080e] w-full min-h-[100vh] flex items-center justify-center">
        <CircularProgress color="success" className="!text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06080e] w-full min-h-[100vh] flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
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
        {articles.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            No articles found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
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

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {article.summary}
                  </p>

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
        )}
      </div>
    </div>
  );
};

export default Articles;
