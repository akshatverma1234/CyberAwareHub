// app/admin/users/page.tsx
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { redirect } from "next/navigation";

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

  const users = await clerkClient.users.getUserList({ limit: 100 });

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{users.data.length}</p>
              </div>
              <div className="bg-[#4da1ff] bg-opacity-30 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#0f0f0f] to-[#333333] rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm font-medium">
                  Active Users
                </p>
                <p className="text-3xl font-bold">
                  {users.data.filter((user) => user.lastActiveAt).length}
                </p>
              </div>
              <div className="bg-[#474747] bg-opacity-30 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Admins</p>
                <p className="text-3xl font-bold">
                  {
                    users.data.filter(
                      (user) => user.publicMetadata?.role === "cyberhub_admin"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-purple-500 bg-opacity-30 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM2 8a8 8 0 1016 0A8 8 0 002 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#ffffff] rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full bg-[#ebebec] border border-[#ebebec] rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="bg-[#F5F5F5] border border-gray-600 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Member</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add User
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#ffffff]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.data.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-750 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-825"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.imageUrl ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.imageUrl}
                              alt=""
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-black font-semibold">
                              {(
                                user.fullName ||
                                user.emailAddresses[0]?.emailAddress ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">
                            {user.fullName || "Unnamed User"}
                          </div>
                          <div className="text-sm text-gray-900">
                            {user.emailAddresses[0]?.emailAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.publicMetadata?.role === "cyberhub_admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.publicMetadata?.role === "cyberhub_admin"
                          ? "Admin"
                          : "Member"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.lastActiveAt
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.lastActiveAt ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-blue-800 hover:text-blue-300 transition-colors duration-150 p-2 hover:bg-gray-700 rounded-lg">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-300 transition-colors duration-150 p-2 hover:bg-gray-700 rounded-lg">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-750 px-6 py-3 flex items-center justify-between border-t border-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium text-black">1</span> to{" "}
                  <span className="font-medium text-black">
                    {users.data.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-black">
                    {users.data.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-800 text-sm font-medium text-white">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
