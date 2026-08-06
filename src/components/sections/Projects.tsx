"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { projects } from "@/data/projects";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Era signature: pinned horizontal gallery — drag/scroll to discover work.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.textContent = String(
                  Math.round(self.progress * 100),
                ).padStart(2, "0");
              }
            },
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-[var(--bg-elevated)]"
    >
      <div className="flex items-end justify-between gap-6 px-5 pb-6 pt-24 md:px-8 md:pt-28">
        <div>
          <p className="corner-label">Selected work</p>
          <h2 className="display mt-3 max-w-2xl text-4xl tracking-tight text-[var(--ink)] md:text-6xl">
            Projects to return to.
          </h2>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span
            ref={progressRef}
            className="display text-3xl tabular-nums text-[var(--ink)]"
          >
            00
          </span>
          <span className="scroll-hint">Scroll</span>
        </div>
      </div>

      <p className="mb-6 px-5 text-[11px] uppercase tracking-[0.28em] text-[var(--ink-muted)] md:px-8">
        Drag to see more
      </p>

      <div
        ref={trackRef}
        className="horizontal-track flex gap-5 px-5 pb-24 md:gap-7 md:px-8"
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="group w-[82vw] shrink-0 md:w-[48vw] lg:w-[36vw]"
          >
            <div className="media-frame aspect-[16/11] w-full overflow-hidden">
              <MediaFrame
                video={project.video}
                image={project.image}
                alt={project.title}
                label={project.title}
                className="h-full w-full scale-105 transition-transform duration-[1.1s] ease-out group-hover:scale-100"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="corner-label">
                  {String(index + 1).padStart(2, "0")} · {project.year}
                </p>
                <h3 className="display mt-2 text-3xl tracking-tight text-[var(--ink)] md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--accent)]">
                  {project.subtitle}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
                  {project.description}
                </p>
              </div>
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                >
                  Explore
                </Link>
              ) : null}
            </div>
          </article>
        ))}

        <div className="flex w-[55vw] shrink-0 items-center md:w-[30vw]">
          <Link
            href="#contact"
            className="display text-4xl text-[var(--ink)] transition-colors hover:text-[var(--accent)] md:text-6xl"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  );
}
