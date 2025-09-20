"use client";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MyContext } from "@/context/AdminAppContext";
import axios from "axios";

const EditNewCaseStudy = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Cyberhub",
    title: "",
    summary: "",
    image: "",
    impact: "",
    lesson: "",
    author: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/admin/caseStudies/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("Error fetching case study:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/admin/caseStudies/${id}`, formData);
      context.openAlertBox("success", "Case study updated successfully!");
      router.push("/admin/caseStudies");
    } catch (err) {
      console.error("Update failed:", err);
      context.openAlertBox("error", "Failed to update case study!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex flex-col md:flex-row">
      <div className="flex-1 md:ml-[18%] p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 bg-white rounded shadow-md flex flex-col gap-4"
        >
          {/* Title, Name, Image */}
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              className="w-full md:w-1/3"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              className="w-full md:w-1/4"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              className="w-full md:w-1/2"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Summary */}
          <TextField
            label="Summary"
            name="summary"
            multiline
            rows={6}
            className="w-full"
            value={formData.summary}
            onChange={handleChange}
            required
          />

          {/* Impact & Lesson */}
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Impact"
              name="impact"
              multiline
              rows={6}
              className="w-full md:w-1/2"
              value={formData.impact}
              onChange={handleChange}
              required
            />
            <TextField
              label="Lesson"
              name="lesson"
              multiline
              rows={6}
              className="w-full md:w-1/2"
              value={formData.lesson}
              onChange={handleChange}
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
              Update Case Study
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewCaseStudy;
