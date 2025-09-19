import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model";
import sendEmail from "../lib/emailService";
import StorySubmissionEmail from "../lib/storySubmissionEmail";
import { z } from "zod";
import xss from "xss";
import { getAuth } from "@clerk/nextjs/server";

const caseStudySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required").max(200),
  summary: z.string().min(1, "Summary is required").max(500),
  impact: z.string().max(1000).optional(),
  lesson: z.string().max(1000).optional(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export async function GET() {
  try {
    await connectDB();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stories" },
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

    await connectDB();
    const rawData = await req.json();

    const validateData = caseStudySchema.parse(rawData);

    const sanitizedData = {
      ...validateData,
      title: xss(validateData.title),
      summary: xss(validateData.summary),
      impact: validatedData.impact ? xss(validatedData.impact) : undefined,
      lesson: validateData.lesson ? xss(validateData.lesson) : undefined,
    };

    const newStory = new Story({ ...sanitizedData, status: "pending" });

    await newStory.save();

    await sendEmail(
      sanitizedData.email,
      "We got it! Your story is being reviewed",
      "Our team will review your submission shortly",
      StorySubmissionEmail(sanitizedData.name, sanitizedData.title)
    );

    return NextResponse.json(
      { message: "CaseStudy submitted!", story: newStory },
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
      { error: "Failed to submit story" },
      { status: 500 }
    );
  }
}
