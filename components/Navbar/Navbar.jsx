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
import { IoClose, IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isOpenResponsible, setIsOpenResponsible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-800 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">CyAwareHub</h1>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link href="/" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/") ? "text-cyan-400" : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </li>
          </Link>
          <Link href="/articles" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/articles") ? "text-cyan-400" : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              Articles
            </li>
          </Link>
          <Link href="/case-studies" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/case-studies") ? "text-cyan-400" : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              Case Studies
            </li>
          </Link>
          <Link href="/community-stories" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/community-stories")
                  ? "text-cyan-400"
                  : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              Community Stories
            </li>
          </Link>
          <Link href="/cyber-news" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/cyber-news") ? "text-cyan-400" : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              News
            </li>
          </Link>
          <li
            className={`cursor-pointer relative group ${
              isActive("/responsible-disclosure")
                ? "text-cyan-400"
                : "text-gray-200"
            }`}
            onMouseEnter={() => setIsOpenResponsible(true)}
            onClick={closeMobileMenu}
          >
            <Link href="/responsible-disclosure" passHref>
              <div className="flex items-center justify-center gap-2 hover:text-cyan-400">
                Responsible Disclosure
                <FaAngleDown className="transition-transform duration-200 group-hover:rotate-180" />
              </div>
            </Link>

            {isOpenResponsible && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 
                 bg-white w-full shadow-lg rounded-b z-50"
                onMouseLeave={() => setIsOpenResponsible(false)}
              >
                <Link href="hall-of-fame" passHref>
                  <Button className="!block !px-4 !py-2 hover:!bg-gray-200 !rounded-b !transition-colors w-full !text-black !text-[12px] text-left">
                    Hall of Fame
                  </Button>
                </Link>
              </div>
            )}
          </li>

          <Link href="/about-us" passHref>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                isActive("/about-us") ? "text-cyan-400" : "text-gray-200"
              }`}
              onClick={closeMobileMenu}
            >
              About Us
            </li>
          </Link>
        </ul>
        <div className="hidden md:flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button
                variant="outlined"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outlined"
                className="!rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Signup
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex flex-row items-center gap-2 p-2 h-[40px] bg-gray-700 rounded-[20px]">
              <UserButton />
              <div className="w-full text-gray-200 font-[600] flex items-center">
                <h4 className="text-[14px]">{user?.fullName}</h4>
              </div>
            </div>
          </SignedIn>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        } bg-gray-800`}
      >
        <ul className="flex flex-col p-4 space-y-2 text-white font-medium">
          <Link href="/" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "bg-purple-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </li>
          </Link>
          <Link href="/articles" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/articles")
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              Articles
            </li>
          </Link>
          <Link href="/case-studies" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/case-studies")
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              Case Studies
            </li>
          </Link>
          <Link href="/community-stories" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/community-stories")
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              Community Stories
            </li>
          </Link>
          <Link href="/cyber-news" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/cyber-news")
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              News
            </li>
          </Link>
          <li
            className={`block px-3 py-2 rounded-md transition-colors ${
              isActive("/responsible-disclosure")
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <Link href="/responsible-disclosure" passHref>
                <span
                  className="flex-grow flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  Responsible Disclosure
                </span>
              </Link>

              <FaAngleDown
                className={`transition-transform duration-200 cursor-pointer ${
                  isOpenResponsible ? "rotate-180" : ""
                }`}
                onClick={() => setIsOpenResponsible(!isOpenResponsible)}
              />
            </div>

            {isOpenResponsible && (
              <div className="bg-gray-800 text-white w-full mt-2 rounded-md">
                <Link href="hall-of-fame" passHref>
                  <Button
                    className="!block !px-4 !py-2 hover:!bg-gray-700 !rounded-md !transition-colors w-full !text-white !text-left"
                    onClick={() => {
                      setIsOpenResponsible(false);
                      closeMobileMenu();
                    }}
                  >
                    Hall of Fame
                  </Button>
                </Link>
              </div>
            )}
          </li>
          <Link href="/about-us" passHref>
            <li
              className={`block px-3 py-2 rounded-md transition-colors ${
                isActive("/about-us")
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              About Us
            </li>
          </Link>
        </ul>

        <div className="flex flex-col p-4 border-t border-gray-700 mt-2 space-y-2 gap-2">
          <SignedOut>
            <SignInButton>
              <Button
                variant="outlined"
                className="!w-full !rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outlined"
                className="!w-full !rounded-[10px] !text-[#00FFFF] !border-1 !border-[#00FFFF] !bg-black !font-600 hover:!bg-[#00FFFF] hover:!text-black !transition !duration-400 !ease-in-out"
              >
                Signup
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex flex-row items-center gap-2 p-2 h-[40px] bg-gray-700 rounded-[20px]">
              <UserButton />
              <div className="w-full text-gray-200 font-[600] flex items-center">
                <h4 className="text-[14px]">{user?.fullName}</h4>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
