"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const NewsBox = ({ limit }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/news");
        setNews(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);
  const displayedNews = limit ? news.slice(0, limit) : news;
  return (
    <>
      <div className="bg-[#06080e] h-full p-6">
        {isLoading && (
          <div className="w-full flex justify-center py-20">
            <CircularProgress color="success" className="!text-white" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNews.map((article, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-6 rounded-xl shadow-lg flex flex-col h-[400px] max-w-[500px]"
            >
              <div className="h-[200px] w-full mb-4">
                <img
                  src={article.urlToImage || "/placeholder.png"}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>

              <h3 className="font-semibold text-xl mb-2 line-clamp-2 text-white">
                {article.title}
              </h3>

              <p className="text-gray-400 text-sm mb-3">
                {" "}
                {article.description?.slice(0, 400)}...{" "}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-cyan-400 hover:underline font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsBox;
