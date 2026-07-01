import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { InfoCard, SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FiLinkedin },
  { label: "Portfolio", href: "#projects", icon: FiGlobe },
];

export const contactCards: InfoCard[] = [
  {
    label: "Email",
    value: "Reach out through the contact form",
    href: "#contact-form",
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "Available upon request",
    href: "#contact-form",
    icon: FiPhone,
  },
  {
    label: "LinkedIn",
    value: "Professional network profile",
    href: "https://www.linkedin.com/",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "Code portfolio and experiments",
    href: "https://github.com/",
    icon: FiGithub,
  },
  {
    label: "Portfolio",
    value: "Immersive interactive web presence",
    href: "#home",
    icon: FiGlobe,
  },
  {
    label: "Location",
    value: "Satdobato, Lalitpur, Nepal",
    icon: FiMapPin,
  },
];
