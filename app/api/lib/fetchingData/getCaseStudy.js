import CaseStudy from "../../model/caseStudy.model";
import connectDB from "../connectDB";

export async function getCaseStudies() {
  await connectDB();
  const caseStudies = await CaseStudy.find({});
  return JSON.parse(JSON.stringify(caseStudies));
}
