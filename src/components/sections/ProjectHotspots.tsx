"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ProjectHotspotsProps = {
  index: number;
  onSelect: (index: number) => void;
  onExplore: () => void;
};

/**
 * Era-style project scene — stacked images crossfade; copy swaps while hidden.
 */
export function ProjectHotspots({
  index,
  onSelect,
  onExplore,
}: ProjectHotspotsProps) {
  const [visualIndex, setVisualIndex] = useState(index);
  const [copyIndex, setCopyIndex] = useState(index);
  const progress = useScrollProgress();
  const progressLabel = String(Math.round(progress * 100)).padStart(2, "0");

  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const indexRef = useRef(index);

  const active = projects[copyIndex];

  useEffect(() => {
    projects.forEach((p) => {
      if (!p.image) return;
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  useGSAP(() => {
    registerGsap();
    layersRef.current.forEach((layer, i) => {
      if (!layer) return;
      gsap.set(layer, {
        autoAlpha: i === indexRef.current ? 1 : 0,
        scale: i === indexRef.current ? 1 : 1.08,
      });
    });
  }, []);

  const runTransition = (next: number) => {
    if (next === indexRef.current) return;

    const from = indexRef.current;
    const fromLayer = layersRef.current[from];
    const toLayer = layersRef.current[next];
    const copy = copyRef.current;

    indexRef.current = next;
    setVisualIndex(next);

    if (!fromLayer || !toLayer || !copy) {
      setCopyIndex(next);
      return;
    }

    registerGsap();
    gsap.killTweensOf([fromLayer, toLayer, copy]);
    busy.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        busy.current = false;
      },
    });

    tl.to(copy, { autoAlpha: 0, y: 18, duration: 0.32, ease: "power2.in" }, 0)
      .set(toLayer, { zIndex: 2 })
      .set(fromLayer, { zIndex: 1 })
      .fromTo(
        toLayer,
        { autoAlpha: 0, scale: 1.1 },
        { autoAlpha: 1, scale: 1, duration: 1.05, ease: "power3.out" },
        0.05,
      )
      .to(
        fromLayer,
        { autoAlpha: 0, scale: 1.02, duration: 0.9, ease: "power2.inOut" },
        0.12,
      )
      .add(() => {
        setCopyIndex(next);
      }, 0.38)
      .to(
        copy,
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
        0.48,
      )
      .set(fromLayer, { scale: 1.08, zIndex: 0 });
  };

  // Sync scene when parent selection changes
  useEffect(() => {
    if (index === indexRef.current) return;
    runTransition(index);
  }, [index]);

  const select = (next: number) => {
    if (next === indexRef.current) return;
    onSelect(next);
  };

  if (!active) return null;

  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              layersRef.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: i === visualIndex ? 1 : 0 }}
            aria-hidden={i !== visualIndex}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/25 to-black/70" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      <div className="absolute bottom-10 left-5 z-20 hidden flex-col items-center gap-4 md:left-8 md:flex">
        <span className="display text-sm tabular-nums tracking-wide text-white/90">
          {progressLabel}
        </span>
        <span className="h-16 w-px bg-white/35" />
        <span className="origin-center rotate-180 text-[10px] uppercase tracking-[0.35em] text-white/55 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>

      <nav
        aria-label="Projects"
        className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-5 md:right-10 lg:right-14"
      >
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">
          Selected works
        </p>
        {projects.map((project, i) => {
          const isActive = i === visualIndex;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => select(i)}
              className={cn(
                "group flex items-baseline gap-3 text-right transition-colors duration-500",
                isActive ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "text-[11px] tabular-nums tracking-[0.2em]",
                  isActive ? "text-[var(--accent-soft)]" : "text-white/50",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base uppercase tracking-[0.2em] md:text-lg lg:text-xl">
                {project.title}
              </span>
            </button>
          );
        })}
        <p className="mt-1 max-w-[10rem] text-right text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/75">
          Details below ↓
        </p>
      </nav>

      <div
        ref={copyRef}
        className="absolute bottom-10 left-5 z-30 max-w-xl will-change-transform md:bottom-14 md:left-20 lg:left-24"
      >
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/55">
          {active.year} — {active.subtitle}
        </p>
        <h2 className="display mt-3 text-2xl leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
          {active.description}
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {active.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-[0.22em] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onExplore}
          className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:text-[var(--accent-soft)]"
        >
          See project details below ↓
        </button>
      </div>
    </section>
  );
}
