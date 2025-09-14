// Create this file: app/api/views/route.js
import connectDB from "@/app/api/lib/connectDB";
import View from "@/app/api/model/view.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { page } = await req.json();

    if (!page) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    // Clean up the page path
    const cleanPage = page.split("?")[0]; // Remove query parameters

    // Find existing view record or create new one
    const existingView = await View.findOne({ page: cleanPage });

    if (existingView) {
      // Increment existing view count
      await View.updateOne(
        { page: cleanPage },
        {
          $inc: { count: 1 },
          $set: { updatedAt: new Date() },
        }
      );
    } else {
      await View.create({
        page: cleanPage,
        count: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}
