"use client";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MyContext } from "@/context/AppContext";
import { SignInButton, SignUpButton, useAuth, useUser } from "@clerk/nextjs";

const AddCaseStudy = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.fullName,
    title: "",
    summary: "",
    impact: "",
    lesson: "",
  });

  const context = useContext(MyContext);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      context.openAlertBox("error", "Please login/Signup to continue");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return (
      <>
        <div className="flex flex-col items-center text-center text-white">
          ⚠️ Please sign in to add a case study.
          <div className="mt-4 flex gap-2">
            <SignInButton>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Signup
              </Button>
            </SignUpButton>
          </div>
        </div>
      </>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      context.openAlertBox("error", "Please login/Signup to continue");
      return;
    }

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        context.openAlertBox("success", "Story submitted successfully!");
        context.handleClose();
        setFormData({
          name: "",
          title: "",
          summary: "",
          impact: "",
          lesson: "",
        });
      } else {
        context.openAlertBox("error", data.error);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", err.message);
    }
  };

  return (
    <div className="w-[550px] h-[650px] bg-white p-4 px-8 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ➕ Add Your Case Study
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Impact"
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Lesson"
          name="lesson"
          value={formData.lesson}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="!mt-1"
        >
          Save Case Study
        </Button>
      </form>
    </div>
  );
};

export default AddCaseStudy;
