import React from "react";
import EditArticlesAdminClient from "@/components/ClientPages/EditArticlesAdminClient";
import { getArticleById } from "@/app/api/lib/fetchingData/getArticles";

const EditArticlesPage = async ({ params }) => {
  const { id } = params;

  let articleData = null;
  let error = null;

  try {
    if (!id) {
      throw new Error("No article ID provided.");
    }
    articleData = await getArticleById(id);
    if (!articleData) {
      error = "Article not found.";
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    error = "Failed to fetch article details!";
  }

  // Handle the error state on the server
  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex items-center justify-center p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex justify-center">
      <EditArticlesAdminClient initialData={articleData} />
    </div>
  );
};

export default EditArticlesPage;
