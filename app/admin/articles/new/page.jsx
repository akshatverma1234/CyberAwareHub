"use client";
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/AdminAppContext";

const AddNewArticle = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();
  const context = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      author,
      image,
      summary,
      content,
    };

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      if (res.ok) {
        context.openAlertBox("success", "Article added successfully!");
        router.push("/admin/articles");
      } else {
        const error = await res.json();
        context.openAlertBox("error", `Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error adding article:", err);
      context.openAlertBox("error", "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Article</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md"
        >
          <div className="mt-4 flex gap-4">
            <TextField
              label="Title"
              variant="outlined"
              className="w-[40%] shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Author"
              variant="outlined"
              className="w-[30%] shadow-md"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
              label="Image URL"
              variant="outlined"
              className="w-[30%] shadow-md"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Summary"
              multiline
              rows={4}
              className="w-full shadow-md"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 flex">
            <TextField
              label="Content"
              multiline
              rows={10}
              className="w-full shadow-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button
              type="submit"
              variant="contained"
              className="w-[30%] h-[50px] !text-[16px] !bg-gray-900"
            >
              Add Article
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewArticle;
