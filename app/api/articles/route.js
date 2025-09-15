import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Article from "@/app/api/model/article.model";

export async function GET() {
  await connectDB();
  try {
    const articles = await Article.find().sort({
      createdAt: -1,
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req) {
  await connectDB();
  try {
    const { title, author, content, summary, image, publishedDate } =
      await req.json();

    const slug = generateSlug(title);

    const newArticle = await Article.create({
      title,
      slug,
      author: author || "Admin",
      publishedDate,
      content,
      summary,
      image,
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (err) {
    console.error("Error creating article:", err);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
