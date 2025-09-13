"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "@/context/AppContext";

const CaseStudyDialog = () => {
  const { isOpenPanel } = useContext(MyContext);
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpenPanel?.id && isOpenPanel.model === "caseStudy") {
      const fetchCaseStudy = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `/api/admin/caseStudies/${isOpenPanel.id}`
          );
          setCaseStudy(response.data);
        } catch (error) {
          console.error("Error fetching case study:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCaseStudy();
    }
  }, [isOpenPanel]);

  if (loading) {
    return <p className="text-white p-6">Loading case study...</p>;
  }

  if (!caseStudy) {
    return <p className="text-white p-6">No case study found.</p>;
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 text-white bg-[#06080e]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-3">{caseStudy.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          {caseStudy.summary}
        </p>
        <p className="text-sm text-gray-400 mb-2">
          <span className="font-semibold">Author:</span>{" "}
          {caseStudy.author || "Anonymous"}
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-semibold">Created:</span>{" "}
          {new Date(caseStudy.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-400 mb-2">💥 Impact</h3>
          <p className="text-gray-300">{caseStudy.impact}</p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            📚 Key Lesson
          </h3>
          <p className="text-gray-300">{caseStudy.lesson}</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDialog;
