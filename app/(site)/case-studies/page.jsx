import React, { Suspense } from "react";
import DotGrid from "@/components/Animation/DotGrid";
import CaseStudyList from "@/components/ClientPages/CaseStudyList";
import { getCaseStudies } from "@/app/api/lib/fetchingData/getCaseStudy";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";

export const revalidate = 60;

async function CaseStudyListWrapper() {
  const data = await getCaseStudies();
  return <CaseStudyList initialData={data} />;
}

const CaseStories = async () => {
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
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-20">
              {[...Array(3)].map((_, i) => (
                <SkeletonLoader type="caseStudy" key={`skeleton-${i}`} />
              ))}
            </div>
          }
        >
          <CaseStudyListWrapper />
        </Suspense>
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
