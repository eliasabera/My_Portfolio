"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { siteConfig } from "@/data/site";
import { skills } from "@/data/skills";
import { gsap, registerGsap } from "@/lib/gsap";
import { skillColors, skillIcons } from "@/lib/skillIcons";

/**
 * Concept chapter — Era "The concept" structure.
 */
export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const stage = root.querySelector("[data-stage]");
        const media = root.querySelector("[data-about-media]");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=140%",
              pin: true,
              scrub: 1,
            },
          })
          .fromTo(
            media,
            { scale: 1.25, clipPath: "inset(10% 12% 10% 12%)" },
            { scale: 1, clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
            0,
          )
          .fromTo(
            "[data-about-copy]",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, ease: "none" },
            0.1,
          )
          .fromTo(
            "[data-skill]",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.04, ease: "none" },
            0.35,
          );
      });

      mm.add("(max-width: 899px)", () => {
        gsap.from(root.querySelectorAll("[data-about-copy], [data-skill]"), {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="about" className="relative">
      <div
        data-stage
        className="relative flex min-h-[100svh] items-center px-5 py-24 md:px-8"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden md:min-h-[70vh] md:aspect-auto">
            <div
              data-about-media
              className="absolute inset-0 will-change-transform"
            >
              <MediaFrame
                image={siteConfig.portrait}
                alt={siteConfig.name}
                label="Portrait"
                className="h-full w-full"
                autoPlay={false}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p data-about-copy className="corner-label">
              The concept
            </p>
            <h2
              data-about-copy
              className="display mt-5 max-w-xl text-4xl leading-[1.1] tracking-tight text-[var(--ink)] md:text-6xl"
            >
              {siteConfig.concept}
            </h2>
            <p
              data-about-copy
              className="mt-8 max-w-lg text-base leading-relaxed text-[var(--ink-muted)] md:text-lg"
            >
              {siteConfig.about}
            </p>

            <ul className="mt-12 flex flex-wrap gap-3">
              {skills.map((item) => {
                const Icon = skillIcons[item.icon];
                const color = skillColors[item.icon];
                return (
                  <li key={item.name} data-skill>
                    <span
                      title={item.name}
                      aria-label={item.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]"
                      style={{ color }}
                    >
                      <Icon size={22} aria-hidden />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
