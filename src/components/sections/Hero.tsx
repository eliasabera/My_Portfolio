"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { siteConfig } from "@/data/site";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Era-style full-bleed hero: cinematic image, editorial type, scroll journey.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const media = root.querySelector("[data-media]");
      const lines = root.querySelectorAll("[data-line]");
      const fade = root.querySelectorAll("[data-fade]");

      gsap.set(media, { scale: 1.2 });
      gsap.set(lines, { yPercent: 120 });
      gsap.set(fade, { opacity: 0, y: 20 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(media, { scale: 1, duration: 1.8 }, 0)
          .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.25)
          .to(fade, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 }, 0.55);
      };

      if (document.documentElement.classList.contains("app-ready")) play();
      else window.addEventListener("portfolio:ready", play, { once: true });

      gsap.to(media, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => window.removeEventListener("portfolio:ready", play);
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <div data-media className="h-full w-full will-change-transform">
          <MediaFrame
            image={siteConfig.portrait}
            alt={siteConfig.name}
            label="Portrait"
            className="h-full w-full"
            autoPlay={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_oklab,var(--bg)_45%,transparent)] to-[color-mix(in_oklab,var(--bg)_20%,transparent)]" />
      </div>

      <p className="corner-label absolute left-5 top-24 md:left-8">Software</p>
      <p className="corner-label absolute right-5 top-24 md:right-8">Developer</p>

      <div className="relative z-10 w-full px-5 pb-14 pt-40 md:px-8 md:pb-16">
        <div className="mx-auto max-w-[1600px]">
          <p data-fade className="scroll-hint mb-6">
            {siteConfig.role}
          </p>

          <h1 className="display max-w-[12ch] text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--ink)]">
            <span className="block overflow-hidden">
              <span data-line className="block">
                {siteConfig.name.split(" ")[0]}
              </span>
            </span>
            <span className="block overflow-hidden text-[var(--accent)]">
              <span data-line className="block">
                {siteConfig.name.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </h1>

          <div
            data-fade
            className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="display max-w-xl text-2xl leading-snug text-[var(--ink-muted)] md:text-3xl">
              {siteConfig.headline}
            </p>
            <Link
              href="#work"
              className="text-[11px] uppercase tracking-[0.28em] text-[var(--ink)] underline underline-offset-8 transition-colors hover:text-[var(--accent)]"
            >
              View work
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-5 flex items-center gap-3 md:left-8">
        <span className="display text-sm tabular-nums text-[var(--ink-muted)]">00</span>
        <span className="scroll-hint">Scroll</span>
      </div>
    </section>
  );
}
