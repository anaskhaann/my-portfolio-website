import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";

interface FooterSectionProps {
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
}

/**
 * The footer section of the website.
 * It contains social media links and a copyright notice.
 *
 * @param {FooterSectionProps} props - The props for the component.
 */
const FooterSection: React.FC<FooterSectionProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`animate-section border-t py-8 transition-all duration-100 ${
        isDarkMode
          ? "border-border bg-card/50 text-foreground"
          : "border-border bg-card/50 text-foreground"
      }`}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 flex justify-center space-x-4">
            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/kanas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary shadow-lg transition-all duration-300 group-hover:shadow-xl hover:bg-muted`}
              >
                <Linkedin className="h-4 w-4 text-foreground" />
              </div>
            </a>

            {/* GitHub Profile */}
            <a
              href="https://github.com/anaskhaann"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary shadow-lg transition-all duration-300 group-hover:shadow-xl hover:bg-muted`}
              >
                <Github className="h-4 w-4 text-foreground" />
              </div>
            </a>

            {/* Email Contact */}
            <a
              href="mailto:anaskhaann.work@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary shadow-lg transition-all duration-300 group-hover:shadow-xl hover:bg-muted`}
              >
                <Mail className="h-4 w-4 text-foreground" />
              </div>
            </a>
          </div>

          {/* Copyright Notice */}
          <p
            className={`text-base ${
              isDarkMode ? "text-white" : "text-muted-foreground"
            } transition-colors duration-300`}
          >
            © 2025 Anas. Crafted with ❤️. Last Updated Sept,2025.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
