import ResponsibleDisclosure from "../../model/disclosure.model";
import connectDB from "../connectDB";

export async function getReporterDetails() {
  await connectDB();
  const report = await ResponsibleDisclosure.find({
    status: "resolved",
  }).exec();
  return JSON.parse(JSON.stringify(report));
}
