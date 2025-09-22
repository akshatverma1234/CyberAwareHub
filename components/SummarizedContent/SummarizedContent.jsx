"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FaBolt } from "react-icons/fa";

const SummarizedContent = ({ content }) => {
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate summary");
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setError(`An error occurred: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-2 w-full h-full">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FaBolt className="text-cyan-400" /> Key Takeaways
      </h3>

      {summary.length > 0 && (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}

      <div className="mt-6 text-center">
        {isLoading ? (
          <CircularProgress size={24} className="!text-cyan-400" />
        ) : (
          <Button
            onClick={handleGenerateSummary}
            className="!bg-cyan-600 hover:!bg-cyan-700 !text-white !px-6 !py-3 !rounded-lg"
          >
            Generate Summary
          </Button>
        )}
      </div>
    </div>
  );
};

export default SummarizedContent;
