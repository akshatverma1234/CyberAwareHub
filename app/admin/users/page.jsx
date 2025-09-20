import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { redirect } from "next/navigation";
import AdminUsersTable from "@/components/Admin/AdminUserPage/AdminUserPage";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function AdminUsersPage() {
  const { userId, sessionClaims } = await auth();

  // 🔒 Redirect if not logged in
  if (!userId) {
    redirect("/sign-in");
  }

  // 🔑 Check admin role
  const userRole =
    sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
  if (userRole !== "cyberhub_admin") {
    redirect("/");
  }

  // 👥 Fetch users
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
    <div className="min-h-screen bg-[#f5f5f6] flex flex-col md:flex-row">
      <main className="flex-1 p-6 md:p-10 md:ml-[18%]">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all registered users
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <AdminUsersTable users={users} />
        </div>
      </main>
    </div>
  );
}
