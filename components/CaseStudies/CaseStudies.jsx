"use client";
import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MyContext } from "@/context/AppContext";
import { FaReadme } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa6";
import axios from "axios";
import SkeletonLoader from "../Loader/SkeletonLoader";
const CaseStudies = ({ limit }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const url = window.location.href;

  useEffect(() => {
    const fetchCommunityStudies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/caseStudies");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunityStudies();
  }, []);
  const displayedCaseStudies = limit ? data.slice(0, limit) : data;

  return (
    <div className="bg-[#06080e] w-full h-full">
      <div className="grid grid-cols-3 gap-6 px-20">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <SkeletonLoader type="caseStudy" key={`skeleton-${i}`} />
          ))
        ) : (
          <>
            {displayedCaseStudies.map((caseStudy, index) => (
              <Card
                key={caseStudy._id || index}
                className="flex flex-col h-full border-2 border-white !rounded-[20px]"
              >
                <img
                  component="img"
                  alt={caseStudy.title}
                  src={caseStudy.image}
                  className="w-full h-[220px] object-cover"
                />
                <CardContent className="flex-grow">
                  <Typography gutterBottom variant="h5" component="div">
                    {caseStudy.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                          model: "caseStudy",
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
                    <p className="text-gray-800 text-[12px] font-[400]">
                      Source
                    </p>
                    <p className="text-gray-800 text-[16px] font-[400]">
                      {caseStudy.name}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
