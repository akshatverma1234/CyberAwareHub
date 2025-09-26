import React, { Suspense } from "react";
import DotGrid from "@/components/Animation/DotGrid";
import CommunityStoriesClient from "@/components/ClientPages/CommunityStoriesClient";
import { getCommunityStories } from "@/app/api/lib/fetchingData/getCommunities";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";

export const revalidate = 60;

async function CommunityStudyListWrapper() {
  const data = await getCommunityStories();
  return <CommunityStoriesClient initialData={data} />;
}

const CommunityStoriesPage = async () => {
  return (
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
      <div className="w-full min-h-[100vh]">
        <div className="container mx-auto px-6 py-22">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-20">
                {[...Array(3)].map((_, i) => (
                  <SkeletonLoader type="communityStudy" key={`skeleton-${i}`} />
                ))}
              </div>
            }
          >
            <CommunityStudyListWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CommunityStoriesPage;
