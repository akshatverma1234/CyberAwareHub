// components/ApproachFeaturesClient.jsx
"use client";

import React from "react";

const ApproachFeaturesClient = ({ features }) => {
  const items = features.map((feature, index) => ({
    content: (
      <div
        key={index}
        className="bg-[#ffff] rounded-lg p-8 border-4 border-blue-900 text-center hover:border-blue-300 !transition-all !duration-400 shadow-md"
      >
        <div className="flex justify-center mb-4">{feature.icon}</div>
        <h3 className="text-black text-xl font-bold mb-4">{feature.title}</h3>
        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
      </div>
    ),
  }));

  return <div style={{ height: "250px", position: "relative" }}></div>;
};

export default ApproachFeaturesClient;
