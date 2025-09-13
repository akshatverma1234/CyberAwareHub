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
    status: "pending", // ✅ Set default status to pending
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      context.openAlertBox("error", "Please login/Signup to continue");
    }
  }, [isLoaded, isSignedIn]);

  // ✅ Update form data when user loads
  useEffect(() => {
    if (user?.fullName) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName,
      }));
    }
  }, [user]);

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

    // ✅ Basic form validation
    if (!formData.title.trim() || !formData.summary.trim()) {
      context.openAlertBox("error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/community-stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Updated success message to inform about approval process
        context.openAlertBox(
          "success",
          "Story submitted successfully! It will be reviewed by our admin team before being published."
        );
        context.handleClose();
        setFormData({
          name: user?.fullName || "",
          title: "",
          summary: "",
          impact: "",
          lesson: "",
          status: "pending",
        });
      } else {
        context.openAlertBox("error", data.error);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox(
        "error",
        "Failed to submit story. Please try again."
      );
    } finally {
      setIsSubmitting(false);
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
          disabled={!!user?.fullName} // ✅ Disable if user name is auto-filled
        />
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          placeholder="Enter a descriptive title for your case study"
        />
        <TextField
          label="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          multiline
          rows={3}
          required
          placeholder="Brief summary of the incident"
        />
        <TextField
          label="Impact"
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="What was the impact of this incident?"
        />
        <TextField
          label="Lesson"
          name="lesson"
          value={formData.lesson}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="What lessons were learned?"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="!mt-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>

        <p className="text-sm text-gray-600 text-center mt-2">
          📝 Your story will be reviewed by our admin team before publication
        </p>
      </form>
    </div>
  );
};

export default AddCaseStudy;
