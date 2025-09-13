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
      axios.get(`/api/admin/caseStudies/${id}`).then((res) => {
        setFormData(res.data);
      });
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
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md"
        >
          <div className="mt-4 flex gap-4">
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              className="w-[30%] shadow-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              className="w-[20%] shadow-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              className="w-[50%] shadow-md"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Summary"
              name="summary"
              multiline
              rows={6}
              className="w-full shadow-md"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 flex gap-2">
            <TextField
              label="Impact"
              name="impact"
              multiline
              rows={6}
              className="w-[50%] shadow-md"
              value={formData.impact}
              onChange={handleChange}
              required
            />
            <TextField
              label="Lesson"
              name="lesson"
              multiline
              rows={6}
              className="w-[50%] shadow-md"
              value={formData.lesson}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button
              type="submit"
              variant="contained"
              className="w-[30%] h-[50px] !text-[16px] !bg-gray-900"
            >
              Edit Case Study
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewCaseStudy;
