import mongoose from "mongoose";

const commnunityArticleSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const ArticleCommunity =
  mongoose.models.ArticleCommunity ||
  mongoose.model("ArticleCommunity", commnunityArticleSchema);

export default ArticleCommunity;
