"use client";
import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { caseStudies } from "@/assets/caseStudies";
import { MyContext } from "@/context/AppContext";
import { FaReadme } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa6";
import axios from "axios";
const CaseStudies = () => {
  const [data, setData] = useState([]);
  const context = useContext(MyContext);
  const url = window.location.href;

  useEffect(() => {
    const fetchCommunityStudies = async () => {
      try {
        const response = await axios.get("/api/admin/caseStudies");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunityStudies();
  }, []);

  return (
    <div className="bg-[#06080e] w-full h-[150vh]">
      <div className="grid grid-cols-3 gap-6 px-20">
        {data.map((caseStudy, index) => (
          <Card
            key={index}
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
            <div className="flex card">
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
