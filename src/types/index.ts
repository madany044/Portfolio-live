import type { IconType } from "react-icons";

export type SkillCategory = "Languages" | "Frameworks" | "Cloud" | "Tooling";

export interface Skill {
  name: string;
  icon: IconType;
  level: number;
  category: SkillCategory;
  trending?: boolean;
}

export type ProjectCategory =
  | "AI & ML"
  | "Web"
  | "Experiments"
  | "Tooling";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  spotlight?: string;
}

export interface Insight {
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  url: string;
  tags: string[];
}

export interface Stat {
  label: string;
  value: string;
}

