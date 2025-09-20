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
    <div className="min-h-screen bg-[#f5f5f6] flex justify-center">
      <div className="w-full max-w-6xl p-4 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
          Edit Article
        </h1>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 bg-white rounded shadow-md flex flex-col gap-4"
        >
          <div className="flex flex-wrap gap-4">
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              className="flex-1 min-w-[200px] shadow-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Author"
              name="author"
              variant="outlined"
              className="flex-1 min-w-[150px] shadow-md"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <TextField
              label="Publish Date"
              name="publishedDate"
              variant="outlined"
              type="date"
              className="flex-1 min-w-[150px] shadow-md"
              value={formData.publishedDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              className="flex-1 min-w-[200px] shadow-md"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

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

          <TextField
            label="Content"
            name="content"
            multiline
            rows={10}
            className="w-full shadow-md"
            value={formData.content}
            onChange={handleChange}
            required
          />

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="contained"
              className="w-full sm:w-[40%] h-[50px] !text-[16px] !bg-gray-900"
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
