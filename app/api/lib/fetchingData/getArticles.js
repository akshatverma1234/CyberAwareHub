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

export async function getArticleById(id) {
  try {
    await connectDB();
    const article = await Article.findById(id);
    if (!article) {
      return null;
    }
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
}
