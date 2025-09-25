import { createClerkClient } from "@clerk/backend";
import connectDB from "@/app/api/lib/connectDB";
import View from "@/app/api/model/view.model";
import Story from "@/app/api/model/communityCaseStudy.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";
import { getAuth } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(req) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();

    const usersListResponse = await clerkClient.users.getUserList({
      orderBy: "-created_at",
      limit: 500,
    });

    const usersList = usersListResponse?.data || [];
    const totalUsers = usersList.length;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newUsers = usersList.filter(
      (user) => new Date(user.createdAt) >= oneWeekAgo
    ).length;

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const recentlyActiveUsers = usersList.filter((user) => {
      const lastActive = user.lastActiveAt || user.createdAt;
      return new Date(lastActive) >= oneMonthAgo;
    }).length;

    const viewsCount = await View.countDocuments();

    let totalViews = 0;
    let recentViews = 0;

    if (viewsCount > 0) {
      const totalViewsResult = await View.aggregate([
        { $group: { _id: null, sum: { $sum: "$count" } } },
      ]);
      totalViews = totalViewsResult[0]?.sum || 0;

      const recentViewsResult = await View.aggregate([
        {
          $match: {
            createdAt: { $gte: oneWeekAgo },
          },
        },
        {
          $group: { _id: null, sum: { $sum: "$count" } },
        },
      ]);
      recentViews = recentViewsResult[0]?.sum || 0;
    }

    // 5️⃣ Community Stories Statistics
    const [pendingStories, approvedStories, rejectedStories, totalStories] =
      await Promise.all([
        Story.countDocuments({ status: "pending" }),
        Story.countDocuments({ status: "approved" }),
        Story.countDocuments({ status: "rejected" }),
        Story.countDocuments({}),
      ]);

    // 6️⃣ Recent community stories (last 7 days)
    const recentStories = await Story.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    // 7️⃣ Popular pages (only if views exist)
    let popularPages = [];
    if (viewsCount > 0) {
      // ✅ Now uses actual viewsCount
      popularPages = await View.find({})
        .sort({ count: -1 })
        .limit(5)
        .select("page count -_id");
    }

    return NextResponse.json({
      // User Statistics
      totalUsers,
      newUsers,
      recentlyActiveUsers,

      // View Statistics
      totalViews,
      recentViews,
      viewsCollectionExists: viewsCount > 0,

      // Community Stories Statistics
      communityStories: {
        total: totalStories,
        pending: pendingStories,
        approved: approvedStories,
        rejected: rejectedStories,
        recent: recentStories,
      },

      // Popular Pages
      popularPages: popularPages.map((p) => ({
        page: p.page,
        views: p.count,
      })),

      // Additional metrics
      engagementRate:
        totalUsers > 0 ? Math.round((totalViews / totalUsers) * 100) / 100 : 0,
      avgStoriesPerUser:
        totalUsers > 0
          ? Math.round((totalStories / totalUsers) * 100) / 100
          : 0,

      // Debug info
      debug: {
        usersFound: totalUsers,
        viewsDocuments: viewsCount,
        storiesDocuments: totalStories,
      },
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
