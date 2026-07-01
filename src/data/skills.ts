import type { Skill } from "@/types";
import {
  SiPython,
  SiFastapi,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiGit,
  SiLinux,
  SiDocker,
  SiScikitlearn,
  SiJsonwebtokens,
} from "react-icons/si";
import { FiBarChart2, FiGrid } from "react-icons/fi";

export const skills: (Skill & { color: string; icon: React.ComponentType<{ size?: number; color?: string }> })[] = [
  { name: "Python", level: 95, category: "Core Language", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", level: 90, category: "Backend APIs", icon: SiFastapi, color: "#009688" },
  { name: "React", level: 92, category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", level: 91, category: "Frontend", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", level: 94, category: "Design Systems", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", level: 84, category: "Database", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", level: 82, category: "Database", icon: SiMysql, color: "#4479A1" },
  { name: "Pandas", level: 93, category: "Analytics", icon: SiPandas, color: "#E70488" },
  { name: "NumPy", level: 88, category: "Analytics", icon: SiNumpy, color: "#013243" },
  { name: "Data Visualization", level: 90, category: "Storytelling", icon: FiBarChart2, color: "#d4a853" },
  { name: "REST API", level: 92, category: "Architecture", icon: FiGrid, color: "#d4a853" },
  { name: "JWT Authentication", level: 87, category: "Security", icon: SiJsonwebtokens, color: "#d4a853" },
  { name: "Matplotlib", level: 86, category: "Visualization", icon: FiBarChart2, color: "#11557C" },
  { name: "Git", level: 89, category: "Tooling", icon: SiGit, color: "#F05032" },
  { name: "Linux", level: 80, category: "Systems", icon: SiLinux, color: "#FCC624" },
  { name: "Docker", level: 76, category: "Deployment", icon: SiDocker, color: "#2496ED" },
  { name: "Machine Learning", level: 78, category: "AI/ML", icon: SiScikitlearn, color: "#F7931E" },
];

export const orbitTech = [
  "React",
  "FastAPI",
  "Python",
  "Pandas",
  "Docker",
  "PostgreSQL",
  "Tailwind",
  "ML",
];
