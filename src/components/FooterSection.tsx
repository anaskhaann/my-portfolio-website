import React from "react";
import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";

interface FooterSectionProps {
  isDarkMode: boolean;
}

const FooterSection: React.FC<FooterSectionProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`py-16 border-t transition-all duration-300 ${
        isDarkMode ? "border-border bg-card/50" : "border-slate-200 bg-white/50"
      } animate-section`}
      data-scroll-section
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-scroll
        data-scroll-speed="0.1"
      >
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-8">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mohd-anas-khan-0a4114205/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                }`}
              >
                <Linkedin className="w-6 h-6 text-white" />
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/anaskhaann"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    : "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                }`}
              >
                <Github className="w-6 h-6 text-white" />
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://telegram.me/khannanas"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                }`}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/khan._.anas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    : "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                }`}
              >
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          </div>

          {/* Copyright */}
          <p
            className={`text-lg transition-colors duration-300 ${
              isDarkMode ? "text-muted-foreground" : "text-slate-600"
            }`}
          >
            © 2025 Anas Khan. Crafted with ❤️ precision and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
