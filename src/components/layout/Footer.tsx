import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { siteConfig, socialLinks } from "@/data/site";
import type { SocialLink } from "@/types";

const socialIcons: Record<SocialLink["icon"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
  twitter: FaGithub,
};

const socialColors: Record<SocialLink["icon"], string> = {
  github: "var(--ink)",
  linkedin: "#0a66c2",
  email: "var(--accent)",
  twitter: "var(--ink)",
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display text-xl text-[var(--ink)]">{siteConfig.name}.</p>
          <p className="mt-2 text-xs text-[var(--ink-muted)]">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon];
            const color = socialColors[link.icon];
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center border border-[var(--line)] transition-opacity hover:opacity-80"
                style={{ color }}
              >
                <Icon size={18} aria-hidden />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
