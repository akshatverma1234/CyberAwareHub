"use client";
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/AdminAppContext";

const AddNewCaseStudy = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [impact, setImpact] = useState("");
  const [lesson, setLesson] = useState("");
  const router = useRouter();
  const context = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaseStudy = { name, title, image, summary, impact, lesson };

    try {
      const res = await fetch("/api/admin/caseStudies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCaseStudy),
      });

      if (res.ok) {
        context.openAlertBox("success", "Case study added successfully!");
        router.push("/admin/caseStudies");
      } else {
        const error = await res.json();
        context.openAlertBox("error", `Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error adding case study:", err);
      context.openAlertBox("error", "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex flex-col md:flex-row">
      <div className="flex-1 md:ml-[18%] p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Case Study</h1>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 bg-white rounded shadow-md flex flex-col gap-4"
        >
          {/* Title, Name, Image */}
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Title"
              variant="outlined"
              className="w-full md:w-1/3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Name"
              variant="outlined"
              className="w-full md:w-1/4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Image URL"
              variant="outlined"
              className="w-full md:w-1/2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          {/* Summary */}
          <TextField
            label="Summary"
            multiline
            rows={6}
            className="w-full"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          {/* Impact & Lesson */}
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Impact"
              multiline
              rows={6}
              className="w-full md:w-1/2"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              required
            />
            <TextField
              label="Lesson"
              multiline
              rows={6}
              className="w-full md:w-1/2"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="contained"
              className="w-full md:w-1/3 h-[50px] !text-[16px] !bg-gray-900"
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
