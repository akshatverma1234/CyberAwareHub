"use client";

import React, { createContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArticleCard from "../ArticleCards/ArticleCard";
import { articles } from "@/assets/article";
import { CircularProgress } from "@mui/material";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-full h-[400px] bg-[#06080e] text-white  flex items-center justify-center p-8">
      {isLoading && (
        <div className="w-full flex justify-center py-20">
          <CircularProgress color="success" className="!text-white" />
        </div>
      )}
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <ArticleCard
              id={article.id}
              title={article.title}
              summary={article.summary}
              slug={article.slug}
              image={article.image}
              author={article.author}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Articles;
