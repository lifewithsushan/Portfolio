import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "EV Impact on Air Quality — Kathmandu 2024",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
    description:
      "Collected and analyzed air pollution datasets across Kathmandu to uncover correlations between EV adoption zones and PM2.5 reduction through visual analytics.",
    features: [
      "Data cleaning pipeline",
      "Exploratory analysis",
      "Visualization dashboard",
      "Insight generation",
    ],
    accent: "#00ffff",
    image: "/car.jpg",
  },
  {
    title: "Student Performance Data Analysis",
    tech: ["Python", "Pandas", "Excel", "Statistical Analysis"],
    description:
      "Analyzed 500+ student records to identify performance indicators, improve educational understanding, and support better decision-making with preprocessing and correlation analysis.",
    features: [
      "Data preprocessing",
      "Correlation analysis",
      "Performance segmentation",
      "Actionable reporting",
    ],
    accent: "#7dd3fc",
    image: "/student.jpg",
  },
  {
    title: "Banking Management System",
    tech: ["Python", "OOP", "File Handling"],
    description:
      "Built a full-featured banking CLI application using Python OOP principles with persistent transaction management, modular account actions, and audit-friendly logging.",
    features: [
      "Persistent transactions",
      "OOP-based account flows",
      "Audit logging",
      "CLI usability",
    ],
    accent: "#915EFF",
    image: "/banking.jpg",
  },
  {
    title: "Full Stack Ecommerce Platform",
    tech: ["FastAPI", "React", "PostgreSQL", "JWT", "Cloudinary"],
    description:
      "A modern ecommerce platform with secure authentication, product management, image upload workflows, cart operations, and streamlined order handling.",
    features: [
      "Secure JWT auth",
      "Product management",
      "Image upload system",
      "Cart & order management",
    ],
    accent: "#00bfff",
    image: "/ecommerce.jpg",
  },
];
