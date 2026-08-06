"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

const chapters = [
  { id: "hero", label: "Start" },
  { id: "portal", label: "Enter" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "rooms", label: "Featured" },
  { id: "contact", label: "Contact" },
];

export function JourneyRail() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const dots = gsap.utils.toArray<HTMLElement>("[data-chapter]");

      dots.forEach((dot) => {
        const id = dot.dataset.chapter;
        if (!id) return;
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            dot.classList.toggle("is-active", self.isActive);
          },
        });
      });

      gsap.to("[data-journey-fill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <aside
      ref={rootRef}
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:right-6 md:block"
      aria-label="Journey progress"
    >
      <div className="relative flex flex-col items-center gap-0">
        <div className="absolute top-2 bottom-2 w-px bg-[var(--line)]">
          <div
            data-journey-fill
            className="h-full w-full origin-top scale-y-0 bg-[var(--accent)]"
          />
        </div>
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`#${chapter.id}`}
            data-chapter={chapter.id}
            data-cursor="grow"
            className="journey-dot pointer-events-auto group relative z-10 flex h-8 w-8 items-center justify-center"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--ink-muted)] transition-all duration-300 group-[.is-active]:h-3 group-[.is-active]:w-3 group-[.is-active]:bg-[var(--accent)]" />
            <span className="absolute right-full mr-3 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] opacity-0 transition-opacity group-hover:opacity-100 group-[.is-active]:opacity-100 group-[.is-active]:text-[var(--ink)]">
              {chapter.label}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
