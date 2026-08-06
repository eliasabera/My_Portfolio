"use client";

import { useCallback, useRef, useState } from "react";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { ProjectHotspots } from "@/components/sections/ProjectHotspots";
import { projects } from "@/data/projects";
import { scrollToElement } from "@/lib/lenis";

/**
 * Work chapter — scene selector + deep-dive (web embed / mobile screens).
 */
export function Work() {
  const [index, setIndex] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const project = projects[index] ?? projects[0];

  const scrollToDetail = useCallback(() => {
    window.setTimeout(() => {
      scrollToElement(detailRef.current);
    }, 120);
  }, []);

  const onSelect = useCallback((next: number) => {
    setIndex(next);
  }, []);

  if (!project) return null;

  return (
    <div id="work">
      <ProjectHotspots
        index={index}
        onSelect={onSelect}
        onExplore={scrollToDetail}
      />
      <div ref={detailRef}>
        <ProjectDetail key={project.id} project={project} />
      </div>
    </div>
  );
}
