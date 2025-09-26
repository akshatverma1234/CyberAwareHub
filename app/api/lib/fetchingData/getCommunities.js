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

const cachedStoriesById = {};

/**
 * Fetch a single community story by ID
 * @param {string} id - MongoDB ObjectId of the story
 * @returns {object|null} - Story data or null if not found
 */
export async function getCommunityStoryById(id) {
  if (!id) throw new Error("Story ID is required");

  if (cachedStoriesById[id]) {
    return cachedStoriesById[id];
  }

  await connectDB();

  const story = await Story.findById(id);
  if (!story) return null;

  const serializedStory = JSON.parse(JSON.stringify(story));
  cachedStoriesById[id] = serializedStory;

  return serializedStory;
}
