import CaseStudy from "../../model/caseStudy.model";
import connectDB from "../connectDB";

let cachedCaseStudies = null;

export async function getCaseStudies() {
  await connectDB();

  if (cachedCaseStudies) {
    return cachedCaseStudies;
  }

  const caseStudies = await CaseStudy.find({});
  cachedCaseStudies = JSON.parse(JSON.stringify(caseStudies));

  return cachedCaseStudies;
}
