"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { siteConfig, socialLinks } from "@/data/site";
import { gsap, registerGsap } from "@/lib/gsap";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      gsap.from(root.querySelectorAll("[data-contact]"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative overflow-hidden px-5 py-28 md:px-8 md:py-40"
    >
      <p className="corner-label absolute right-5 top-10 md:right-8">
        A place to begin
      </p>

      <div className="mx-auto max-w-[1600px]">
        <p data-contact className="corner-label">
          Contact
        </p>
        <h2
          data-contact
          className="display mt-6 max-w-4xl text-4xl leading-[1.05] tracking-tight text-[var(--ink)] md:text-7xl"
        >
          A short conversation is enough to start.
        </h2>

        <div
          data-contact
          className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <Link
            href={`mailto:${siteConfig.email}`}
            className="display text-2xl text-[var(--ink)] transition-colors hover:text-[var(--accent)] md:text-4xl"
          >
            {siteConfig.email}
          </Link>

          <Link
            href={`mailto:${siteConfig.email}`}
            className="inline-flex w-fit items-center justify-center rounded-full border border-[var(--accent)] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            Get in touch
          </Link>
        </div>

        <div data-contact className="mt-16 flex flex-wrap gap-6 border-t border-[var(--line)] pt-8">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="corner-label transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
