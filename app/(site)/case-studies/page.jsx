"use client";
import React, { useContext } from "react";
import CaseStudies from "@/components/CaseStudies/CaseStudies";
import { IoMdAdd } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { MyContext } from "@/context/AppContext";
import { useAuth } from "@clerk/nextjs";
import Skeleton from "react-loading-skeleton";

const CaseStories = () => {
  const context = useContext(MyContext);

  return (
    <div className="bg-[#06080e] w-full min-h-[100vh]">
      <div className="py-22 px-8 relative">
        <div className="w-full px-20 flex items-center justify-center">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              📌 Cyber Attack Case Studies
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore real-world cybercrime cases, their impact, and lessons
              learned to stay safe online
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CaseStudies />
        </div>
      </div>
    </div>
  );
};

export default CaseStories;
