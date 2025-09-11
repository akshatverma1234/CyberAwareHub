"use client";

import React, { createContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArticleCard from "../ArticleCards/ArticleCard";
import { articles } from "@/assets/article";

const Articles = () => {
  return (
    <div className="w-full h-[400px] bg-[#06080e] text-white  flex items-center justify-center p-8">
      <Swiper
        slidesPerView={4}
        spaceBetween={200}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Articles;
