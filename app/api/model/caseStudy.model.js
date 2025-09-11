import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    impact: { type: String, required: true },
    lesson: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    // approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
