import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Chatbot for MySQL Databases",
    description:
      "Developed an Agentic AI Chatbot enabling natural language SQL queries using LangChain, Streamlit, and Meta's LLaMA, allowing non-technical users to interact with MySQL and SQLite databases. User can not only get they query but llm will connect to database and run those query in read only mode to get the result and return them in Natural Language. Improved performance with caching and fine-tuned model parameters, reducing response times by 15-20% and enhancing query accuracy.",
    technologies: ["Python", "Langchain", "Streamlit", "MySQL"],
    githubUrl: "https://github.com/anaskhaann/Chat-with-Database-SQL",
  },
  {
    id: 2,
    title: "Chat Tube",
    description:
      "Created a RAG pipeline for Youtube Videos. The user can ask relevant question related to the video. The user query will match the context and retrieve the relevant context for result. The transcript of the videos are embedded using QWEN 8b Model and a simple similarity retrievel applied to fetch top similar results as context. The entire flow of the conversation consist of A Parallel Chain and Sequencial Chain Combining Together to retrieve context and return response for the user query.",
    technologies: ["Python", "Langchain", "HuggingFace", "Groq"],
    githubUrl: "https://github.com/anaskhaann/chat_tube",
  },
  {
    id: 3,
    title: "Personal Portfolio",
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
  },
  {
    id: 4,
    title: "Mini Splunk",
    description:
      "Developed an intelligent log classification tool in Python using regex, BERT embeddings (Sentence Transformers),and LLMs (Groq API), automating the labeling of 10,000+ log entries with an accuracy improvement of 25%, which enhanced service monitoring and reduced downtime incidents by 15%. Built and refined a machine learning pipeline for log data processing — including ingestion, embedding generation, model evaluation, and threshold tuning — achieving 90%+ precision in supervised classification (logistic regression) and uncovering hidden patterns through unsupervised clustering (DBSCAN), leading to faster issue diagnosis.",
    technologies: [
      "Python",
      "Pandas",
      "Sklearn",
      "Groq",
      "Bert",
      "Llama",
      "Regex",
    ],
    githubUrl: "https://github.com/anaskhaann/mini-splunk.git",
  },
  {
    id: 5,
    title: "Gesture Based Presentation Controller",
    description:
      "Developed a Gesture-Based Presentation system using Python, OpenCV, and MediaPipe, enabling touch-free slide navigation and annotation for an intuitive presentation experience. Achieved 85% hand detection accuracy and 90% gesture recognition accuracy, with optimized slide transition under 0.5s, ensuring fast and reliable real-time control.",
    technologies: ["Python", "MediaPipe", "OpenCV", "Numpy"],
    githubUrl: "https://github.com/anaskhaann/Gesture-Based-Presentation",
  },
  {
    id: 6,
    title: "Web Automation With Selenium",
    description:
      "This project is based on my repo named 'Daily Life Journal'. It is designed to automate the task of printing and creating a book from web content. It automates webpage-to-PDF conversion with ease, perfect for batch downloading and archiving web content.",
    technologies: ["Python", "Selenium"],
    githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
  },
  {
    id: 7,
    title: "Full Stack Web App",
    description:
      "Built a social media app using Express.js and MongoDB with core features like boards, pins, and personalized feeds. Implemented secure authentication with Passport.js and dynamic UI using EJS templating. ",
    technologies: ["Express", "Nodejs", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/anaskhaann/Pinterest-Clone",
  },
];
