"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Eye,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const Homepage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-medium">Error Loading Dashboard</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const pieColors = ["#10B981", "#F59E0B", "#EF4444"];
  const storyStatusData = [
    {
      name: "Approved",
      value: stats.communityStories.approved,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: stats.communityStories.pending,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value: stats.communityStories.rejected,
      color: "#EF4444",
    },
  ];

  const pageViewData = stats.popularPages.map((page) => ({
    name:
      page.page.length > 15 ? page.page.substring(0, 15) + "..." : page.page,
    views: page.views,
  }));

  return (
    <div className="w-full min-h-screen bg-[#f5f5f6]">
      <Navbar />
      <div className="ml-[18%] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-[35px] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Views</p>
                <p className="text-3xl font-bold">
                  {stats.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-white mt-1">
                  +{stats.recentViews} this week
                </p>
              </div>
              <div className="bg-[#4da1ff] bg-opacity-30 rounded-full p-3">
                <FaArrowTrendUp size={35} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#0f0f0f] to-[#333333] rounded-[35px] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm font-medium">New Users</p>
                <p className="text-3xl font-bold">{stats.newUsers}</p>
              </div>
              <div className="bg-[#474747] bg-opacity-30 rounded-full p-3">
                <FaArrowTrendUp size={35} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-[35px] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                <p className="text-sm text-white mt-1">
                  +{stats.newUsers} this week
                </p>
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

          <div className="bg-gradient-to-b from-[#0f0f0f] to-[#333333] rounded-[35px] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm font-medium">
                  Active Users
                </p>
                <p className="text-3xl font-bold">
                  {stats.recentlyActiveUsers}
                </p>
              </div>
              <div className="bg-[#474747] bg-opacity-30 rounded-full p-3">
                <FaArrowTrendUp size={35} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[15px] shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Community Stories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.communityStories.total}
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  {stats.communityStories.pending} pending
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[15px] shadow-sm  p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.engagementRate}
                </p>
                <p className="text-sm text-gray-500 mt-1">views per user</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-[15px] shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Community Stories Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={storyStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {storyStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {storyStatusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[15px] shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Most Popular Pages</h3>
            {stats.viewsCollectionExists ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pageViewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600 mb-2">No page view data yet</p>
                  <p className="text-sm text-gray-500">
                    Views will appear here once users start browsing your site
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stats.communityStories.pending > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="font-medium text-orange-800">Action Required</h3>
              </div>
              <p className="text-orange-700 mt-2">
                You have {stats.communityStories.pending} community stories
                waiting for review.
              </p>
              <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                Review Stories
              </button>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">Recent Activity</h3>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-blue-700 text-sm">
                • {stats.newUsers} new users this week
              </p>
              <p className="text-blue-700 text-sm">
                • {stats.communityStories.recent} new stories this week
              </p>
              <p className="text-blue-700 text-sm">
                • {stats.recentViews} page views this week
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium text-green-800">Platform Health</h3>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-green-700 text-sm">
                • {stats.recentlyActiveUsers} recently active users
              </p>
              <p className="text-green-700 text-sm">
                • {stats.communityStories.approved} approved stories
              </p>
              <p className="text-green-700 text-sm">
                • {stats.avgStoriesPerUser} stories per user avg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
