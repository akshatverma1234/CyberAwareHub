import React from "react";
import DotGrid from "@/components/Animation/DotGrid";
import CommunityStoriesClient from "@/components/ClientPages/CommunityStoriesClient";

export const dynamic = "force-dynamic";

async function getCommunityStories() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/community-stories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch community stories");
  }

  const data = await res.json();
  return data.filter((story) => story.status === "approved");
}

const CommunityStoriesPage = async () => {
  const caseStoriesData = await getCommunityStories();

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
          <CommunityStoriesClient initialData={caseStoriesData} />
        </div>
      </div>
    </div>
  );
};

export default CommunityStoriesPage;
