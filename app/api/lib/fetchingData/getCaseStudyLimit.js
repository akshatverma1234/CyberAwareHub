import CaseStudy from "../../model/caseStudy.model";
import connectDB from "../connectDB";

export async function getCaseStudies(limit) {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    return JSON.parse(JSON.stringify(caseStudies));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}
