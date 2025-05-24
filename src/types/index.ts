export interface Presentation {
  name: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  imgCover: string;
  description: string;
  link?: string;
  demo?: string;
  tags: string[];
}

export interface DatabaseData {
  presentation: Presentation;
  projects: Project[];
}

export interface Skill {
  nombre: string;
  nivel: string;
}

export interface Experience {
  company: string;
  experience: string;
  links?: string[];
}

export interface Education {
  id: string;
  center: string;
  link: string;
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
