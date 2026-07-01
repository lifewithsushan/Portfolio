import { FiBarChart2, FiCode, FiCpu, FiDatabase } from "react-icons/fi";
import type { ExpertiseCard, Journey } from "@/types";

export const expertiseCards: ExpertiseCard[] = [
  {
    title: "Full Stack Product Engineering",
    text: "Fast, scalable web apps with modern frontend architecture, clean APIs, secure auth, and data-driven interfaces.",
    icon: FiCode,
  },
  {
    title: "AI/ML Exploration",
    text: "Practical experimentation with machine learning workflows, intelligent automation, and problem-solving through data.",
    icon: FiCpu,
  },
  {
    title: "Analytics & Insight Design",
    text: "Translating messy datasets into clear decisions using EDA, dashboards, storytelling, and visual reasoning.",
    icon: FiBarChart2,
  },
  {
    title: "Backend & Data Systems",
    text: "Reliable APIs, database design, ETL-friendly thinking, and systems that support real-world digital products.",
    icon: FiDatabase,
  },
];

export const journey: Journey[] = [
  {
    year: "2022",
    title: "Sales + Technical Communication",
    text: "Developed client communication, product consulting, and reporting skills at The IT Company.",
  },
  {
    year: "2023",
    title: "Mentorship + Teaching",
    text: "Began teaching Python and improving digital literacy while managing learning environments.",
  },
  {
    year: "2024",
    title: "Data Analysis + Research",
    text: "Expanded into analytics, statistical thinking, data cleaning, and visual storytelling through projects.",
  },
  {
    year: "Today",
    title: "AI-Powered Full Stack Focus",
    text: "Combining React, FastAPI, data systems, and AI curiosity to build intelligent digital experiences.",
  },
];
