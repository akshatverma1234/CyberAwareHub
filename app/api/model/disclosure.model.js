import mongoose from "mongoose";

const responsibleDisclosureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    vulnerabilityType: { type: String, required: true },
    vulnSummary: { type: String, required: true },
    affectedUrl: { type: String },
    description: { type: String, required: true },
    reproduce: { type: String },
    poc: { type: String, required: true },
    approvedDate: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const ResponsibleDisclosure =
  mongoose.models.ResponsibleDisclosure ||
  mongoose.model("ResponsibleDisclosure", responsibleDisclosureSchema);

export default ResponsibleDisclosure;
