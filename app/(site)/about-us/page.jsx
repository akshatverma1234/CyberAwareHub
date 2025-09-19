"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Shield,
  Users,
  BookOpen,
  Globe,
  Lock,
  TrendingUp,
  Eye,
  FileText,
  Zap,
  Award,
} from "lucide-react";

const AboutUs = () => {
  const services = [
    {
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      title: "Cyber Attack Case Studies",
      description:
        "Learn from real-world incidents through detailed analysis of major cyberattacks, interactive timelines, and actionable insights you can apply to protect yourself.",
      features: [
        "Real-World Incident Analysis",
        "Interactive Timelines",
        "Lessons Learned",
        "Impact Assessment",
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Community Stories",
      description:
        "Share and learn from peer experiences with expert-reviewed content, discussion forums, and recognition programs for outstanding contributors.",
      features: [
        "Peer-to-Peer Learning",
        "Anonymized Sharing",
        "Expert Review Process",
        "Discussion Forums",
      ],
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-400" />,
      title: "Articles & Insights",
      description:
        "Comprehensive library covering beginner guides, advanced deep dives, practical checklists, and industry-specific guidance for all skill levels.",
      features: [
        "Beginner-Friendly Guides",
        "Advanced Deep Dives",
        "Practical Checklists",
        "Myth-Busting Content",
      ],
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Latest Cyber News",
      description:
        "Stay informed with curated news including daily threat intelligence, policy updates, technology trends, and expert commentary.",
      features: [
        "Daily Threat Intelligence",
        "Policy Updates",
        "Technology Trends",
        "Global Perspective",
      ],
    },
  ];

  const approachFeatures = [
    {
      icon: <Lock className="w-12 h-12 text-blue-400" />,
      title: "Security by Design",
      description:
        "Every feature undergoes rigorous security review with modern authentication and access control systems.",
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: "Privacy First",
      description:
        "We collect only necessary information with encrypted data and clear privacy controls that put users in charge.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-400" />,
      title: "Continuous Improvement",
      description:
        "Regular security audits, community feedback integration, and cutting-edge cybersecurity best practices.",
    },
  ];

  const futureFeatures = [
    "Enhanced email notifications for contributors",
    "Interactive learning modules and simulations",
    "AI-powered personalized learning experiences",
    "Global community hubs for regional focus",
    "Mobile app with specialized security features",
    "Certification and recognition programs",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#06080e] w-full min-h-screen">
      <div className="m-auto flex flex-col items-center justify-center p-8 sm:p-12 md:p-20 lg:p-28">
        <h1
          className="uppercase text-blue-200 text-sm sm:text-lg tracking-widest mb-4 mt-14 mb:mt-0 sm:mt-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          About us
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-center mb-6">
            Cyber Awareness Hub
          </h1>
          <p className="text-white text-sm sm:text-[16px] lg:text-[18px] text-center max-w-4xl leading-relaxed">
            Cyber Awareness Hub is a community-driven platform dedicated to
            spreading cybersecurity awareness through real-world case studies,
            insightful articles, and the latest news on cyber threats. Our
            mission is to make cybersecurity knowledge accessible, engaging, and
            practical for everyone.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 mb-12 md:mb-20 gap-8 md:gap-12">
        <div className="max-w-[550px] flex flex-col gap-6 text-sm sm:text-[16px] text-justify md:text-left">
          <p className="text-white leading-relaxed">
            At Cyber Awareness Hub, we believe cybersecurity is everyone's
            responsibility. Our mission is to spread awareness, share knowledge,
            and empower individuals to stay safe online.
          </p>
          <p className="text-white leading-relaxed">
            Through real-world case studies, community contributions, and
            insightful articles, we aim to bridge the gap between technical
            expertise and practical understanding. Whether you're a student,
            professional, or just someone curious about online safety — this
            platform is built for you.
          </p>
          <p className="text-white leading-relaxed">
            We combine full-stack web development with cybersecurity principles
            to ensure a secure, user-friendly experience. Every feature is
            designed with safety in mind — from authentication and access
            control to safe community submissions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="./IMG_20240416_210733.jpg"
            className="w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px] rounded-[15px] border-2 border-white mb-2 object-cover overflow-hidden"
            alt="Founder Akshat Verma"
          />
          <span className="text-white font-bold mt-2">Akshat Verma</span>
        </div>
      </div>

      <div className="py-12 sm:py-20 bg-[#0a0f1a]">
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-8">
          <h1 className="text-white text-3xl sm:text-4xl md:text-[48px] font-bold mb-4 text-center">
            Our Mission
          </h1>
          <p className="text-blue-200 text-sm sm:text-[18px] lg:text-[20px] mb-8 sm:mb-12 text-center italic">
            Why We Exist
          </p>
          <div className="max-w-6xl text-justify flex flex-col gap-8 text-sm sm:text-[16px] leading-relaxed">
            <p className="text-white">
              In today's interconnected digital landscape, cybersecurity is no
              longer a concern reserved for IT professionals and large
              corporations. Every click, every download, every online
              transaction carries potential risks that can affect individuals,
              families, small businesses, and entire communities. The digital
              divide isn't just about access to technology—it's also about
              understanding how to use it safely.
            </p>
            <p className="text-white">
              Our mission is crystal clear:{" "}
              <span className="text-blue-400 font-semibold">
                to make cybersecurity knowledge accessible, engaging, and
                practical for all
              </span>
              . We believe that cybersecurity education shouldn't be locked
              behind technical jargon, expensive courses, or corporate training
              programs. Instead, it should be available to anyone who wants to
              protect themselves, their loved ones, and their communities in the
              digital world.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-20 bg-[#06080e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-[42px] font-bold mb-4">
              What You'll Find Here
            </h2>
            <p className="text-blue-200 text-sm sm:text-[18px] italic">
              Comprehensive Resources for Everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#0a0f1a] rounded-lg p-6 sm:p-8 border border-blue-900 hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-white text-lg sm:text-xl font-bold ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-blue-200 text-xs sm:text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-20 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-[42px] font-bold mb-4">
              Our Approach
            </h2>
            <p className="text-blue-200 text-sm sm:text-[18px] italic">
              Secure. Scalable. User-Friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {approachFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-[#ffff] rounded-lg p-6 sm:p-8 border-4 border-blue-900 text-center hover:border-blue-300 !transition-all !duration-400 shadow-md text-sm sm:text-base"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-black text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 sm:p-8 border border-blue-800">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-4">
              Built with Modern Technology
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Our platform is built on a robust foundation using{" "}
              <span className="text-blue-400 font-semibold">Next.js</span> for
              optimal performance,{" "}
              <span className="text-blue-400 font-semibold">MongoDB</span> for
              scalable data management, and modern authentication systems. Every
              feature undergoes rigorous security review with a
              cybersecurity-first approach.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-600">
                Next.js
              </span>
              <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-600">
                MongoDB
              </span>
              <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-600">
                Modern Authentication
              </span>
              <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-600">
                Access Control
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-20 bg-[#06080e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-[42px] font-bold mb-4">
              Looking Ahead
            </h2>
            <p className="text-blue-200 text-sm sm:text-[18px] italic">
              Our Vision for the Future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                We're constantly evolving to build a{" "}
                <span className="text-blue-400 font-semibold">
                  global hub for cybersecurity awareness and collaboration
                </span>
                . Our roadmap includes cutting-edge features designed to enhance
                learning and community engagement.
              </p>

              <div className="space-y-4">
                {futureFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Zap className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-white text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg p-6 sm:p-8 border border-blue-800 mt-8 md:mt-0">
              <div className="text-center">
                <Award className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-4">
                  Global Impact Goal
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Building partnerships with educational institutions,
                  government agencies, and cybersecurity organizations to create
                  a worldwide network of digital safety advocates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-20 bg-gradient-to-br from-[#0a0f1a] to-[#06080e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-white text-3xl sm:text-4xl md:text-[42px] font-bold mb-4 sm:mb-6">
            Together, Let's Build a Safer Digital World
          </h2>
          <p className="text-blue-200 text-sm sm:text-lg lg:text-xl italic mb-6 sm:mb-8">
            Every story, every article, every lesson makes us stronger
          </p>

          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
            The challenges we face in cybersecurity require collective action,
            shared knowledge, and commitment from all of us. When you share your
            experience, implement better security practices, or teach someone
            about digital safety, you're contributing to a more secure digital
            ecosystem for everyone.
          </p>

          <div className="flex flex-col items-center sm:flex-row justify-center gap-4 sm:gap-6">
            <Link href="/case-studies">
              <Button className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-6 !py-3 !rounded-lg !font-semibold !transition-all !duration-300 hover:!transform hover:!scale-105 !flex !items-center">
                <Eye className="w-5 h-5 mr-2" />
                Explore Case Studies
              </Button>
            </Link>
            <Link href="/articles">
              <Button className="!bg-transparent !border-2 !border-blue-400 !text-blue-400 hover:!bg-blue-400 hover:!text-white !px-6 !py-3 !rounded-lg !font-semibold !transition-all !duration-300 hover:!transform hover:!scale-105 !flex !items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Articles
              </Button>
            </Link>
            <Link href="/community-stories">
              <Button className="!bg-purple-600 !hover:bg-purple-700 !text-white !px-6 !py-3 !rounded-lg !font-semibold !transition-all !transform hover:scale-105 flex !items-center">
                <FileText className="w-5 h-5 mr-2" />
                Contribute Your Story
              </Button>
            </Link>
          </div>

          <div className="mt-8 sm:mt-12 pt-4 sm:pt-8 border-t border-blue-800">
            <p className="text-blue-200 italic text-sm sm:text-base">
              Cyber Awareness Hub - Empowering everyone to navigate the digital
              world safely and confidently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
