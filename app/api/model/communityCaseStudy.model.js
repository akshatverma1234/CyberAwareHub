import mongoose from "mongoose";

const commnunityStorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    impact: { type: String, required: true },
    lesson: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// ✅ Reuse existing model to prevent OverwriteModelError
const Story =
  mongoose.models.Story || mongoose.model("Story", commnunityStorySchema);

export default Story;
