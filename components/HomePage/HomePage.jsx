import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Articles from "../Articles/Articles";
import CaseStudies from "../CaseStudies/CaseStudies";
import NewsBox from "../NewsBox/NewsBox";

const HomePage = () => {
  return (
    <>
      <div className="w-full h-[720px] bg-[#06080e] flex items-center justify-between px-[80px]">
        <div className="w-[100%] h-[100px] flex  justify-center flex-col">
          <h1 className="text-white font-bold text-6xl leading-tight">
            Stay Safe in the <br /> Digital World
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl">
            Get the latest articles, case studies, and real-life stories about{" "}
            <span className="text-cyan-400 font-semibold">cyber threats</span> —
            simplified in your language.
          </p>
          <div className="mt-4">
            <Link href="/case-studies">
              <Button
                variant="outlined"
                className="!text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Share Your Case Studies
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-end px-[30px]">
          <Image
            src="/wepik-export-20231026003443tjA7 1.png"
            alt="Cyber Awareness"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <hr className="w-[80%] bg-black h-[2px] text-black border border-1 border-black " />
      </div>
      <div className="bg-[#06080e] w-full px-10 flex items-center justify-between">
        <h1 className="font-bold text-[24px] tracking-[3px] text-white mt-8">
          📌 Articles
        </h1>
      </div>
      <Articles />
      <div className="flex items-center justify-center">
        <hr className="w-[80%] bg-black h-[2px] text-black border border-1 border-black" />
      </div>
      <div className="bg-[#06080e]  w-full px-10 flex items-center justify-between">
        <h1 className="font-bold text-[24px] tracking-[3px] text-white mt-8 mb-6">
          📌 Cyber Attack Case Studies
        </h1>
      </div>
      <CaseStudies limit={6} />
      <div className="flex justify-center bg-[#06080e] h-[100px] py-6">
        <Link href="/cyber-news">
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-6 cursor-pointer hover:bg-[#5633cc] transition">
            View More CaseStudies →
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <hr className="w-[80%] bg-black h-[2px] text-black border border-1 border-black" />
      </div>
      <div className="bg-[#06080e]  w-full px-10 flex items-center justify-between">
        <h1 className="font-bold text-[24px] tracking-[3px] text-white mt-8 mb-6">
          📌 Latest News
        </h1>
      </div>

      <NewsBox limit={6} />
      <div className="flex justify-center bg-[#06080e] h-[100px] py-4">
        <Link href="/cyber-news">
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-6 cursor-pointer hover:bg-[#5633cc] transition">
            View More News →
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
