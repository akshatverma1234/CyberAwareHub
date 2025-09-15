"use client";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaReadme } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@clerk/nextjs";
import { IoMdAdd } from "react-icons/io";

const CommunityStories = () => {
  const [caseStories, setCaseStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    async function fetchCommunityStories() {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/community-stories");
        const approvedStories = res.data.filter(
          (story) => story.status === "approved"
        );
        setCaseStories(approvedStories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommunityStories();
  }, []);

  return (
    <div className="bg-[#06080e] w-full min-h-[100vh]">
      <div className="container mx-auto px-6 py-22">
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
        {isLoading && (
          <div className="w-full flex justify-center py-20">
            <CircularProgress color="success" />
          </div>
        )}

        {!isLoading && caseStories.length === 0 && (
          <div className="text-center py-20">
            <Typography variant="h6" className="text-gray-300">
              No approved community stories available yet.
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2">
              Stories are reviewed by our admin team before being published.
            </Typography>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 px-20 py-4">
          {caseStories.map((caseStudy, index) => (
            <Card
              key={index}
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
                  className="max-h-[100px]  overflow-hidden"
                >
                  {caseStudy.summary}
                </Typography>
              </CardContent>
              <div className="flex card justify-between">
                <CardActions className="bg-black !rounded-tr-[20px]">
                  <Button className="flex !rounded-[10px]">
                    <WhatsappShareButton
                      size={32}
                      url={url}
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
      </div>
    </div>
  );
};

export default CommunityStories;
