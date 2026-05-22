import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { cn } from "@/lib/utils";
import PillarSvg from "@/components/shared/pillar-svg";
import { PillarColorImage } from "@/components/shared/pillar-color-image";

export const pillarToneColorMap = {
  blue: {
    color: "var(--color-pillar-blue)",
    strokeColor: "var(--color-pillar-blue-dark)",
    accent: "bg-[var(--color-pillar-blue)]",
    text: "text-[var(--color-pillar-blue-dark)]",
    cardBg: "bg-[var(--color-blue-soft)]/95",
    cardBorder: "border-[var(--color-pillar-blue)]/35",
  },
  red: {
    color: "var(--color-pillar-red)",
    strokeColor: "var(--color-pillar-red-dark)",
    accent: "bg-[var(--color-pillar-red)]",
    text: "text-[var(--color-pillar-red-dark)]",
    cardBg: "bg-[var(--color-red-soft)]/95",
    cardBorder: "border-[var(--color-pillar-red)]/35",
  },
  yellow: {
    color: "var(--color-pillar-yellow)",
    strokeColor: "var(--color-pillar-yellow-dark)",
    accent: "bg-[var(--color-pillar-yellow)]",
    text: "text-[var(--color-pillar-yellow-dark)]",
    cardBg: "bg-[var(--color-yellow-soft)]/95",
    cardBorder: "border-[var(--color-pillar-yellow)]/40",
  },
  green: {
    color: "var(--color-pillar-green)",
    strokeColor: "var(--color-pillar-green-dark)",
    accent: "bg-[var(--color-pillar-green)]",
    text: "text-[var(--color-pillar-green-dark)]",
    cardBg: "bg-[var(--color-green-soft)]/95",
    cardBorder: "border-[var(--color-pillar-green)]/35",
  },
} as const;

export type CampaignTone = keyof typeof pillarToneColorMap;

type CategoryPillarCardProps = {
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  linkPath: string;
  fallbackLink: { label: string; href: string; newTab?: boolean };
  tone: CampaignTone;
};

export function CategoryPillarCard({ label, title, description, linkPath, fallbackLink, tone }: CategoryPillarCardProps) {
  const toneMap = pillarToneColorMap[tone];

  return (
    <article className="group relative flex flex-col items-center transition-transform duration-300 ease-out hover:scale-[1.01]">
      <div className="relative mx-auto w-full max-w-[230px]">
        <PillarSvg
          className="pointer-events-none mx-auto h-[320px] w-full opacity-90 drop-shadow-[0_18px_25px_rgba(15,23,42,0.18)] sm:h-[350px]"
          color={toneMap.color}
          strokeColor={toneMap.strokeColor}
        />
        <p
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 rotate-90 font-heading text-sm font-semibold uppercase tracking-[0.38em] opacity-35",
            toneMap.text
          )}
        >
          {title}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto -mt-12 w-[88%] border p-5 text-center shadow-xl backdrop-blur-md",
          toneMap.cardBg,
          toneMap.cardBorder
        )}
      >
        <div className="absolute -top-px left-0 h-px w-full bg-[var(--hero-black)]/10" aria-hidden="true" />
        <span
          className={cn(
            "inline-flex h-2.5 w-10",
            toneMap.accent
          )}
          aria-hidden="true"
        />
        <p className={cn("mt-3 font-heading text-xs font-semibold uppercase tracking-[0.25em]", toneMap.text)}>{label}</p>
        <PillarColorImage tone={tone} className="mx-auto mt-2 h-12 w-12" />
        <h3 className="mt-2 font-heading text-2xl leading-tight font-bold tracking-tight text-[var(--hero-black)]">
          {title}
        </h3>
        <p className="mt-3 font-body text-base leading-7 text-[var(--hero-text)]">{description}</p>
        <EditableLink
          path={linkPath}
          fallback={fallbackLink}
          className="mt-4 inline-flex items-center gap-1 font-body text-base font-bold text-[var(--hero-black)] underline underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus-visible:opacity-70"
          showLabelWhenChildren
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:rotate-6" aria-hidden />
        </EditableLink>
      </div>
    </article>
  );
}
