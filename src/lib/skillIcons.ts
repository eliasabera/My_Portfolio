import type { IconType } from "react-icons";
import {
  SiFlutter,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import type { SkillIconId } from "@/types";

export const skillIcons: Record<SkillIconId, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  supabase: SiSupabase,
  mongodb: SiMongodb,
  flutter: SiFlutter,
  reactnative: SiReact,
  python: SiPython,
  tensorflow: SiTensorflow,
};

/** Official-ish brand colors for each tech icon */
export const skillColors: Record<SkillIconId, string> = {
  react: "#61DAFB",
  nextjs: "var(--icon-next)",
  typescript: "#3178C6",
  tailwind: "#06B6D4",
  nodejs: "#339933",
  supabase: "#3ECF8E",
  mongodb: "#47A248",
  flutter: "#54C5F8",
  reactnative: "#61DAFB",
  python: "#FFD43B",
  tensorflow: "#FF6F00",
};
