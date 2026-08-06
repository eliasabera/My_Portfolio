"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/effects/ThemeToggle";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1600px] items-center justify-between gap-6 px-5 md:h-[4.75rem] md:px-8">
        <Link
          href="#hero"
          className="group flex min-w-0 items-baseline gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="display text-[1.35rem] leading-none tracking-tight text-[var(--ink)] md:text-[1.6rem]">
            {siteConfig.name}
          </span>
          <span className="hidden text-[9px] uppercase tracking-[0.32em] text-[var(--ink-muted)] sm:inline">
            {siteConfig.role}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
            >
              <span className="mr-2 text-[9px] text-[var(--accent)] opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href={`mailto:${siteConfig.email}`}
            className="hidden text-[11px] uppercase tracking-[0.28em] text-[var(--ink)] transition-colors duration-300 hover:text-[var(--accent)] md:inline"
          >
            Write me
          </Link>
          <button
            type="button"
            className="relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span className="flex w-5 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-px w-full bg-[var(--ink)] transition-transform duration-500",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-[var(--ink)] transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-[var(--ink)] transition-transform duration-500",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[4.25rem] z-40 bg-[var(--bg)] transition-[opacity,visibility] duration-500 md:top-[4.75rem] lg:hidden",
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-8 md:px-8">
          <nav className="flex flex-1 flex-col justify-center gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-[var(--line)] py-5"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-4xl tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] md:text-5xl">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
            <ThemeToggle className="sm:hidden" />
            <Link
              href={`mailto:${siteConfig.email}`}
              onClick={() => setOpen(false)}
              className="text-[11px] uppercase tracking-[0.28em] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
            >
              {siteConfig.email}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
