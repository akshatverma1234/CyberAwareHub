"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/AppContext";
import axios from "axios";

const ArticleDialogBox = () => {
  const { isOpenPanel } = useContext(MyContext);
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpenPanel?.id && isOpenPanel.model === "openArticleDialogBox") {
      const fetchStory = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `/api/admin/articleCommunity/${isOpenPanel.id}`
          );
          setStory(res.data);
        } catch (err) {
          console.error("Error fetching story:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchStory();
    }
  }, [isOpenPanel]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!story) return <p className="text-white">No story found.</p>;

  return (
    <div className="w-full h-full overflow-y-auto p-6 text-white bg-[#06080e]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-3">{story.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed">{story.summary}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Content</h3>
          <p className="text-gray-300">{story.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDialogBox;
