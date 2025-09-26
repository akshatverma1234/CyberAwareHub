import ResponsibleDisclosure from "../../model/disclosure.model";
import connectDB from "../connectDB";

let cachedReporterDetails = null;

export async function getReporterDetails() {
  await connectDB();

  if (cachedReporterDetails) {
    return cachedReporterDetails;
  }

  const report = await ResponsibleDisclosure.find({
    status: "resolved",
  }).exec();
  cachedReporterDetails = JSON.parse(JSON.stringify(report));
  return cachedReporterDetails;
}
