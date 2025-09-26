import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/api/lib/connectDB";
import { getAuth } from "@clerk/nextjs/server";
import checkAdmin from "@/app/api/lib/checkAdmin/checkAdmin";
import ArticleCommunity from "@/app/api/model/articleCommunity.model";

const statusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectDB();
    const article = await ArticleCommunity.findById(id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error("Error fetching article:", err);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
    const { id } = params;
    const body = await req.json();

    const validatedData = statusSchema.parse(body);

    const updatedArticle = await ArticleCommunity.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // You can add email notification logic here if needed
    // if (validatedData.email && validatedData.name) { ... }

    return NextResponse.json(
      { success: true, article: updatedArticle },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating article status:", error);
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
    const { id } = params;
    const deletedArticle = await ArticleCommunity.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting article:", err);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
