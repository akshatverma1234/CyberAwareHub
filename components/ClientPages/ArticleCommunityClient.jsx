"use client";
import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { MyContext } from "@/context/AppContext";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa6";
import { FaReadme } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const ArticleCommunityClient = ({ initialData }) => {
  const context = useContext(MyContext);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="w-full px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center">
            Community Articles
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Real cybersecurity incidents shared by our community members
          </p>
        </div>
        <div className="!cursor-pointer">
          <Button
            variant="outlined"
            className="flex gap-2 !text-white !bg-green-400 !px-6 !py-3 !rounded-[10px]"
            onClick={() =>
              context.setOpenPanel({
                open: true,
                model: "addArticle",
              })
            }
          >
            <IoMdAdd size={25} />
            <h1 className="text-base sm:text-lg">Add case study</h1>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 py-4">
        {initialData.length === 0 && (
          <div className="text-center py-20 col-span-full">
            <Typography variant="h6" className="text-gray-300">
              No approved community stories available yet.
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2">
              Stories are reviewed by our admin team before being published.
            </Typography>
          </div>
        )}

        {initialData.map((caseStudy, index) => (
          <Card
            key={caseStudy._id || index}
            className="flex flex-col border-2 border-white !rounded-[20px] h-full"
          >
            <CardContent className="flex-grow">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="!font-[600] text-lg sm:text-xl"
              >
                {caseStudy.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="max-h-[100px] overflow-hidden text-sm sm:text-base"
              >
                {caseStudy.summary}
              </Typography>
            </CardContent>
            <div className="flex flex-col justify-end items-end mx-4 mb-2">
              <p className="text-gray-800 text-[12px] font-[400]">Author</p>
              <p className="text-gray-800 text-[16px] font-[400]">
                {caseStudy.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row card justify-between">
              <CardActions className="bg-black !rounded-tr-[20px]">
                <Button className="flex !rounded-[10px]">
                  <WhatsappShareButton
                    size={32}
                    url={`${process.env.PUBLIC_URL}community-stories/${caseStudy._id}`}
                    title={`Check out this cybersecurity story: ${caseStudy.title}`}
                  >
                    <FaWhatsapp className="text-2xl text-green-400 hover:text-green-300 transition-colors" />
                  </WhatsappShareButton>
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    context.setOpenPanel({
                      open: true,
                      model: "openArticleDialogBox",
                      id: caseStudy._id,
                    })
                  }
                  className="flex items-center gap-2 !text-white hover:!text-blue-300 transition-colors"
                >
                  <FaReadme />
                  Learn More
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ArticleCommunityClient;
