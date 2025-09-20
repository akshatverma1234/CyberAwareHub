import Article from "../../model/article.model";
import connectDB from "../connectDB";

export async function getArticleBySlug(slug) {
  await connectDB();
  const article = await Article.findOne({ slug });
  return JSON.parse(JSON.stringify(article));
}
