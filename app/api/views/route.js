import connectDB from "@/app/api/lib/connectDB";
import View from "@/app/api/model/view.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { page } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    const cleanPage = page.split("?")[0];

    const existingView = await View.findOne({ page: cleanPage });

    if (existingView) {
      await View.updateOne(
        { page: cleanPage },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } }
      );
    } else {
      await View.create({ page: cleanPage, count: 1 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error tracking view:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to track view", details: error.message },
      { status: 500 }
    );
  }
}
