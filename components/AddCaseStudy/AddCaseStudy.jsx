import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MyContext } from "@/context/AppContext";
import { SignInButton, SignUpButton, useAuth, useUser } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";

const AddCaseStudy = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.fullName,
    email: user?.primaryEmailAddress?.emailAddress || "",
    title: "",
    summary: "",
    impact: "",
    lesson: "",
    status: "pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      context.openAlertBox("error", "Please login/Signup to continue");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (user?.fullName) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-gray-800 rounded-xl">
        <CircularProgress className="!text-cyan-400" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-gray-800 rounded-xl text-center">
        <div className="flex flex-col items-center text-center text-white">
          <p className="text-lg mb-4">⚠️ Please sign in to add a case study.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <SignInButton>
              <Button
                variant="outlined"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outlined"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Signup
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
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
        context.openAlertBox(
          "success",
          "Story submitted successfully! It will be reviewed by our admin team before being published."
        );
        context.handleClose();
        setFormData({
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
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
    <div className="w-full h-full p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg overflow-y-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        ➕ Add Your Case Study
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={!!user?.fullName}
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          variant="outlined"
          fullWidth
          disabled
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
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
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
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
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
        />
        <TextField
          label="Impact"
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="What was the impact of this incident?"
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
        />
        <TextField
          label="Lesson"
          name="lesson"
          value={formData.lesson}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="What lessons were learned?"
          InputProps={{ className: "!text-gray-800" }}
          InputLabelProps={{ className: "!text-gray-600" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="!mt-1 !bg-blue-600 hover:!bg-blue-700 !text-white !px-6 !py-3 !rounded-lg !font-semibold !transition-all !duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit for Review"
          )}
        </Button>

        <p className="text-sm text-gray-600 text-center mt-2">
          📝 Your story will be reviewed by our admin team before publication
        </p>
      </form>
    </div>
  );
};

export default AddCaseStudy;
