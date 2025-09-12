import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function DELETE(req, { params }) {
  try {
    const { userId: currentUserId, sessionClaims } = await auth();

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const role =
      sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
    if (role !== "cyberhub_admin") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const { id } = params;

    // Prevent deleting yourself
    if (id === currentUserId) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await clerkClient.users.deleteUser(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user", details: error.message },
      { status: 500 }
    );
  }
}
