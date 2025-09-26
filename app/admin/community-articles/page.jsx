import React from "react";
import { getAllCommunityArticlesForAdmin } from "@/app/api/lib/fetchingData/getArticleCommunity";
import CommunityArticleAdminClient from "@/components/ClientPages/CommunityArticleAdminClient";

const CommunityArticlePage = async () => {
  let articles = [];
  let error = null;

  try {
    articles = await getAllCommunityArticlesForAdmin();
  } catch (err) {
    console.error("Failed to fetch stories:", err);
    error = "Failed to load stories.";
  }

  return (
    <CommunityArticleAdminClient
      initialStories={articles}
      initialError={error}
    />
  );
};

export default CommunityArticlePage;
