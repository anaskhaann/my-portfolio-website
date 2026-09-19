export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  /** End date label, or null for the current role. */
  end: string | null;
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
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface Social {
  name: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  url: string;
  description: string;
  email: string;
  resumeUrl: string;
  navigation: NavItem[];
  socials: Social[];
}

export interface Profile {
  bio: string[];
  availability: string;
  currentRole: string;
}
