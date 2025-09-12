"use client";
import { useState } from "react";

export default function AdminUsersTable({ users }) {
  const [loading, setLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [userList, setUserList] = useState(users);

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailAddresses?.[0]?.emailAddress
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "admin" && user.role === "cyberhub_admin") ||
      (roleFilter === "member" && user.role !== "cyberhub_admin");

    return matchesSearch && matchesRole;
  });

  const handleUpdateRole = async (userId, newRole) => {
    setLoading((prev) => ({ ...prev, [userId]: "role" }));

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update role");
      }

      const result = await response.json();
      alert(`✅ ${result.message}`);

      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                publicMetadata: { ...user.publicMetadata, role: newRole },
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    const confirmMessage = `Are you sure you want to delete user: ${userEmail}?\n\nThis action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    setLoading((prev) => ({ ...prev, [userId]: "delete" }));

    try {
      const response = await fetch(`/api/admin/users/${userId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      const result = await response.json();

      alert(`✅ ${result.message}`);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="bg-[#4da1ff] bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#0f0f0f] to-[#333333] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold">
                {users.filter((user) => user.lastActiveAt).length}
              </p>
            </div>
            <div className="bg-[#474747] bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
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
                {users.filter((user) => user.role === "cyberhub_admin").length}
              </p>
            </div>
            <div className="bg-purple-500 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#ebebec] border border-[#ebebec] rounded-lg px-4 py-2 pl-10 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#F5F5F5] border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-300 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <p className="text-lg font-medium text-gray-900">
                        No users found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
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
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                              {(
                                user.fullName ||
                                user.emailAddresses?.[0]?.emailAddress ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName || "Unnamed User"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.emailAddresses?.[0]?.emailAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "cyberhub_admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "cyberhub_admin" ? "Admin" : "Member"}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={user.role || "member"}
                          shows
                          onChange={(e) =>
                            handleUpdateRole(user.id, e.target.value)
                          }
                          disabled={loading[user.id] === "role"}
                          className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          <option value="member">Member</option>
                          <option value="cyberhub_admin">Admin</option>
                        </select>
                        <button
                          onClick={() =>
                            handleDeleteUser(
                              user.id,
                              user.emailAddresses?.[0]?.emailAddress
                            )
                          }
                          disabled={loading[user.id] === "delete"}
                          className="text-red-600 hover:text-red-800 transition-colors duration-150 p-2 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete User"
                        >
                          {loading[user.id] === "delete" ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
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
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span>{" "}
                results
                {searchTerm || roleFilter !== "all" ? (
                  <span className="text-gray-500">
                    {" "}
                    (filtered from {users.length} total)
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
