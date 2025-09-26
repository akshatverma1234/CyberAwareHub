"use client";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MyContext } from "@/context/AdminAppContext";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const EditArticlesClient = ({ initialData }) => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getToken } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      await axios.patch(`/api/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      context.openAlertBox("success", "Article updated successfully!");
      router.push("/admin/articles");
    } catch (err) {
      console.error("Update failed:", err);
      const errorMessage = err.response?.data?.error || err.message;
      context.openAlertBox(
        "error",
        `Failed to update article: ${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 md:ml-[18%] p-4 md:p-8">
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
            className="flex-1 shadow-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row gap-4">
          <TextField
            label="Author"
            name="author"
            variant="outlined"
            className="shadow-md w-full"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <TextField
            label="Publish Date"
            name="publishedDate"
            variant="outlined"
            type="date"
            className="shadow-md min-w-[200px] w-[450px]"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Image URL"
            name="image"
            variant="outlined"
            className="shadow-md w-full"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-wrap gap-4">
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
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            variant="contained"
            className="w-full sm:w-[40%] h-[50px] !text-[16px] !bg-gray-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update Article"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticlesClient;
