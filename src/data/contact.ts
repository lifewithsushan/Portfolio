import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SiWhatsapp, SiViber } from "react-icons/si";
import type { InfoCard, SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/lifewithsushan", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sushan-kc-93948a2b8", icon: FiLinkedin },
  { label: "Portfolio", href: "#projects", icon: FiGlobe },
];

export const contactCards: InfoCard[] = [
  {
    label: "Email",
    value: "sushankc89@gmail.com",
    href: "mailto:sushankc89@gmail.com",
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "+977 9769364562",
    href: "tel:+9779769364562",
    icon: FiPhone,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/9779769364562",
    icon: SiWhatsapp,
  },
  {
    label: "Viber",
    value: "Message on Viber",
    href: "viber://chat?number=%2B9779769364562",
    icon: SiViber,
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/sushan-kc-93948a2b8",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "View code on GitHub",
    href: "https://github.com/lifewithsushan",
    icon: FiGithub,
  },
  {
    label: "Location",
    value: "Satdobato, Lalitpur, Nepal",
    icon: FiMapPin,
  },
];
