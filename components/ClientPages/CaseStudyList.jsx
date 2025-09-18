"use client";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MyContext } from "@/context/AppContext";
import { FaReadme } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa6";

const CaseStudies = ({ initialData }) => {
  const context = useContext(MyContext);
  const url = window.location.href;

  const displayedCaseStudies = initialData;

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <div className="w-full h-full mb-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 px-20">
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
                  <p className="text-gray-800 text-[12px] font-[400]">Source</p>
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

export default CaseStudies;
