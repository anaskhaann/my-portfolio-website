import type { SkillCategory } from "@/types";

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
