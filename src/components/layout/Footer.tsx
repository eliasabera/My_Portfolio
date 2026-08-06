import Link from "next/link";
import { siteConfig, socialLinks } from "@/data/site";

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
        <div className="flex flex-wrap gap-5">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="corner-label hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
