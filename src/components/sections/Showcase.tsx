"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { projects } from "@/data/projects";
import { gsap, registerGsap } from "@/lib/gsap";

const rooms = projects.filter((p) => p.featured).slice(0, 3);

/**
 * Project rooms — you enter each space: window expands, layers move at
 * different speeds (spatial exploring, not a simple fade-in).
 */
export function Showcase() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const panels = root.querySelectorAll<HTMLElement>("[data-room]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        panels.forEach((panel) => {
          const media = panel.querySelector("[data-room-media]");
          const fg = panel.querySelector("[data-room-fg]");
          const copy = panel.querySelector("[data-room-copy]");
          const number = panel.querySelector("[data-room-number]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: 1,
            },
          });

          tl.fromTo(
            panel,
            { clipPath: "inset(18% 22% 18% 22% round 32px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
            0,
          )
            .fromTo(
              media,
              { scale: 1.4, xPercent: -8 },
              { scale: 1, xPercent: 0, ease: "none" },
              0,
            )
            .fromTo(
              fg,
              { yPercent: 40, opacity: 0 },
              { yPercent: 0, opacity: 1, ease: "none" },
              0.15,
            )
            .fromTo(
              copy,
              { y: 120, opacity: 0 },
              { y: 0, opacity: 1, ease: "none" },
              0.25,
            )
            .fromTo(
              number,
              { xPercent: -40, opacity: 0 },
              { xPercent: 0, opacity: 0.12, ease: "none" },
              0,
            );
        });
      });

      mm.add("(max-width: 767px)", () => {
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-room-copy], [data-room-fg]"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 70%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="rooms" className="relative">
      <div className="px-5 py-16 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          03 — Featured
        </p>
        <h2 className="display mt-4 max-w-3xl text-4xl tracking-tight md:text-6xl">
          Featured work
        </h2>
      </div>

      {rooms.map((project, index) => (
        <article
          key={project.id}
          data-room
          className="relative flex min-h-[100svh] items-end overflow-hidden will-change-[clip-path]"
        >
          <div
            data-room-media
            className="absolute inset-0 will-change-transform"
          >
            <MediaFrame
              video={project.video}
              image={project.image}
              alt={project.title}
              label={project.title}
              className="h-full w-full shadow-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--ink)_80%,transparent)] via-[color-mix(in_oklab,var(--ink)_25%,transparent)] to-transparent" />
          </div>

          <p
            data-room-number
            className="pointer-events-none absolute right-4 top-24 display text-[28vw] leading-none text-white md:right-10"
          >
            {String(index + 1).padStart(2, "0")}
          </p>

          <div
            data-room-fg
            className="absolute right-[8%] top-[18%] hidden h-40 w-28 overflow-hidden rounded-2xl border border-white/30 shadow-2xl md:block"
          >
            <MediaFrame
              image={project.image}
              alt=""
              className="h-full w-full shadow-none"
              autoPlay={false}
            />
          </div>

          <div
            data-room-copy
            className="relative z-10 w-full px-5 pb-16 md:px-10 md:pb-20"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
              {String(index + 1).padStart(2, "0")} — {project.year}
            </p>
            <h3 className="display mt-4 text-5xl tracking-tight text-white md:text-7xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                data-cursor="grow"
                className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]">
                  →
                </span>
                View project
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}
