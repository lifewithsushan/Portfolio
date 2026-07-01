import { FiBarChart2, FiCode, FiCpu, FiDatabase } from "react-icons/fi";
import type { ExpertiseCard, Journey } from "@/types";

export const expertiseCards: ExpertiseCard[] = [
  {
    title: "Full Stack Product Engineering",
    text: "Fast, scalable web apps with modern frontend architecture, clean APIs, secure auth, and data-driven interfaces. Built with React, FastAPI, and TypeScript.",
    icon: FiCode,
  },
  {
    title: "AI/ML Exploration",
    text: "Practical experimentation with machine learning workflows, intelligent automation, and problem-solving through data. Focused on real-world applications.",
    icon: FiCpu,
  },
  {
    title: "Analytics & Insight Design",
    text: "Translating messy datasets into clear decisions using EDA, dashboards, storytelling, and visual reasoning. Tools like Pandas, NumPy, and Matplotlib.",
    icon: FiBarChart2,
  },
  {
    title: "Backend & Data Systems",
    text: "Reliable APIs, database design, ETL-friendly thinking, and systems that support real-world digital products. PostgreSQL, JWT auth, and file management.",
    icon: FiDatabase,
  },
];

export const journey: Journey[] = [
  {
    year: "2022",
    title: "Sales & Technical Communication",
    text: "Developed client communication, product consulting, and reporting skills at The IT Company — building a foundation for understanding real business needs.",
  },
  {
    year: "2023",
    title: "Mentorship & Python Teaching",
    text: "Began teaching Python and improving digital literacy while managing learning environments for 30+ students. This sharpened my ability to explain complex concepts clearly.",
  },
  {
    year: "2024",
    title: "Data Analysis & Research Projects",
    text: "Expanded into analytics with Pandas, statistical thinking, and data cleaning. Built projects analyzing EV impact on air quality and student performance patterns.",
  },
  {
    year: "Today",
    title: "AI-Powered Full Stack Development",
    text: "Combining React, FastAPI, PostgreSQL, Docker, and AI to build intelligent digital experiences — from ecommerce platforms to logistics management systems.",
  },
];
