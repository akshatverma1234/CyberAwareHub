import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { redirect } from "next/navigation";
import AdminUsersTable from "@/components/Admin/AdminUserPage/AdminUserPage";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function AdminUsersPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userRole =
    sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
  if (userRole !== "cyberhub_admin") {
    redirect("/");
  }
  const usersResponse = await clerkClient.users.getUserList({ limit: 100 });
  const users = usersResponse.data.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.emailAddresses[0]?.emailAddress || null,
    imageUrl: user.imageUrl,
    role: user.publicMetadata?.role || "member",
    createdAt: user.createdAt,
    lastActiveAt: user.lastActiveAt,
  }));

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all registered users
          </p>
        </div>

        <AdminUsersTable users={users} />
      </div>
    </div>
  );
}
