import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model";

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
    const { name, title, summary, impact, lesson, author } = await req.json();
    const newStory = new Story({
      name,
      title,
      summary,
      impact,
      lesson,
      author,
    });
    await newStory.save();
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
