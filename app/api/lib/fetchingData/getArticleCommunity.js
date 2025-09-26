import ArticleCommunity from "../../model/articleCommunity.model";
import connectDB from "../connectDB";

let cachedAllCommunitiesArticles = null;

export async function getAllCommunityArticlesForAdmin() {
  await connectDB();

  if (cachedAllCommunitiesArticles) {
    return cachedAllCommunitiesArticles;
  }

  const articles = await ArticleCommunity.find({}).exec();
  cachedAllCommunitiesArticles = JSON.parse(JSON.stringify(articles));

  return cachedAllCommunitiesArticles;
}

let cachedCommunitiesArticles = null;

export async function getArticles() {
  await connectDB();

  if (cachedCommunitiesArticles) {
    return cachedCommunitiesArticles;
  }

  const articles = await ArticleCommunity.find({ status: "approved" }).exec();
  cachedCommunitiesArticles = JSON.parse(JSON.stringify(articles));

  return cachedCommunitiesArticles;
}
