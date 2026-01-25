export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  category: string; // The "Class" name (e.g., Business Analyst)
  title: string;    // The "Fantasy" title (e.g., The Architect)
  description: string; // Explanation of the role
  skills: string[];
}