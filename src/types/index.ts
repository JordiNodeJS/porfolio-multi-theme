export interface Presentation {
  name: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[]; // Made optional as it's not in all project.json entries
  imgCover?: string; // Changed from imageUrl to imgCover, made optional
  link?: string; // Changed from projectUrl to link, made optional
  demo?: string; // Added demo link, made optional
  repositoryUrl?: string;
  type?: "main" | "secondary" | "practice" | "personal"; // Made optional
  status?:
    | "completed"
    | "in-progress"
    | "archived"
    | "in production"
    | "done"
    | "retired"; // Added more statuses and made optional
  detailedDescription?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  gifUrl?: string;
  videoUrl?: string;
  tags?: string[];
  date?: string; // e.g., "2023-01-15" or "Fall 2022"
  client?: string; // If applicable
  teamSize?: number; // If applicable
  role?: string; // If applicable
  coverImage?: string; // This seems to be a duplicate of imgCover, kept for now
  images?: string[];
  category?: string;
  duration?: string;
  longDescription?: string;
  keyFeatures?: Array<{ title: string; description: string; icon?: string }>;
  techStack?: Array<{ name: string; icon?: string; category: string }>;
  testimonials?: Array<{ quote: string; author: string; relation: string }>;
}

export interface ExperienceType {
  // Renamed from Experience
  company: string;
  experience: string;
  links?: string[];
  // Add other relevant fields if necessary
}

export interface Education {
  id: string;
  center: string;
  link?: string; // Made optional since not all education items have a link
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  tags: string[];
}

export interface ContactInfo {
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Achievement {
  title: string;
  description: string;
  impact: string;
  icon: string;
}

export interface Skill {
  // Added export
  id: string;
  name: string;
  level: number; // Assuming level is a number (e.g., 1-5 or 1-100)
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "tools"
    | "testing"
    | "other";
  icon?: string; // Optional: path to an icon or a component name
  description?: string; // Optional: a brief description of the skill or experience with it
  keywords?: string[]; // Optional: related keywords or technologies
}

// Placeholder for DatabaseData if it's a complex type, adjust as needed
export interface DatabaseData {
  presentation?: Presentation;
  projects?: Project[];
  skills?: Skill[];
  // Add other data types if they are part of DatabaseData
}
