import type { Experience, Project, SkillCategory } from "@/types";

export const experiences: Experience[] = [
  {
    id: 1,
    title: " Front End Developer Intern",
    company: " Farsoft Infotech Pvt. Ltd.",
    duration: "Dec 2023 - March 2024",
    description:
      "Developed responsive websites using HTML, CSS, and JavaScript, boosting mobile engagement by 15%. Customized and launched 5+ sites while maintaining brand consistency and cross-browser compatibility. Collaborated with cross-functional teams to enhance performance and resolve technical issues.",
    technologies: ["HTML", "CSS", "Javascript", "Bootstrap"],
  },
  {
    id: 2,
    title: " Machine Learning & Data Science Intern",
    company: " PHNTechnology Pvt. Ltd.",
    duration: "April 2023 - June 2023",
    description:
      "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
    technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Natural Language to SQL AI",
    description:
      "Developed an AI tool enabling natural language SQL queries using LangChain, Streamlit, and Meta's LLaMA, allowing non-technical users to interact with MySQL and SQLite databases. Improved performance with caching and fine-tuned model parameters, reducing response times by 15-20% and enhancing query accuracy.",
    technologies: ["Python", "Langchain", "Streamlit", "LLama", "MySQL"],
    githubUrl: "https://github.com/anaskhaann/Chat-with-Database-SQL",
    videoUrl:
      "https://drive.google.com/file/d/1_zDUrBSChOOdiV0xt4BLuEMJCrTBH9nL/view?usp=sharing",
    imageUrl: "/assets/projects/nl_to_sql.png",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "Built a fully responsive portfolio using React (TypeScript), Tailwind CSS, and Vite to showcase skills, projects, and experience.Integrated modern UI/UX features including dark/light mode, smooth scrolling (Lenis), and animations (GSAP, ScrollTrigger).Structured with reusable components and dynamic sections (Projects, Experience, Skills) for scalability and maintainability.",
    technologies: ["HTML/CSS", "TypeScript", "React", "Vite", "GSAP"],
    githubUrl: "https://github.com/anaskhaann/my-portfolio-website",
    // liveUrl:"",
    imageUrl: "/assets/projects/portfolio.gif",
  },
  {
    id: 3,
    title: "Gesture Based Presentation Controller",
    description:
      "Developed a Gesture-Based Presentation system using Python, OpenCV, and MediaPipe,enabling touch-free slide navigation and annotation for intuitive presentation experience.Achieved 85% hand detection accuracy and 90% gesture recognition accuracy, with optimized slide transition under 0.5s, ensuring fast and reliable real-time control",
    technologies: ["Python", "MediaPipe", "OpenCV", "Numpy"],
    githubUrl: "https://github.com/anaskhaann/Gesture-Based-Presentation",
    imageUrl: "/assets/projects/gesture_controller.gif",
  },
  {
    id: 4,
    title: "Web Automation With Selenium",
    description:
      "This Project Is Based On My Repo Named Daily Life Journal. This is Made to Automate its Printing Task and Create a Book.Automate webpage-to-PDF conversion with ease! Perfect for batch downloading and archiving web content.",
    technologies: ["Python", "Selenium"],
    githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
    imageUrl: "/assets/projects/web_selenium.gif",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "/assets/skills/python.svg" },
      { name: "JavaScript", icon: "/assets/skills/js.svg" },
      { name: "HTML", icon: "/assets/skills/html.svg" },
      { name: "CSS", icon: "/assets/skills/css.svg" },
      { name: "Bash/Shell", icon: "/assets/skills/bash.svg" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Git", icon: "/assets/skills/git.svg" },
      { name: "Flask", icon: "/assets/skills/flask.svg" },
      { name: "Jupyter", icon: "/assets/skills/jupyter.svg" },
      { name: "Numpy", icon: "/assets/skills/numpy.svg" },
      { name: "Pandas", icon: "/assets/skills/pandas.svg" },
      { name: "Matplotlib", icon: "/assets/skills/matplotlib.svg" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", icon: "/assets/skills/mysql.svg" },
      { name: "SQlite", icon: "/assets/skills/sqlite.svg" },
      { name: "MongoDB", icon: "/assets/skills/mongodb.svg" },
    ],
  },
  {
    category: "Others",
    skills: [
      { name: "Vs Code", icon: "/assets/skills/vscode.svg" },
      { name: "Linux", icon: "/assets/skills/linux.svg" },
      { name: "GitHub", icon: "/assets/skills/github.svg" },
      { name: "Docker", icon: "/assets/skills/docker.svg" },
      { name: "UV", icon: "/assets/skills/uv.svg" },
      { name: "Anaconda", icon: "/assets/skills/anaconda.svg" },
    ],
  },
];
