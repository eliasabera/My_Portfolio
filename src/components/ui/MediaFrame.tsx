"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  video?: string;
  image?: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  label?: string;
};

export function MediaFrame({
  video,
  image,
  alt,
  className,
  autoPlay = true,
  label,
}: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay) return;

    const play = () => {
      el.play().catch(() => undefined);
    };

    play();
    el.addEventListener("loadeddata", play);
    return () => el.removeEventListener("loadeddata", play);
  }, [autoPlay, video]);

  return (
    <div className={cn("media-frame", className)}>
      {video && !failed ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          aria-label={alt}
        />
      ) : image && !failed ? (
        <img src={image} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="placeholder-media">
          <p className="display text-2xl text-[var(--ink)] md:text-3xl">
            {label || alt}
          </p>
        </div>
      )}
    </div>
  );
}
