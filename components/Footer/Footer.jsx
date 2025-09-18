import React from "react";
import {
  Shield,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Mail,
  Phone,
} from "lucide-react";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#06080e] border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4" data-aos="fade-right">
              <Shield className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-white text-lg font-bold">
                Cyber Awareness Hub
              </h3>
            </div>
            <p
              className="text-gray-300 mb-6 leading-relaxed"
              data-aos="fade-right"
            >
              Making cybersecurity knowledge accessible, engaging, and practical
              for everyone.
            </p>
            <div className="space-y-2" data-aos="fade-right">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 text-blue-400 mr-2" />
                <span>vakshat421@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 text-blue-400 mr-2" />
                <span>+91 7668137019</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" data-aos="fade-down">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li data-aos="fade-up">
                <a
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li data-aos="fade-up">
                <a
                  href="/case-studies"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li data-aos="fade-up">
                <a
                  href="/articles"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Articles
                </a>
              </li>
              <li data-aos="fade-up">
                <a
                  href="/community-stories"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Community
                </a>
              </li>
              <li data-aos="fade-up">
                <a
                  href="/about-us"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" data-aos="fade-left">
              Connect
            </h4>
            <div className="flex space-x-4 mb-6" data-aos="fade-left">
              <a
                href="https://www.linkedin.com/in/akshat-verma-b559a625a/"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/akshatverma1234"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
            <ul className="space-y-2">
              <li data-aos="fade-left">
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-aos="fade-left">
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm" data-aos="fade-down-right">
              © 2024 Cyber Awareness Hub. All rights reserved.
            </p>
            <p
              className="text-gray-400 text-sm mt-2 md:mt-0"
              data-aos="fade-down-left"
            >
              Built with security in mind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
