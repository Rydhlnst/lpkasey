import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const colorClassMap = {
  blue: "border-[var(--color-pillar-blue)]/35 bg-[var(--color-blue-soft)]",
  red: "border-[var(--color-pillar-red)]/35 bg-[var(--color-red-soft)]",
  yellow: "border-[var(--color-pillar-yellow)]/35 bg-[var(--color-yellow-soft)]",
  green: "border-[var(--color-pillar-green)]/35 bg-[var(--color-green-soft)]",
} as const;

export interface ValueCardProps {
  icon: string;
  title: string;
  keyword: string;
  text: string;
  color: keyof typeof colorClassMap;
}

export function ValueCard({ icon, title, keyword, text, color }: ValueCardProps) {
  return (
    <article className={cn("rounded-3xl border p-5 shadow-[0_8px_28px_rgba(18,18,18,0.06)]", colorClassMap[color])}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xl" aria-hidden>
          {icon}
        </span>
        <Sparkles className="h-4 w-4 text-muted-foreground" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--hero-black)]">{title}</h3>
      <p className="mt-2 font-display text-sm font-medium text-[var(--hero-main)]">{keyword}</p>
      <p className="mt-2 font-serif text-sm leading-6 text-[var(--hero-text)]">{text}</p>
    </article>
  );
}
