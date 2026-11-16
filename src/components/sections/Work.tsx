"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { projects } from "@/data/projects";
import { scrollToElement } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/**
 * Work chapter — cover grid, then the selected project's detail.
 */
export function Work() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const project = projects.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) return;
    const id = window.setTimeout(() => {
      scrollToElement(detailRef.current, -24);
    }, 80);
    return () => window.clearTimeout(id);
  }, [selectedId]);

  return (
    <div id="work">
      <section className="bg-[var(--bg)] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <p className="corner-label">Selected work</p>
          <h2 className="display mt-3 max-w-2xl text-4xl tracking-tight text-[var(--ink)] md:text-6xl">
            Projects to return to.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
            Open a project to read the work and, where it is live, browse the site.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
            {projects.map((item, index) => {
              const selected = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={selected}
                    aria-controls="project-detail"
                    className="group block w-full text-left"
                  >
                    <div
                      className={cn(
                        "media-frame aspect-[16/10] w-full overflow-hidden border transition-colors duration-500",
                        selected
                          ? "border-[var(--accent)]"
                          : "border-[var(--line)] group-hover:border-[var(--accent)]",
                      )}
                    >
                      <MediaFrame
                        image={item.image}
                        alt={item.title}
                        label={item.title}
                        className="h-full w-full scale-105 transition-transform duration-[1.1s] ease-out group-hover:scale-100"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="corner-label">
                          {String(index + 1).padStart(2, "0")}
                          {item.year ? ` · ${item.year}` : ""}
                        </p>
                        <h3 className="display mt-2 text-3xl tracking-tight text-[var(--ink)] md:text-4xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--accent)]">
                          {item.subtitle}
                        </p>
                      </div>
                      <span className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {selected ? "Open" : "View"}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {project ? (
        <div ref={detailRef}>
          <ProjectDetail
            key={project.id}
            project={project}
            onClose={() => setSelectedId(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
