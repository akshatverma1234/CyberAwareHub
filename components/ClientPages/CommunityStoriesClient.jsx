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

const CommunityStoriesClient = ({ initialData }) => {
  const context = useContext(MyContext);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="w-full px-20 flex items-center justify-between">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            Community Stories
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real cybersecurity incidents shared by our community members
          </p>
        </div>
        <div className="!cursor-pointer">
          <Button
            variant="outlined"
            className="flex gap-2 !text-white !bg-green-400"
            onClick={() =>
              context.setOpenPanel({
                open: true,
                model: "addCaseStudy",
              })
            }
          >
            <IoMdAdd size={35} />
            <h1>Add case study</h1>
          </Button>
        </div>
      </div>

      {/* The Case Study Cards */}
      <div className="grid grid-cols-3 gap-6 px-20 py-4">
        {initialData.length === 0 && (
          <div className="text-center py-20">
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
            className="flex flex-col border-2 border-white !rounded-[20px]"
          >
            <CardContent className="flex-grow">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="!font-[600]"
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
                className="max-h-[100px] overflow-hidden"
              >
                {caseStudy.summary}
              </Typography>
            </CardContent>
            <div className="flex card justify-between">
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
                      model: "openCommunityDialogBox",
                      id: caseStudy._id,
                    })
                  }
                  className="flex items-center gap-2 !text-white hover:!text-blue-300 transition-colors"
                >
                  <FaReadme />
                  Learn More
                </Button>
              </CardActions>
              <div className="flex flex-col justify-end mx-4">
                <p className="text-gray-800 text-[12px] font-[400]">Author</p>
                <p className="text-gray-800 text-[16px] font-[400]">
                  {caseStudy.name}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CommunityStoriesClient;
