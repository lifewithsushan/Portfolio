import type { IconType } from "react-icons";

export type ThemeMode = "dark" | "light";

export type Message = {
  from: "bot" | "user";
  text: string;
};

export type Project = {
  title: string;
  tech: string[];
  description: string;
  features: string[];
  accent: string;
  image: string;
  challenge: string;
  result: string;
};

export type InfoCard = {
  label: string;
  value: string;
  href?: string;
  icon: IconType;
};

export type Skill = {
  name: string;
  level: number;
  category: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type ExpertiseCard = {
  title: string;
  text: string;
  icon: IconType;
};

export type Journey = {
  year: string;
  title: string;
  text: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  icon: IconType;
};

export type Achievement = {
  title: string;
  text: string;
  icon: IconType;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type FormStatus = "idle" | "sent";

export type Particle = {
  id: number;
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
};

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  avatar?: string;
};

export type BlogPost = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  url?: string;
};

export type Service = {
  title: string;
  description: string;
  features: string[];
  icon: IconType;
};

export type GitHubRepo = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
};
