"use client";
import React from "react";
import MagicBento, { MagicBentoContainer } from "../Animation/MagicBento";
import { Button } from "@mui/material";
import Link from "next/link";

const FeaturedSection = () => {
  const featuredArticles = [
    {
      title: "5 Simple Cyber Hygiene Practices Everyone Should Follow",
      description:
        "Quick, effective steps to boost your online safety and reduce the risk of cyber threats.",
      label: "Read More →",
    },
    {
      title: "The Rise of Phishing Attacks in 2025",
      description:
        "Why phishing remains the #1 cyber threat — and how to spot the red flags.",
      label: "Read More →",
    },
    {
      title: "Cloud Security Best Practices for Businesses",
      description:
        "Practical measures companies can adopt to secure sensitive data in the cloud.",
      label: "Read More →",
    },
  ];

  const featuredCaseStudies = [
    {
      title: "WannaCry Ransomware Attack – A Global Wake-Up Call",
      description:
        "How a single ransomware strain spread across 150 countries, crippling hospitals and businesses worldwide.",
      label: "Explore Case Study →",
    },
    {
      title: "SolarWinds Supply Chain Attack",
      description:
        "A sophisticated attack that compromised government agencies and corporations through software updates.",
      label: "Explore Case Study →",
    },
  ];

  return (
    <MagicBentoContainer
      enableSpotlight={true}
      spotlightRadius={300}
      glowColor="132, 0, 255"
    >
      <section className="py-16 bg-[#060010] text-white">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            data-aos="zoom-in"
          >
            Featured Content
          </h2>
          <p
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            data-aos="fade-up"
          >
            Explore the latest cybersecurity insights, trending articles, and
            real-world attack case studies.
          </p>
        </div>

        <div className="mb-16 px-6">
          <h3
            className="text-2xl font-semibold mb-8 text-center text-purple-200"
            data-aos="fade-right"
          >
            Latest Articles
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {featuredArticles.map((article, i) => (
              <div key={i} className="w-full sm:w-[350px]">
                <MagicBento
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={300}
                  particleCount={12}
                  glowColor="132, 0, 255"
                  className="h-full min-h-[200px]"
                >
                  <div
                    className="flex flex-col justify-between h-full"
                    data-aos="fade-left"
                  >
                    <div className="mb-4">
                      <Link href="/articles">
                        <span className="text-sm text-purple-300 font-medium tracking-wide uppercase">
                          {article.label}
                        </span>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-4 text-white leading-tight">
                        {article.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </MagicBento>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 px-6">
          <h3
            className="text-2xl font-semibold mb-8 text-center text-purple-200"
            data-aos="flip-up"
          >
            Recent Case Studies
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {featuredCaseStudies.map((study, i) => (
              <div key={i} className="w-full sm:w-[400px]">
                <MagicBento
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={300}
                  particleCount={15}
                  glowColor="132, 0, 255"
                  className="h-full min-h-[220px]"
                >
                  <div
                    className="flex flex-col justify-between h-full"
                    data-aos="fade-right"
                  >
                    <div className="mb-4">
                      <Link href="/case-studies">
                        <span className="text-sm text-purple-300 font-medium tracking-wide uppercase">
                          {study.label}
                        </span>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-4 text-white leading-tight">
                        {study.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {study.description}
                      </p>
                    </div>
                  </div>
                </MagicBento>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/articles">
              <Button
                className="!px-8 !py-3 !rounded-xl !border-2 !border-purple-500 !text-purple-200 hover:!bg-purple-600 hover:!text-white !transition-all !font-medium !transform hover:!scale-105 hover:!shadow-lg hover:!shadow-purple-500/25"
                data-aos="zoom-out-up"
              >
                View All Articles
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                className="!px-8 !py-3 !rounded-xl !border-2 !border-purple-500 !text-purple-200 hover:!bg-purple-600 hover:!text-white !transition-all !font-medium !transform hover:!scale-105 hover:!shadow-lg hover:!shadow-purple-500/25"
                data-aos="zoom-out-down"
              >
                View All Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MagicBentoContainer>
  );
};

export default FeaturedSection;
