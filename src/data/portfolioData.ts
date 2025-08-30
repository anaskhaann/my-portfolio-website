import type {
  Experience,
  Project,
  SkillCategory,
  EducationItem,
} from "@/types";

/**
 * An array of work experience objects, each detailing a role, company, duration,
 * description of responsibilities, and technologies used.
 */
export const experiences: Experience[] = [
  {
    id: 1,
    title: "Front End Developer Intern",
    company: "Farsoft Infotech Pvt. Ltd.",
    duration: "Dec 2023 - March 2024",
    description:
      "Developed responsive websites using HTML, CSS, and JavaScript, boosting mobile engagement by 15%. Customized and launched 2+ sites while maintaining brand consistency and cross-browser compatibility. Collaborated with cross-functional teams to enhance performance and resolve technical issues.",
    technologies: ["HTML", "CSS", "Javascript", "Bootstrap"],
  },
  {
    id: 2,
    title: "Machine Learning & Data Science Intern",
    company: "PHN Technology Pvt. Ltd.",
    duration: "April 2023 - June 2023",
    description:
      "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
    technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
  },
];

/**
 * An array of project objects, each containing details about a project, including its title,
 * description, technologies, and links to the code repository and live demo.
 */
export const projects: Project[] = [
  {
    id: 1,
    title: "AI Chatbot for MySQL Databases",
    description:
      "Developed an Agentic AI Chatbot enabling natural language SQL queries using LangChain, Streamlit, and Meta's LLaMA, allowing non-technical users to interact with MySQL and SQLite databases. User can not only get they query but llm will connect to database and run those query in read only mode to get the result and return them in Natural Language. Improved performance with caching and fine-tuned model parameters, reducing response times by 15-20% and enhancing query accuracy.",
    technologies: ["Python", "Langchain", "Streamlit", "MySQL"],
    githubUrl: "https://github.com/anaskhaann/Chat-with-Database-SQL",
    videoUrl:
      "https://drive.google.com/file/d/1_zDUrBSChOOdiV0xt4BLuEMJCrTBH9nL/view?usp=sharing",
    imageUrl: "/assets/projects/nl_to_sql.gif",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "Built a fully responsive portfolio using React (TypeScript), Tailwind CSS, and Vite to showcase skills, projects, and experience. Integrated modern UI/UX features including dark/light mode, smooth scrolling (Lenis), and animations (GSAP, ScrollTrigger). Structured with reusable components and dynamic sections for scalability and maintainability.",
    technologies: [
      "HTML/CSS",
      "TypeScript",
      "React",
      "Vite",
      "GSAP",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/anaskhaann/my-portfolio-website",
    liveUrl: "https://anaskhaann.vercel.app/",
    imageUrl: "/assets/projects/portfolio.png",
  },
  {
    id: 3,
    title: "Gesture Based Presentation Controller",
    description:
      "Developed a Gesture-Based Presentation system using Python, OpenCV, and MediaPipe, enabling touch-free slide navigation and annotation for an intuitive presentation experience. Achieved 85% hand detection accuracy and 90% gesture recognition accuracy, with optimized slide transition under 0.5s, ensuring fast and reliable real-time control.",
    technologies: ["Python", "MediaPipe", "OpenCV", "Numpy"],
    githubUrl: "https://github.com/anaskhaann/Gesture-Based-Presentation",
    imageUrl: "/assets/projects/gesture_controller.gif",
  },
  {
    id: 4,
    title: "Web Automation With Selenium",
    description:
      "This project is based on my repo named 'Daily Life Journal'. It is designed to automate the task of printing and creating a book from web content. It automates webpage-to-PDF conversion with ease, perfect for batch downloading and archiving web content.",
    technologies: ["Python", "Selenium"],
    githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
    imageUrl: "/assets/projects/web_selenium.gif",
  },
];

/**
 * An array of skill categories, where each category contains a list of skills
 * with their names and corresponding icons.
 */
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "/assets/skills/python.svg" },
      { name: "JavaScript", icon: "/assets/skills/js.svg" },
      { name: "TypeScript", icon: "/assets/skills/TypeScript.svg" },
      { name: "HTML", icon: "/assets/skills/html.svg" },
      { name: "CSS", icon: "/assets/skills/css.svg" },
      { name: "Bash/Shell", icon: "/assets/skills/bash.svg" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "Git", icon: "/assets/skills/git.svg" },
      { name: "Flask", icon: "/assets/skills/flask.svg" },
      { name: "Numpy", icon: "/assets/skills/numpy.svg" },
      { name: "Pandas", icon: "/assets/skills/pandas.svg" },
      { name: "Matplotlib", icon: "/assets/skills/matplotlib.svg" },
      { name: "Sk Learn", icon: "/assets/skills/sklearn.svg" },
      { name: "TensorFlow", icon: "/assets/skills/TensorFlow.svg" },
      { name: "Pytorch", icon: "/assets/skills/PyTorch.svg" },
      { name: "Langchain", icon: "/assets/skills/langchain.svg" },
      { name: "FastApi", icon: "/assets/skills/FastAPI.svg" },
      { name: "NodeJs", icon: "/assets/skills/Nodejs.svg" },
      { name: "ReactJs", icon: "/assets/skills/React.svg" },
      { name: "GSAP", icon: "/assets/skills/gsap.svg" },
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
    category: "Extras",
    skills: [
      { name: "GitHub", icon: "/assets/skills/github.svg" },
      { name: "GitHub Actions", icon: "/assets/skills/GitHubActions.svg" },
      { name: "VS Code", icon: "/assets/skills/vscode.svg" },
      { name: "Anaconda", icon: "/assets/skills/anaconda.svg" },
      { name: "Notebook", icon: "/assets/skills/jupyter.svg" },
      { name: "UV", icon: "/assets/skills/uv.svg" },
      { name: "HuggingFace", icon: "/assets/skills/huggingface.svg" },
      { name: "Linux", icon: "/assets/skills/linux.svg" },
      { name: "Docker", icon: "/assets/skills/docker.svg" },
    ],
  },
];

/**
 * An array of education items, each representing a degree, institution, and duration of study.
 */
export const education: EducationItem[] = [
  {
    id: 1,
    degree: "B.E in Artificial Intelligence and Data Science",
    institution: "RCOE, Mumbai",
    duration: "2021 - 2025",
  },
  {
    id: 2,
    degree: "Higher Secondary (Science)",
    institution: "Maharashtra State Board",
    duration: "2020 - 2021",
  },
];
