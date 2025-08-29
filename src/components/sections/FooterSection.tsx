import React from "react";
import { Linkedin, Github, Instagram, Send, Mail } from "lucide-react";

interface FooterSectionProps {
  isDarkMode: boolean;
}

const FooterSection: React.FC<FooterSectionProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`py-8 border-t transition-all duration-100 ${
        isDarkMode
          ? "border-border bg-card/50 text-foreground"
          : "border-border bg-card/50 text-foreground"
      } animate-section`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kanas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl bg-secondary hover:bg-muted border border-border`}
              >
                <Linkedin className="w-6 h-6 text-foreground" />
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
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl bg-secondary hover:bg-muted border border-border`}
              >
                <Github className="w-6 h-6 text-foreground" />
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/anaskhaann"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl bg-secondary hover:bg-muted border border-border`}
              >
                <Send className="w-6 h-6 text-foreground" />
              </div>
            </a>

            {/* Mail */}
            <a
              href="mailto:anaskhaann.work@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl bg-secondary hover:bg-muted border border-border`}
              >
                <Mail className="w-6 h-6 text-foreground" />
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
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl bg-secondary hover:bg-muted border border-border`}
              >
                <Instagram className="w-6 h-6 text-foreground" />
              </div>
            </a>
          </div>

          {/* Copyright */}
          <p
            className={`text-lg transition-colors duration-300 text-muted-foreground`}
          >
            © 2025 Anas. Crafted with ❤️, precision and passion by Me
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
