import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiMysql,
} from "react-icons/si";
import { TbWorldWww, TbBrain } from "react-icons/tb";

import type { Skill } from "@/types";

export const skills: Skill[] = [
  { name: "HTML5", icon: SiHtml5, level: 92, category: "Languages" },
  { name: "CSS3", icon: SiCss3, level: 90, category: "Languages" },
  { name: "JavaScript", icon: SiJavascript, level: 86, category: "Languages" },
  { name: "Python", icon: SiPython, level: 85, category: "Languages" },
  { name: "React", icon: SiReact, level: 80, category: "Frameworks" },
  { name: "Node.js", icon: SiNodedotjs, level: 77, category: "Frameworks" },
  { name: "Git", icon: SiGit, level: 85, category: "Tooling" },
  { name: "SQL", icon: SiMysql, level: 85, category: "Tooling" },
  { name: "Web Development", icon: TbWorldWww, level: 90, category: "Tooling" },
  { name: "Data Science", icon: TbBrain, level: 75, category: "Tooling" },
];

