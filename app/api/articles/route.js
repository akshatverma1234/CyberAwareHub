import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Article from "@/app/api/model/article.model";
import checkAdmin from "../lib/checkAdmin/checkAdmin";
import { z } from "zod";
import xss from "xss";
import { getAuth } from "@clerk/nextjs/server";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  author: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  summary: z.string().min(1, "Summary is required").max(500),
  image: z.string().url("Image must be a valid URL").optional(),
  publishedDate: z.string().optional(),
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);

    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
    const rawData = await req.json();

    const validatedData = articleSchema.parse(rawData);

    const sanitizedData = {
      ...validatedData,
      title: xss(validatedData.title),
      summary: xss(validatedData.summary),
      content: xss(validatedData.content),
    };

    const slug = generateSlug(sanitizedData.title);

    const newArticle = await Article.create({
      ...sanitizedData,
      slug,
      author: sanitizedData.author || "Admin",
      publishedDate: sanitizedData.publishedDate || new Date(),
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: err.issues,
        },
        { status: 400 }
      );
    }
    console.error("Error creating article:", err);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
