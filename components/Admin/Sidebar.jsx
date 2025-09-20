"use client";
import React, { useContext } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { MyContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, onClose }) => {
  const context = useContext(MyContext);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bg-[#f5f5f6] h-full transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 w-[75%] md:w-[18%] py-4 px-3 z-50`}
      >
        <div className="py-1 w-full border-b border-gray-700 mb-6">
          <Link href="/admin" className="block">
            <div className="flex justify-between items-center">
              <h1 className="text-[#4F507F] font-bold text-xl tracking-wide">
                CYBER<span className="text-[#404040] opacity-80">HUB</span>
              </h1>

              <button
                onClick={onClose}
                className="md:hidden p-2 text-gray-600 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider px-3 mb-3">
              Main Menu
            </p>
            <Link href="/admin" className="block">
              <Button
                className={`w-full !text-black hover:!text-black !capitalize !justify-start flex gap-3 
                  text-[14px] !font-medium items-center !py-3 !px-3 
                  hover:!bg-[#D9D9D9] !rounded-lg transition-all duration-200 group 
                  ${isActive("/admin") ? "!bg-gray-300" : "!bg-[#f5f5f6]"}`}
              >
                <MdDashboard className="text-[18px] group-hover:text-blue-400 transition-colors" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider px-3 mb-3">
              Management
            </p>

            <Link href="/admin/users" className="block">
              <Button
                className={`w-full !text-black !capitalize !justify-start flex gap-3 text-[14px] 
                  !font-medium items-center !py-3 !px-3 hover:!bg-[#D9D9D9] 
                  !rounded-lg transition-all duration-200 group 
                  ${isActive("/admin/users") ? "!bg-gray-300" : ""}`}
              >
                <FaUsers className="text-[18px] group-hover:text-blue-400 transition-colors" />
                <span>Users</span>
                <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  12
                </span>
              </Button>
            </Link>

            <Link href="/admin/caseStudies" className="block">
              <Button
                className={`w-full !text-black !capitalize !justify-start flex gap-3 text-[14px] 
                  !font-medium items-center !py-3 !px-3 hover:!bg-[#D9D9D9] 
                  !rounded-lg transition-all duration-200 group 
                  ${isActive("/admin/caseStudies") ? "!bg-gray-300" : ""}`}
              >
                <FaBookReader className="text-[18px] group-hover:text-blue-400 transition-colors" />
                <span>CaseStudies</span>
              </Button>
            </Link>

            <Link href="/admin/community-casestudies" className="block">
              <Button
                className={`w-full !text-black !capitalize !justify-start flex gap-3 text-[14px] 
                  !font-medium items-center !py-3 !px-3 hover:!bg-[#D9D9D9] 
                  !rounded-lg transition-all duration-200 group 
                  ${
                    isActive("/admin/community-casestudies")
                      ? "!bg-gray-300"
                      : ""
                  }`}
              >
                <FaBookReader className="text-[18px] group-hover:text-blue-400 transition-colors" />
                <span>Community CaseStudies</span>
              </Button>
            </Link>

            <Link href="/admin/articles" className="block">
              <Button
                className={`w-full !text-black !capitalize !justify-start flex gap-3 text-[14px] 
                  !font-medium items-center !py-3 !px-3 hover:!bg-[#D9D9D9] 
                  !rounded-lg transition-all duration-200 group 
                  ${isActive("/admin/articles") ? "!bg-gray-300" : ""}`}
              >
                <GrArticle className="text-[18px] group-hover:text-blue-400 transition-colors" />
                <span>Articles</span>
              </Button>
            </Link>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-200 flex flex-col bg-white rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
              Account
            </p>

            <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                flex items-center justify-center text-white font-bold"
              >
                AV
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">
                  Akshat Verma
                </p>
                <p className="text-xs text-gray-500">vakshat421@gmail.com</p>
              </div>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <div className="bg-gray-300 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-800">Admin Dashboard</p>
            <p className="text-xs text-gray-800">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
