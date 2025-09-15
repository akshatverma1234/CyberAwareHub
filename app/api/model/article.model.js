import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, default: "Admin" },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String },
    publishedDate: { type: String },
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
