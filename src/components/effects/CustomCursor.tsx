"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      cursor.style.display = "none";
      ring.style.display = "none";
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const magnetic = target?.closest("[data-cursor]");
      if (magnetic) {
        const mode = magnetic.getAttribute("data-cursor") || "grow";
        gsap.to(cursor, { scale: mode === "view" ? 3.2 : 2.2, duration: 0.35 });
        gsap.to(ring, { scale: mode === "view" ? 2.4 : 1.6, opacity: 0.35, duration: 0.35 });
        cursor.dataset.label = magnetic.getAttribute("data-cursor-label") || "";
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest("[data-cursor]")) return;
      gsap.to(cursor, { scale: 1, duration: 0.35 });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35 });
      cursor.dataset.label = "";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={cursorRef} className="cursor-dot" aria-hidden>
        <span className="cursor-label" />
      </div>
    </>
  );
}
