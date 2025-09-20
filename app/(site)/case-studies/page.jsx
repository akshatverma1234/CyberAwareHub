import React from "react";
import DotGrid from "@/components/Animation/DotGrid";
import CaseStudyList from "@/components/ClientPages/CaseStudyList";
import { getCaseStudies } from "@/app/api/lib/fetchingData/getCaseStudy";

export const dynamic = "force-dynamic";

const CaseStories = async () => {
  const caseStudiesData = await getCaseStudies();

  return (
    <div className="w-full min-h-[100vh]">
      <div className="py-12 px-4 sm:px-8 lg:px-[80px] relative">
        <div className="w-full flex items-center justify-center">
          <div className="mb-4 text-center mt-12 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              📌 Cyber Attack Case Studies
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore real-world cybercrime cases, their impact, and lessons
              learned to stay safe online
            </p>
          </div>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-center">
        <CaseStudyList initialData={caseStudiesData} />
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -100,
        }}
      >
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#1f2022cb"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="bg-[#06080e]"
        />
      </div>
    </div>
  );
};

export default CaseStories;
