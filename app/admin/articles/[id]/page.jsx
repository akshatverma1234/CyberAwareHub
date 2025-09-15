"use client";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MyContext } from "@/context/AdminAppContext";
import axios from "axios";

const EditArticles = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    image: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        if (id) {
          const res = await axios.get(`/api/articles/${id}`);
          setFormData(res.data.article || res.data);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        context.openAlertBox("error", "Article not found!");
      }
    };
    fetchArticleDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/articles/${id}`, formData);
      context.openAlertBox("success", "Article updated successfully!");
      router.push("/admin/articles");
    } catch (err) {
      console.error("Update failed:", err);
      context.openAlertBox("error", "Failed to update article!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md"
        >
          <div className="mt-4 flex gap-4">
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              className="w-[40%] shadow-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Author"
              name="author"
              variant="outlined"
              className="w-[25%] shadow-md"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <TextField
              label="Publish Date"
              name="publishedDate"
              variant="outlined"
              className="w-[20%] shadow-md"
              value={formData.publishedDate}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              className="w-[30%] shadow-md"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Summary"
              name="summary"
              variant="outlined"
              multiline
              rows={4}
              className="w-full shadow-md"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Content"
              name="content"
              multiline
              rows={8}
              className="w-full shadow-md"
              value={formData.content}
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
              Update Article
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticles;
