import Story from "../../model/communityCaseStudy.model";
import connectDB from "../connectDB";

let cachedCommunitiesStudies = null;

export async function getCommunityStories() {
  await connectDB();

  if (cachedCommunitiesStudies) {
    return cachedCommunitiesStudies;
  }

  const stories = await Story.find({ status: "approved" }).exec();
  cachedCommunitiesStudies = JSON.parse(JSON.stringify(stories));

  return cachedCommunitiesStudies;
}
