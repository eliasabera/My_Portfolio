"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import type { Project, ProjectScreen } from "@/types";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { resumePageScroll } from "@/lib/lenis";
import { cn } from "@/lib/utils";

function hasLiveUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

function PhoneFrame({
  image,
  title,
  className,
}: {
  image: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[280px]", className)}>
      <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-2.5 shadow-[var(--modal-shadow)]">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="aspect-[9/19] w-full rounded-[1.75rem] object-cover"
        />
      </div>
    </div>
  );
}

function MobileScreens({
  project,
  screens,
}: {
  project: Project;
  screens: ProjectScreen[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const rows = root.querySelectorAll("[data-screen-row]");
      rows.forEach((row) => {
        const media = row.querySelector("[data-screen-media]");
        const copy = row.querySelector("[data-screen-copy]");
        gsap.from([media, copy], {
          y: 40,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [project.id], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="space-y-24 md:space-y-32">
      {screens.map((screen, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={`${project.id}-${screen.title}-${i}`}
            data-screen-row
            className={cn(
              "grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24",
            )}
          >
            <div
              data-screen-media
              className={cn(reverse && "md:order-2")}
            >
              <PhoneFrame image={screen.image} title={screen.title} />
            </div>
            <div
              data-screen-copy
              className={cn(
                "max-w-md",
                reverse ? "md:order-1 md:justify-self-end md:text-right" : "",
              )}
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--ink-muted)]">
                Screen {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-3xl tracking-tight text-[var(--ink)] md:text-4xl">
                {screen.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
                {screen.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WebEmbed({ project }: { project: Project }) {
  const live = hasLiveUrl(project.liveUrl);
  const [active, setActive] = useState(false);

  const activate = () => {
    if (!live) return;
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
  };

  useEffect(() => {
    setActive(false);
  }, [project.id, project.liveUrl]);

  return (
    <div className="w-full overflow-hidden border-y border-[var(--line)] bg-[var(--bg-elevated)] shadow-[var(--modal-shadow)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3 md:px-6">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-muted)]/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-muted)]/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-muted)]/40" />
        <p className="ml-3 truncate text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
          {live ? project.liveUrl : `${project.title.toLowerCase().replace(/\s+/g, "")}.app`}
        </p>
        {live ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:text-[var(--accent-soft)]"
          >
            Open ↗
          </a>
        ) : null}
      </div>

      <div
        className="relative h-[100vh] w-full bg-[var(--surface)]"
        data-lenis-prevent={active ? true : undefined}
        onMouseLeave={active ? deactivate : undefined}
      >
        {live ? (
          <>
            <iframe
              key={project.liveUrl}
              src={project.liveUrl}
              title={`${project.title} live site`}
              className={cn(
                "absolute inset-0 h-full w-full border-0 bg-white",
                active ? "pointer-events-auto" : "pointer-events-none",
              )}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
            />

            {!active ? (
              <button
                type="button"
                onClick={activate}
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
                aria-label={`Click to browse ${project.title}`}
              >
                <span className="border border-white/40 bg-black/45 px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                  Click to browse
                </span>
              </button>
            ) : null}
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

type ProjectDetailProps = {
  project: Project;
};

/**
 * Below the work scene — web projects embed the live site;
 * mobile projects walk through screens left/right on scroll.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const screens = project.screens ?? [];
  const isMobile = project.kind === "mobile" && screens.length > 0;

  useEffect(() => {
    resumePageScroll();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [project.id]);

  return (
    <section
      id="project-detail"
      aria-label={`${project.title} detail`}
      className="relative border-t border-[var(--line)] bg-[var(--bg)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10 lg:px-14">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--ink-muted)]">
          {isMobile ? "App walkthrough" : "Live experience"}
        </p>
        <h2 className="display mt-3 text-4xl tracking-tight text-[var(--ink)] md:text-5xl lg:text-6xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
          {project.description}
        </p>
      </div>

      <div className="mt-14 w-full md:mt-20">
        {isMobile ? (
          <div className="mx-auto max-w-6xl px-5 md:px-10 lg:px-14">
            <MobileScreens project={project} screens={screens} />
          </div>
        ) : (
          <div className="w-full">
            <WebEmbed project={project} />
          </div>
        )}
      </div>
    </section>
  );
}
