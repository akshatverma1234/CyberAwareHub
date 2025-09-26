import React from "react";
import CommunityCaseStudiesAdminClient from "@/components/ClientPages/CommunityCaseStudiesAdminClient";
import { getCommunityStories } from "@/app/api/lib/fetchingData/getCommunities";

const CommunityCaseStudiesPage = async () => {
  let stories = [];
  let error = null;

  try {
    stories = await getCommunityStories();
  } catch (err) {
    console.error("Failed to fetch stories:", err);
    error = "Failed to load stories.";
  }

  return (
    <CommunityCaseStudiesAdminClient
      initialStories={stories}
      initialError={error}
    />
  );
};

export default CommunityCaseStudiesPage;
