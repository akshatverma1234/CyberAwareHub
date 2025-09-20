import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.View || mongoose.model("View", viewSchema);
