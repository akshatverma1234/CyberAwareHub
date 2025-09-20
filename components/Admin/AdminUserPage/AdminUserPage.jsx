"use client";

import { MyContext } from "@/context/AdminAppContext";
import { useContext, useState, useMemo } from "react";

export default function AdminUsersTable({ users }) {
  const [loading, setLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [userList, setUserList] = useState(users);

  const context = useContext(MyContext);

  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
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
  }, [userList, searchTerm, roleFilter]);

  // Update user role
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
      context.openAlertBox("success", `${result.message}`);

      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: newRole,
                publicMetadata: { ...user.publicMetadata, role: newRole },
              }
            : user
        )
      );
    } catch (error) {
      context.openAlertBox("error", `Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    const confirmMessage = `Are you sure you want to delete user: ${userEmail}?\n\nThis action cannot be undone.`;
    if (!confirm(confirmMessage)) return;

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
      context.openAlertBox("success", `${result.message}`);

      setUserList((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      context.openAlertBox("error", `Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-xl p-6 text-white">
          <p className="text-blue-200 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold">{userList.length}</p>
        </div>
        <div className="bg-gradient-to-b from-[#0f0f0f] to-[#333333] rounded-xl p-6 text-white">
          <p className="text-gray-200 text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold">
            {userList.filter((user) => user.lastActiveAt).length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <p className="text-purple-200 text-sm font-medium">Admins</p>
          <p className="text-3xl font-bold">
            {userList.filter((user) => user.role === "cyberhub_admin").length}
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-[#ffffff] rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#ebebec] border border-[#ebebec] rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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

      {/* Users Table + Mobile Cards */}
      <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-lg">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
                  User
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
                  Joined
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
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
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <img
                        src={user.imageUrl || "/default-avatar.png"}
                        alt="avatar"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user.fullName || "Unnamed User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          user.role === "cyberhub_admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "cyberhub_admin" ? "Admin" : "Member"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          user.lastActiveAt
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.lastActiveAt ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <select
                          value={user.role || "member"}
                          onChange={(e) =>
                            handleUpdateRole(user.id, e.target.value)
                          }
                          disabled={loading[user.id] === "role"}
                          className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-sm"
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
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden p-4">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4 border"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={user.imageUrl || "/default-avatar.png"}
                    alt="avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.fullName || "Unnamed User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.emailAddresses?.[0]?.emailAddress}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Role: </span>
                    {user.role === "cyberhub_admin" ? "Admin" : "Member"}
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    {user.lastActiveAt ? "Active" : "Inactive"}
                  </div>
                  <div>
                    <span className="font-medium">Joined: </span>
                    {new Date(user.createdAt).toLocaleDateString("en-US")}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <select
                    value={user.role || "member"}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                    disabled={loading[user.id] === "role"}
                    className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-sm"
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
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
