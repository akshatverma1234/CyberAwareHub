"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-800 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 navbar">
        <h1 className="text-2xl font-bold text-white">Cyber Hub</h1>
        <ul className="flex items-center gap-6 text-white font-medium">
          <Link href="/">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/") ? "text-cyan-400" : "text-gray-200"
              }`}
            >
              Home
            </li>
          </Link>
          <Link href="/articles">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/articles") ? "text-cyan-400" : "text-gray-200"
              }`}
            >
              Articles
            </li>
          </Link>
          <Link href="/case-studies">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/case-studies") ? "text-cyan-400" : "text-gray-200"
              }`}
            >
              Case Studies
            </li>
          </Link>
          <Link href="/community-stories">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/community-stories")
                  ? "text-cyan-400"
                  : "text-gray-200"
              }`}
            >
              Community Stories
            </li>
          </Link>
          <Link href="/cyber-news">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/cyber-news") ? "text-cyan-400" : "text-gray-200"
              }`}
            >
              News
            </li>
          </Link>
          <Link href="/about-us">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/about-us") ? "text-cyan-400" : "text-gray-200"
              }`}
            >
              About Us
            </li>
          </Link>
        </ul>
        <SignedOut>
          <div className="flex  gap-2">
            <SignInButton>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Signup
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-row items-center gap-2  p-2 h-[40px] bg-gray-700   rounded-[20px]">
            <UserButton />
            <div className="w-full text-gray-200 font-[600] flex items-center">
              <h4 className="text-[14px]">{user?.fullName}</h4>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
