// Portfolio Data Types
// Extracted from pages/index.tsx for modularity and reusability

/**
 * Defines the structure for a work experience entry.
 */
export interface Experience {
  /** A unique identifier for the experience. */
  id: number;
  /** The job title. */
  title: string;
  /** The name of the company. */
  company: string;
  /** The duration of the employment. */
  duration: string;
  /** A description of the role and responsibilities. */
  description: string;
  /** A list of technologies used. */
  technologies: string[];
}

/**
 * Defines the structure for a project entry.
 */
export interface Project {
  /** A unique identifier for the project. */
  id: number;
  /** The title of the project. */
  title: string;
  /** A description of the project. */
  description: string;
  /** A list of technologies used in the project. */
  technologies: string[];
  /** The URL to the project's GitHub repository. */
  githubUrl: string;
  /** The URL to the live demo of the project (optional). */
  liveUrl?: string;
  /** The URL to a video demonstration of the project (optional). */
  videoUrl?: string;
  /** The URL for the project's cover image. */
  imageUrl: string;
}

/**
 * Defines the structure for a single skill.
 */
export interface Skill {
  /** The name of the skill. */
  name: string;
  /** The path to the skill's icon. */
  icon: string;
}

/**
 * Defines the structure for a category of skills.
 */
export interface SkillCategory {
  /** The name of the skill category (e.g., "Languages", "Frameworks"). */
  category: string;
  /** An array of skills belonging to this category. */
  skills: Skill[];
}

/**
 * Defines the structure for an education entry.
 */
export interface EducationItem {
  /** A unique identifier for the education entry. */
  id: number;
  /** The name of the degree or certification. */
  degree: string;
  /** The name of the institution. */
  institution: string;
  /** The duration of the study. */
  duration: string;
}
