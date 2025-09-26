import React from "react";
import { getArticles } from "@/app/api/lib/fetchingData/getArticles";
import ArticleAdminClient from "@/components/ClientPages/ArticleAdminClient";

const Articles = async () => {
  let articles = [];
  let error = null;

  try {
    articles = await getArticles();
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    error = "Failed to load articles.";
  }
  return <ArticleAdminClient initialArticles={articles} initialError={error} />;
};

export default Articles;
