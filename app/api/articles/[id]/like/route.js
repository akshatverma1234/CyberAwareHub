// app/api/articles/[id]/like/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Article from "@/app/api/model/article.model";

export async function POST(req, { params }) {
  await connectDB();
  try {
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment likes
    article.likes += 1;
    await article.save();

    return NextResponse.json(
      {
        message: "Article liked successfully",
        likes: article.likes,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error liking article:", err);
    return NextResponse.json(
      { error: "Failed to like article" },
      { status: 500 }
    );
  }
}
