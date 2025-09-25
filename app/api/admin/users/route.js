import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
export async function GET() {
  try {
    const { userId, sessionClaims, sessionId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Authentication required",
        },
        { status: 401 }
      );
    }
    const userRole =
      sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;

    if (userRole !== "cyberhub_admin") {
      return NextResponse.json(
        {
          error: "Insufficient permissions",
        },
        { status: 403 }
      );
    }

    const users = await clerkClient.users.getUserList({
      limit: 100,
    });

    return NextResponse.json({
      data: users.data,
      totalCount: users.totalCount,
      success: true,
      message: "Users fetched successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
