"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Homepage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/api/admin/stats");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-white">Loading stats...</p>;
  return (
    <div className="w-full min-h-screen bg-[#f5f5f6]">
      <Navbar />
      <div className="flex ml-[18%] p-8">
        <div className="bg-gradient-to-b from-[#1b88ff] to-[#4fa4ff] rounded-xl p-6 text-white ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
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
              <p className="text-3xl font-bold">{stats.recentlyActiveUsers}</p>
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
      </div>
    </div>
  );
};

export default Homepage;
