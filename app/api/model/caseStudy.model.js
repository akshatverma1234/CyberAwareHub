import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    impact: { type: String, required: true },
    lesson: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

const CaseStudy =
  mongoose.models.CaseStudy || mongoose.model("CaseStudy", StorySchema);
export default CaseStudy;
