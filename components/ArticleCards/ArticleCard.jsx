import React from "react";
import Link from "next/link";
import { FaShareAltSquare, FaEllipsisH } from "react-icons/fa";

const ArticleCard = ({ id, image, title, summary, slug }) => {
  return (
    <div
      key={id}
      className="bg-white text-black rounded-2xl shadow-lg flex overflow-hidden w-[390px] max-h-[260px]"
    >
      {/* Left Image */}
      <div className="w-[35%] relative">
        <img
          src={image}
          alt={title}
          width={300}
          height={300}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Content */}
      <Link
        href={`/articles/${slug}`}
        className="w-2/3 p-6 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-[16px] font-bold mb-2">{title}</h2>
          <p className="text-gray-600 text-[10px]">{summary}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 text-gray-500">
            <FaShareAltSquare className="cursor-pointer hover:text-cyan-500" />
            <FaEllipsisH className="cursor-pointer hover:text-cyan-500" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
