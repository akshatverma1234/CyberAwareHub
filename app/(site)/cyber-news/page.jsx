"use client";
import React, { useEffect, useState } from "react";
import NewsBox from "@/components/NewsBox/NewsBox";

const CyberNews = () => {
  return (
    <div className=" text-white py-10 px-6 w-full min-h-screen">
      <div className="text-center mb-2 mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold text-white mb-2">
          📰 Latest Cybersecurity News
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Real cybersecurity incidents shared by our community members
        </p>
      </div>

      <NewsBox />
    </div>
  );
};

export default CyberNews;
