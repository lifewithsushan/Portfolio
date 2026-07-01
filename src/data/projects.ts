import type { Project } from "@/types";

const projectProblems = [
  "PM2.5 levels in Kathmandu are rising dangerously. Limited data exists on whether EV adoption is actually improving air quality.",
  "500+ student records were scattered across spreadsheets with no clear insight into what factors drive academic performance.",
  "Small financial institutions lack affordable, secure CLI tools for managing accounts, transactions, and audit trails.",
  "Local businesses in Nepal need a modern online selling platform with secure payments, product management, and order tracking.",
];

const projectChallenges = [
  "Handling incomplete sensor data with missing timestamps across multiple monitoring stations.",
  "Normalizing inconsistent grading systems and categorizing unstructured performance metrics.",
  "Implementing file-based persistence without a database while ensuring data integrity during concurrent operations.",
  "Integrating Cloudinary image upload with real-time cart state and JWT-based session management.",
];

const projectResults = [
  "Uncovered a 6.8% PM2.5 reduction in EV-adopted zones. Generated actionable visual reports for local policymakers.",
  "Identified attendance and study hours as the top performance predictors. Delivered a segmentation model for targeted interventions.",
  "Built a robust CLI with 5 account types, transaction logging, and audit reports. Zero data loss across 1,000+ test transactions.",
  "Deployed a full-stack platform with secure auth, product CRUD, image upload, cart management, and order fulfillment pipeline.",
];

export const projects: Project[] = [
  {
    title: "EV Impact on Air Quality — Kathmandu 2024",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
    description: projectProblems[0],
    features: [
      "Cleaned 10,000+ air quality records with missing timestamps",
      "Correlated EV registration data with PM2.5 readings",
      "Built multi-station visual comparison dashboards",
      "Delivered policy-oriented insight report",
    ],
    accent: "#00ffff",
    image: "/car.jpg",
    challenge: projectChallenges[0],
    result: projectResults[0],
  },
  {
    title: "Student Performance Data Analysis",
    tech: ["Python", "Pandas", "Excel", "Statistical Analysis"],
    description: projectProblems[1],
    features: [
      "Cleaned and normalized 500+ student records",
      "Correlation analysis of 12 performance indicators",
      "Segmented students into performance tiers",
      "Provided actionable recommendations for educators",
    ],
    accent: "#7dd3fc",
    image: "/student.jpg",
    challenge: projectChallenges[1],
    result: projectResults[1],
  },
  {
    title: "Banking Management System",
    tech: ["Python", "OOP", "File Handling"],
    description: projectProblems[2],
    features: [
      "5 account types with distinct transaction rules",
      "Persistent file-based storage with audit trails",
      "Transaction history and balance inquiry system",
      "Error handling for invalid operations",
    ],
    accent: "#915EFF",
    image: "/banking.jpg",
    challenge: projectChallenges[2],
    result: projectResults[2],
  },
  {
    title: "Full Stack Ecommerce Platform",
    tech: ["FastAPI", "React", "PostgreSQL", "JWT", "Cloudinary"],
    description: projectProblems[3],
    features: [
      "JWT-based authentication with role management",
      "Product catalog with image upload via Cloudinary",
      "Shopping cart and order processing pipeline",
      "RESTful API with PostgreSQL persistence",
    ],
    accent: "#00bfff",
    image: "/ecommerce.jpg",
    challenge: projectChallenges[3],
    result: projectResults[3],
  },
];
