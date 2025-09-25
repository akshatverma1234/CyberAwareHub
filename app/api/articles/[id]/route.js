import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Article from "@/app/api/model/article.model";
import { z } from "zod";
import xss from "xss";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";
import { getAuth } from "@clerk/nextjs/server";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).optional(),
  author: z.string().optional(),
  content: z.string().min(1, "Content is required").optional(),
  summary: z.string().min(1, "Summary is required").max(500).optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  publishedDate: z.string().optional(),
});

export async function PATCH(req, { params }) {
  await connectDB();
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
    const rawData = await req.json();

    const validatedData = articleSchema.partial().parse(rawData);

    const sanitizedData = {
      ...validatedData,
      title: validatedData.title ? xss(validatedData.title) : undefined,
      summary: validatedData.summary ? xss(validatedData.summary) : undefined,
      content: validatedData.content ? xss(validatedData.content) : undefined,
    };

    const updated = await Article.findByIdAndUpdate(params.id, sanitizedData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article: updated }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Error updating article:", err.message);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
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
