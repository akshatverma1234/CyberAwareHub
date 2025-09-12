import React from "react";
import Sidebar from "@/components/Admin/Sidebar";

const Homepage = () => {
  return (
    <div className="w-[90%] bg-[#f5f5f6] w-full h-[400px]">
      Homepage
      <div className="w-[10%]">
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
