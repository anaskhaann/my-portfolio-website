// Portfolio Data Types
// Extracted from pages/index.tsx for modularity and reusability

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}
