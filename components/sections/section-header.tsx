import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: "default" | "wide";
  className?: string;
  descriptionClassName?: string;
}

const widthClassMap = {
  default: "max-w-3xl",
  wide: "max-w-4xl",
} as const;

// Guideline: section-level headings in app pages should use this component for consistent badge/title/description style.
export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  maxWidth = "default",
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", widthClassMap[maxWidth], align === "center" && "mx-auto text-center", className)}>
      <p className="inline-flex w-fit bg-muted px-3 py-1 font-body text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
        {badge}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description ? <p className={cn("font-serif text-base leading-7 text-muted-foreground", descriptionClassName)}>{description}</p> : null}
    </div>
  );
}
