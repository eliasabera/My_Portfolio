import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Elias Abera",
  role: "Software Developer",
  tagline: "A craft to return to.",
  headline: "Code by day, systems by night, built to last.",
  email: "eliasabera584@gmail.com",
  location: "Jimma, Ethiopia",
  resumeUrl: "/resume.pdf",
  portrait: "/images/me.JPG",
  about:
    "I'm a software developer skilled in fullstack web, mobile apps, and AI. I focus on clear interfaces and reliable systems.",
  concept:
    "I build digital products with the same care as architecture: quiet structure, warm detail, and experiences people return to.",
};

export const navLinks: NavLink[] = [
  { label: "Concept", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/eliasabera", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elias-abera-ba4b533b4",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:eliasabera584@gmail.com", icon: "email" },
];
