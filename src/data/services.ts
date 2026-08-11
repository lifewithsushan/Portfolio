import { FiCode, FiDatabase, FiMonitor, FiTrendingUp } from "react-icons/fi";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern, responsive web applications built with React, FastAPI, and Tailwind CSS.",
    features: [
      "Single-page or multi-page apps",
      "RESTful API integration",
      "Responsive & mobile-first design",
      "Performance optimization",
    ],
    icon: FiCode,
  },
  {
    title: "AI/ML Solutions",
    description: "Practical machine learning models and data analysis for real-world problems.",
    features: [
      "Data cleaning & preprocessing",
      "Predictive modeling",
      "Data visualization dashboards",
      "Custom ML pipeline development",
    ],
    icon: FiTrendingUp,
  },
  {
    title: "Backend Systems",
    description: "Scalable backend architecture with PostgreSQL, authentication, and secure APIs.",
    features: [
      "Database design & optimization",
      "JWT authentication & authorization",
      "API development (FastAPI/Node)",
      "Cloud deployment assistance",
    ],
    icon: FiDatabase,
  },
  {
    title: "Tech Mentorship",
    description: "One-on-one guidance in Python, web development, and programming fundamentals.",
    features: [
      "Personalized learning roadmap",
      "Code reviews & feedback",
      "Project-based learning",
      "Career guidance in tech",
    ],
    icon: FiMonitor,
  },
];
