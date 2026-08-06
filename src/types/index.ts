export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "twitter";
};

export type ProjectKind = "web" | "mobile";

export type ProjectScreen = {
  title: string;
  description: string;
  image: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  /** Web = live site embed below; mobile = screen walkthrough */
  kind: ProjectKind;
  video?: string;
  image?: string;
  year: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  /** Mobile app screens shown while scrolling the detail */
  screens?: ProjectScreen[];
  /** Hotspot position on the map image (percent) */
  hotspot?: { x: number; y: number };
};

export type SkillIconId =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "nodejs"
  | "supabase"
  | "mongodb"
  | "flutter"
  | "reactnative"
  | "python"
  | "tensorflow";

export type Skill = {
  name: string;
  icon: SkillIconId;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};
