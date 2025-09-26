import { NextResponse } from "next/server";
import { z } from "zod";
import xss from "xss";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/app/api/lib/connectDB";
import sendEmail from "@/app/api/lib/emailService";
import CommunityArticleSubmissionEmail from "../../lib/CommunityArticleSubmissionEmail";
import ArticleCommunity from "../../model/articleCommunity.model";
import { ratelimit } from "../../lib/rateLimiter";

const communityArticleSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required").max(200),
  summary: z.string().min(1, "Summary is required").max(500),
  content: z.string().min(1, "Content is required").max(20000),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export async function GET() {
  try {
    await connectDB();
    const articles = await ArticleCommunity.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch community articles" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { success } = await ratelimit.limit(userId);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    await connectDB();
    const rawData = await req.json();
    const validatedData = communityArticleSchema.parse(rawData);

    const sanitizedData = {
      ...validatedData,
      name: xss(validatedData.name),
      email: xss(validatedData.email),
      title: xss(validatedData.title),
      summary: xss(validatedData.summary),
      content: xss(validatedData.content),
      status: "pending",
    };

    const newArticle = await ArticleCommunity.create(sanitizedData);

    await sendEmail(
      sanitizedData.email,
      "We got it! Your article is being reviewed",
      "Our team will review your submission shortly",
      CommunityArticleSubmissionEmail(sanitizedData.name, sanitizedData.title)
    );

    return NextResponse.json(
      { message: "Article submitted!", article: newArticle },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit article" },
      { status: 500 }
    );
  }
}
