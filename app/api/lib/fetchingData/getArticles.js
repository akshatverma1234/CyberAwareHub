import Article from "../../model/article.model";
import connectDB from "../connectDB";

export async function getArticles() {
  try {
    await connectDB();
    const articles = await Article.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error("Error fetching articles from database:", error);
    return [];
  }
}
