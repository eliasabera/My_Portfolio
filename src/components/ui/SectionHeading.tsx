import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 max-w-2xl", className)}>
      {index ? (
        <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          {index}
        </p>
      ) : null}
      <h2 className="display text-3xl tracking-tight text-[var(--ink)] md:text-5xl md:leading-[1.05]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
