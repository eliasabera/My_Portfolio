"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { projects } from "@/data/projects";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Portal chapter — parallax image tunnel.
 */
export function Portal() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          },
        });

        tl.fromTo(
          "[data-portal-layer]",
          { scale: 0.7, yPercent: 20, opacity: 0.4 },
          { scale: 1.15, yPercent: -10, opacity: 1, stagger: 0.08, ease: "none" },
          0,
        ).fromTo(
          "[data-portal-mask]",
          { clipPath: "inset(35% 40% 35% 40% round 24px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
          0,
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="portal"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div data-portal-mask className="absolute inset-0 will-change-[clip-path]">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 md:grid-cols-4 md:gap-4 md:p-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-portal-layer
              className="relative overflow-hidden rounded-2xl"
              style={{ zIndex: projects.length - i }}
            >
              <MediaFrame
                image={project.image}
                alt={project.title}
                label={project.title}
                className="h-full min-h-[40vh] w-full shadow-none md:min-h-[70vh]"
                autoPlay={false}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--bg)_35%,transparent)]" />
      </div>
    </section>
  );
}
