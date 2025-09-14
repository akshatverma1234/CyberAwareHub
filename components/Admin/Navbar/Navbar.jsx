"use client";
import { Button } from "@mui/material";
import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import { UserButton, SignedOut, useUser, SignedIn } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, user } = useUser();

  return (
    <div className="w-full h-[60px] flex items-center px-4">
      <div className="flex items-center gap-2 ml-[18%]">
        <Button>
          <RiMenu2Line className="text-black" size={18} />
        </Button>
        <Button className="!text-gray-600 !text-[12px] !uppercase">
          Dashboard
        </Button>
      </div>

      <div className="ml-auto flex items-center">
        <SignedIn>
          <div className="flex items-center gap-2 p-2 h-[40px] bg-gray-200 rounded-[20px] shadow-md">
            <UserButton />
            <h4 className="text-gray-900 font-semibold text-[14px]">
              {user?.fullName}
            </h4>
          </div>
        </SignedIn>

        <SignedOut>
          <Button
            variant="contained"
            className="!bg-gray-800 !text-white !rounded-[20px] !text-[12px] ml-2"
          >
            Sign In
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
