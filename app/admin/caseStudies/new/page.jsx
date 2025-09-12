"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const AddNewCaseStudy = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [impact, setImpact] = useState("");
  const [lesson, setLesson] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaseStudy = {
      name,
      title,
      imageUrl,
      summary,
      impact,
      lesson,
    };

    try {
      const res = await fetch("/api/admin/caseStudies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCaseStudy),
      });

      if (res.ok) {
        alert("✅ Case study added successfully!");
        router.push("/admin/caseStudies"); // redirect back to list page
      } else {
        const error = await res.json();
        alert(`❌ Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error adding case study:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Case Study</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md"
        >
          <div className="mt-4 flex gap-4">
            <TextField
              label="Title"
              variant="outlined"
              className="w-[30%] shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Name"
              variant="outlined"
              className="w-[20%] shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              className="w-[50%] shadow-md"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Summary"
              multiline
              rows={6}
              className="w-full shadow-md"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 flex gap-2">
            <TextField
              label="Impact"
              multiline
              rows={6}
              className="w-[50%] shadow-md"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              required
            />
            <TextField
              label="Lesson"
              multiline
              rows={6}
              className="w-[50%] shadow-md"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button
              type="submit"
              variant="contained"
              className="w-[30%] h-[50px] !text-[16px] !bg-gray-900"
            >
              Add Case Study
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCaseStudy;
