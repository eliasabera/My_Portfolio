"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { gsap, registerGsap } from "@/lib/gsap";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const count = { v: 0 };
      const el = root.querySelector("[data-count]");
      const bar = root.querySelector("[data-bar]");
      const title = root.querySelector("[data-title]");

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          document.documentElement.classList.add("app-ready");
          window.dispatchEvent(new Event("portfolio:ready"));
        },
      });

      tl.fromTo(
        title,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.9, ease: "power3.out" },
        0,
      )
        .to(
          count,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (el) el.textContent = String(Math.round(count.v)).padStart(2, "0");
            },
          },
          0.1,
        )
        .fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.1,
        )
        .to(root, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "+=0.15");
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--bg)] px-6 py-8 md:px-10"
      aria-hidden
    >
      <div className="flex items-start justify-between">
        <p className="corner-label">{siteConfig.role}</p>
        <p data-count className="display text-5xl tabular-nums text-[var(--ink)] md:text-7xl">
          00
        </p>
      </div>

      <div>
        <div className="overflow-hidden">
          <p
            data-title
            className="display text-4xl tracking-tight text-[var(--ink)] md:text-6xl"
          >
            {siteConfig.name}
          </p>
        </div>
        <div className="mt-8 h-px origin-left bg-[var(--line)]">
          <div data-bar className="h-px w-full origin-left scale-x-0 bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}
