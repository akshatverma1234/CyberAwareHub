"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArticleCard from "../ArticleCards/ArticleCard";

const ArticlesClient = ({ articles }) => {
  return (
    <div className="w-full min-h-[500px] bg-[#202020] text-white flex items-center justify-center p-8">
      {articles.length === 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <p className="text-gray-400">No articles available.</p>
        </div>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
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
      )}
    </div>
  );
};

export default ArticlesClient;
