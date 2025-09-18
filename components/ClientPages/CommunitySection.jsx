"use client";
import React, { useContext } from "react";
import MagicBento, { MagicBentoContainer } from "../Animation/MagicBento";
import Link from "next/link";
import { Button } from "@mui/material";
import { MyContext } from "@/context/AppContext";

const CommunitySection = () => {
  const context = useContext(MyContext);
  const communityStories = [
    {
      label: "Phishing Attack",
      title: "How I Detected a Fake Bank Email",
      description:
        "A step-by-step experience of how I spotted a phishing attempt and secured my account.",
    },
    {
      label: "Ransomware Incident",
      title: "What I Learned After a Ransomware Scare",
      description:
        "Sharing lessons from an attempted ransomware attack on my small business.",
    },
    {
      label: "Awareness",
      title: "Best Practices I Follow Daily",
      description:
        "Simple daily habits that keep me safe from common online scams.",
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
            data-aos="fade-down"
          >
            Community Contributions
          </h2>
          <p
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            data-aos="fade-up"
          >
            Learn from real-world cybersecurity experiences shared by our
            community, and contribute your own story to help others stay safe
            online.
          </p>
        </div>

        <div className="mb-16 px-6">
          <h3
            className="text-2xl font-semibold mb-8 text-center text-purple-200"
            data-aos="fade-right"
          >
            Latest Community Stories
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {communityStories.map((story, i) => (
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
                      <Link href="/community-stories">
                        <span className="text-sm text-purple-300 font-medium tracking-wide uppercase">
                          {story.label}
                        </span>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-4 text-white leading-tight">
                        {story.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </MagicBento>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center px-6">
          <div className="w-full sm:w-[500px]">
            <MagicBento
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={18}
              glowColor="132, 0, 255"
              className="h-full min-h-[220px]"
            >
              <div className="flex flex-col justify-between h-full text-center px-6 py-8">
                <h4
                  className="font-bold text-2xl mb-4 text-white leading-tight"
                  data-aos="zoom-in"
                >
                  Your Story Can Help Others
                </h4>
                <p
                  className="text-gray-300 text-sm leading-relaxed mb-6"
                  data-aos="zoom-in-up"
                >
                  Inspire, educate, and protect others by submitting your
                  real-world cyber incident or success story. Together, we build
                  stronger awareness.
                </p>
                <div className="flex justify-center" data-aos="zoom-out-up">
                  <Button
                    className="!px-8 !py-3 !rounded-xl !border-2 !border-purple-500 !text-purple-200 hover:!bg-purple-600 hover:!text-white !transition-all !font-medium !transform hover:!scale-105 hover:!shadow-lg hover:!shadow-purple-500/25"
                    onClick={() =>
                      context.setOpenPanel({
                        open: true,
                        model: "addCaseStudy",
                      })
                    }
                  >
                    Submit Your Story
                  </Button>
                </div>
              </div>
            </MagicBento>
          </div>
        </div>
      </section>
    </MagicBentoContainer>
  );
};

export default CommunitySection;
