import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "@/context/AppContext";
import { CircularProgress, Typography } from "@mui/material";

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
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-[#06080e]">
        <CircularProgress className="!text-cyan-400" />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-[#06080e]">
        <p className="text-gray-400">No case study found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10 lg:p-12 text-white bg-[#06080e]">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cyan-400">
          {caseStudy.title}
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          {caseStudy.summary}
        </p>
        <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-400">
          <p>
            <span className="font-semibold">Author:</span>{" "}
            {caseStudy.author || "Anonymous"}
          </p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(caseStudy.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 shadow-md transition-shadow hover:shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold text-red-400 mb-3">
            💥 Impact
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            {caseStudy.impact}
          </p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 shadow-md transition-shadow hover:shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-3">
            📚 Key Lesson
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            {caseStudy.lesson}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDialog;
