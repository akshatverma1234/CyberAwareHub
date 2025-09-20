import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Articles from "../Articles/Articles";
import NewsBox from "../NewsBox/NewsBox";
import SplitText from "../Animation/SplitText";
import ScrollVelocity from "../Animation/ScrollVelocity";
import LiquidEther from "../Animation/LiquidEther";
import CaseStudyList from "./../ClientPages/CaseStudyList";
import FeaturedSection from "../ClientPages/FeaturedSection";
import CommunitySection from "../ClientPages/CommunitySection";
import "aos/dist/aos.css";

export const dynamic = "force-dynamic";
async function getAllCaseStudies() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/admin/caseStudies`, {
    cache: "no-store", // 🚀 always fresh
  });
  if (!res.ok) {
    throw new Error("Failed to fetch case studies data");
  }

  return res.json();
}

const HomePage = async ({ velocity }) => {
  const allCaseStudies = await getAllCaseStudies();
  const limitedCaseStudies = allCaseStudies.slice(0, 6);
  return (
    <>
      <div
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <LiquidEther
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        </div>
        <div className="w-full">
          <div className="w-full min-h-[650px] flex items-center justify-center px-4 sm:px-8 lg:px-[80px] py-12">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h1 className="text-white font-bold text-4xl mt-8 md:mt-0 sm:text-5xl lg:text-6xl leading-tight">
                  <SplitText
                    text="Stay Safe in the"
                    className=""
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                  <br />
                  <SplitText
                    text="Digital World"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                </h1>

                <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
                  Get the latest articles, case studies, and real-life stories
                  about{" "}
                  <span className="text-cyan-400 font-semibold">
                    cyber threats
                  </span>{" "}
                  — simplified in your language.
                </p>

                <div className="mt-8">
                  <Link href="/case-studies">
                    <Button
                      variant="outlined"
                      className="!text-[#00FFFF] !border-2 !border-[#00FFFF] !bg-transparent !font-semibold !px-6 !py-3 !rounded-lg hover:!bg-[#00FFFF] hover:!text-black !transition-all !duration-300 !ease-in-out"
                    >
                      Share Your Case Studies
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-lg aspect-square">
                  <iframe
                    src="https://lottie.host/embed/d0da0805-295b-40b6-893e-9f2fe83f9cda/agYDIBId9H.lottie"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4">
            <ScrollVelocity
              texts={[
                "Empowering Ideas • Sharing Knowledge • Driving Innovation",
              ]}
              velocity={velocity}
              className="custom-scroll-text text-white text-2xl sm:text-3xl lg:text-[35px]"
            />
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <hr className="w-[90%] bg-gray-600 border-0 h-[1px]" />
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-[#202020] w-[95%] px-4 sm:px-8 lg:px-10 rounded-[25px]">
            <div className="flex justify-center">
              <h1
                className="text-4xl font-bold mt-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                data-aos="fade-down"
              >
                Knowledge Base
              </h1>
            </div>
            <div data-aos="fade-up">
              <Articles />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <hr className="w-[90%] bg-gray-600 border-0 h-[1px]" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-10 flex items-center justify-center">
          <h1
            className="text-4xl font-bold mb-8 mt-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            data-aos="fade-down"
          >
            Threat Case Studies
          </h1>
        </div>
        <div data-aos="fade-up" className="flex items-center justify-center">
          <CaseStudyList initialData={limitedCaseStudies} />
        </div>
        <div className="flex justify-center py-8">
          <Link href="/case-studies">
            <button
              className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base px-8 py-3 cursor-pointer hover:bg-[#5633cc] transition-all duration-300 shadow-lg hover:shadow-xl"
              data-aos="fade-up-right"
            >
              View More Case Studies →
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center py-4">
          <hr className="w-[90%] bg-gray-600 border-0 h-[1px]" />
        </div>
        <div className=" w-full px-4 sm:px-8 lg:px-10 flex items-center justify-center">
          <h1
            className="text-4xl font-bold mb-8 mt-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            data-aos="fade-left"
          >
            Latest Insights
          </h1>
        </div>

        <div data-aos="fade-up">
          <NewsBox limit={6} />
        </div>

        <div className="flex justify-center py-8">
          <Link href="/cyber-news">
            <button
              className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base px-8 py-3 cursor-pointer hover:bg-[#5633cc] transition-all duration-300 shadow-lg hover:shadow-xl"
              data-aos="zoom-in"
            >
              View More News →
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center py-4">
          <hr className="w-[90%] bg-gray-600 border-0 h-[1px]" />
        </div>

        <FeaturedSection />

        <div className="flex items-center justify-center py-4">
          <hr className="w-[90%] bg-gray-600 border-0 h-[1px]" />
        </div>

        <CommunitySection />
      </div>
    </>
  );
};

export default HomePage;
