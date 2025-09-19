import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";

const ArticleCard = ({ id, image, title, summary, slug }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`;

  return (
    <div
      key={id}
      className="bg-white text-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden w-full md:w-[420px] h-auto md:h-[280px]"
    >
      <div className="w-full h-48 md:w-1/2 md:h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full md:w-1/2 p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-sm md:text-[16px] font-semibold line-clamp-2 md:line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-xs md:text-xs mt-2 line-clamp-4 md:line-clamp-4">
            {summary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-gray-500">
            <WhatsappShareButton url={url} title={`Check out: ${title}`}>
              <FaWhatsapp className="text-xl text-green-500 hover:text-green-400 transition-colors" />
            </WhatsappShareButton>

            <button className="p-1 rounded-full hover:bg-gray-100 transition">
              <FaShareAlt className="text-lg text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <Link
            href={`/articles/${slug}`}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
