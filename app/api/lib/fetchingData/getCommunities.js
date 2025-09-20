import Story from "../../model/communityCaseStudy.model";
import connectDB from "../connectDB";

export async function getCommunityStories() {
  await connectDB();
  const stories = await Story.find({ status: "approved" }).exec();
  return JSON.parse(JSON.stringify(stories));
}
