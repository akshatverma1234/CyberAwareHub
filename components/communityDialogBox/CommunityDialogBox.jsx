"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/AppContext";
import axios from "axios";

const CommunityDialogBox = () => {
  const context = useContext(MyContext);
  const [caseStories, setCaseStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCommunityStories() {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/stories");
        setCaseStories(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommunityStories();
  }, []);

  const caseStudy = caseStories.find(
    (c) => String(c._id) === String(context.isOpenPanel?.id)
  );

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!caseStudy) return <p className="text-white">No case study found.</p>;

  return (
    <div className="w-full h-full overflow-y-auto p-6 text-white bg-[#06080e]">
      {caseStudy && (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">{caseStudy.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                💥 Impact
              </h3>
              <p className="text-gray-300">{caseStudy.impact}</p>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                📚 Key Lesson
              </h3>
              <p className="text-gray-300">{caseStudy.lesson}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityDialogBox;
