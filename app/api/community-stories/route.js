import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model";
import sendEmail from "../lib/emailService";
import StorySubmissionEmail from "../lib/storySubmissionEmail";

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
    await connectDB();
    const { name, title, summary, impact, lesson, author, email } =
      await req.json();
    const newStory = new Story({
      name,
      title,
      summary,
      impact,
      lesson,
      author,
      email,
    });
    await newStory.save();

    await sendEmail(
      email,
      "We got it! Your story is being reviewed",
      "Our team will review your submission shortly",
      StorySubmissionEmail(name, title)
    );
    return NextResponse.json(
      { message: "Story submitted!", story: newStory },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to submit story" },
      { status: 500 }
    );
  }
}
