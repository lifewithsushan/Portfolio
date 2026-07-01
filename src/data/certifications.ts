import { FiAward, FiBarChart2, FiCpu, FiDatabase, FiZap } from "react-icons/fi";
import type { Achievement, Certification } from "@/types";

export const certifications: Certification[] = [
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    icon: FiCpu,
  },
  {
    title: "Data Analysis with Python",
    issuer: "Coursera",
    icon: FiBarChart2,
  },
  {
    title: "RHCSA Track",
    issuer: "Red Hat System Admin",
    icon: FiDatabase,
  },
];

export const achievements: Achievement[] = [
  {
    title: "100% Merit Scholarship",
    text: "Recognition for academic excellence, consistency, and high-performance learning outcomes.",
    icon: FiAward,
  },
  {
    title: "Best Mentor Award",
    text: "Acknowledged for guidance, support, and helping learners build confidence in technology.",
    icon: FiZap,
  },
  {
    title: "Chess Gold Medalist",
    text: "Strategic thinking, discipline, and calm decision-making reflected in both games and engineering work.",
    icon: FiAward,
  },
];
