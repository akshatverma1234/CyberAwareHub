import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Article from "@/app/api/model/article.model";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article }, { status: 200 });
  } catch (err) {
    console.error("Error fetching article:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const { title, author, publishedDate, image, summary, content } = body;

    const updated = await Article.findByIdAndUpdate(
      params.id,
      { title, author, publishedDate, image, summary, content },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article: updated }, { status: 200 });
  } catch (err) {
    console.error("Error updating article:", err.message);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const deleted = await Article.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting article:", err.message);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
