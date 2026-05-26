"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { SITE_CONFIG } from "@/constants/site";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { Container } from "@/components/layout/container";
import { EditableText } from "@/components/cms-inline/editable-text";
import { PillarColorImage } from "@/components/shared/pillar-color-image";
import PillarSvg from "@/components/shared/pillar-svg";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import { cn } from "@/lib/utils";

type PillarTone = "blue" | "red" | "yellow" | "green";

type PillarItem = {
  slug: string;
  name: string;
  title: string;
  description: string;
  label: string;
  tone: PillarTone;
  href: string;
};

const PILLARS: PillarItem[] = [
  { slug: "ariki", name: "ARIKI", title: "Tumuakitanga", description: "Leadership that gives direction, clarity, and identity.", label: "Te Wai", tone: "blue", href: "/about/ariki" },
  { slug: "tohunga", name: "TOHUNGA", title: "Awatea", description: "The learner's path through knowledge, growth, and discipline.", label: "Te Ahi", tone: "red", href: "/about/tohunga" },
  { slug: "mangotoa", name: "MANGOTOA", title: "Tautika", description: "Practical courage, action, and leverage in everyday life.", label: "Te Haa", tone: "yellow", href: "/about/mangotoa" },
  { slug: "aronui", name: "ARONUI", title: "Rauemi", description: "Nurturing resources, care, and collective wellbeing.", label: "Papatuanuku", tone: "green", href: "/about/aronui" },
];

const toneStyles = {
  blue: {
    pillarColor: "var(--color-pillar-blue)",
    pillarStroke: "var(--color-pillar-blue-dark)",
    accentText: "text-[var(--color-pillar-blue-dark)]",
    accentBg: "bg-[var(--color-pillar-blue)]/10",
    glow: "[filter:drop-shadow(0_24px_32px_rgba(0,162,255,0.22))]",
  },
  red: {
    pillarColor: "var(--color-pillar-red)",
    pillarStroke: "var(--color-pillar-red-dark)",
    accentText: "text-[var(--color-pillar-red-dark)]",
    accentBg: "bg-[var(--color-pillar-red)]/10",
    glow: "[filter:drop-shadow(0_24px_32px_rgba(255,99,71,0.22))]",
  },
  yellow: {
    pillarColor: "var(--color-pillar-yellow)",
    pillarStroke: "var(--color-pillar-yellow-dark)",
    accentText: "text-[var(--color-pillar-yellow-dark)]",
    accentBg: "bg-[var(--color-pillar-yellow)]/10",
    glow: "[filter:drop-shadow(0_24px_32px_rgba(255,193,7,0.22))]",
  },
  green: {
    pillarColor: "var(--color-pillar-green)",
    pillarStroke: "var(--color-pillar-green-dark)",
    accentText: "text-[var(--color-pillar-green-dark)]",
    accentBg: "bg-[var(--color-pillar-green)]/10",
    glow: "[filter:drop-shadow(0_24px_32px_rgba(46,204,113,0.22))]",
  },
} as const;

const yellowBirdImageClass = "brightness-[0.72] contrast-[1.34] saturate-[1.1] drop-shadow-[0_2px_4px_rgba(70,52,8,0.42)]";

function RoofBeam() {
  const roofFrameColor = "#c95745";
  const roofFrameDark = "#b84b3c";
  const roofFrameLight = "#d86a57";
  const roofPanelColor = "#efe6ad";
  const roofPanelStripe = "#e1d38f";

  return (
    <div className="relative z-20 -translate-y-[48%]" aria-hidden>
      <div className="relative left-1/2 w-[100%] -translate-x-1/2 origin-top scale-[1.7]">
        <svg className="mx-auto block h-auto w-full max-w-[100%] drop-shadow-[0_14px_24px_rgba(38,33,24,0.16)]" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roof-panel-lines" width="34" height="34" patternUnits="userSpaceOnUse">
              <rect width="34" height="34" fill={roofPanelColor} />
              <rect x="27" y="0" width="7" height="34" fill={roofPanelStripe} fillOpacity="0.48" />
            </pattern>
          </defs>

          <polygon points="600,30 276,246 600,246" fill="url(#roof-panel-lines)" />
          <polygon points="600,30 924,246 600,246" fill="url(#roof-panel-lines)" />

          <line x1="600" y1="30" x2="224" y2="278" stroke={roofFrameColor} strokeWidth="28" strokeLinecap="round" />
          <line x1="600" y1="30" x2="976" y2="278" stroke={roofFrameColor} strokeWidth="28" strokeLinecap="round" />

          <line x1="600" y1="30" x2="302" y2="230" stroke={roofFrameDark} strokeWidth="20" strokeLinecap="round" />
          <line x1="600" y1="30" x2="898" y2="230" stroke={roofFrameDark} strokeWidth="20" strokeLinecap="round" />

          <rect x="224" y="238" width="752" height="18" rx="8" fill={roofFrameColor} />
          <rect x="232" y="236" width="736" height="6" rx="3" fill={roofFrameLight} />

          <rect x="580" y="50" width="40" height="236" rx="10" fill={roofFrameColor} />
          <rect x="570" y="10" width="60" height="48" rx="12" fill={roofFrameColor} />
          <rect x="272" y="200" width="28" height="64" rx="12" fill={roofFrameColor} />
          <rect x="902" y="200" width="28" height="64" rx="12" fill={roofFrameColor} />
          {/* <rect x="902" y="168" width="48" height="118" rx="12" fill={roofFrameColor} /> */}
        </svg>
      </div>
    </div>
  );
}

function Foundation() {
  const foundationMain = "#c95745";
  const foundationDark = "#b84b3c";

  return (
    <div className="relative z-10" aria-hidden>
      <div className="relative left-1/2 w-[110%] -translate-x-1/2">
        <svg className="mx-auto block h-auto w-[99%] drop-shadow-[0_12px_20px_rgba(38,33,24,0.14)]" viewBox="0 0 1200 124" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="12" width="1156" height="26" rx="8" fill={foundationMain} />
          <rect x="36" y="42" width="1128" height="14" rx="6" fill={foundationDark} />
          <rect x="24" y="58" width="1152" height="54" rx="10" fill={foundationMain} />
        </svg>
      </div>
    </div>
  );
}

function FloatingPanel({ pillar, activeIndex }: { pillar: PillarItem; activeIndex: number }) {
  const styles = toneStyles[pillar.tone];
  const leftPercent = ((activeIndex + 0.5) / PILLARS.length) * 100;
  const horizontalOffset = activeIndex % 2 === 0 ? -14 : 14;
  const clampedLeft = `clamp(9rem, calc(${leftPercent}% + ${horizontalOffset}px), calc(100% - 9rem))`;

  return (
    <ScrollAnimation
      className="pointer-events-none absolute top-[46%] z-30 w-[min(17rem,78vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/[0.97] p-4 shadow-[0_20px_48px_rgba(10,35,48,0.18),0_4px_12px_rgba(10,35,48,0.08)] backdrop-blur-md md:top-1/2 md:w-[260px]"
      style={{ left: clampedLeft } as CSSProperties}
      delay={0.06}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase", styles.accentText, styles.accentBg)}>
          <EditableText path={`home.heroPillars.${activeIndex}.label`} fallback={pillar.label} />
        </span>
        <PillarColorImage
          tone={pillar.tone}
          className="h-10 w-10 shrink-0"
          imageClassName={cn(
            pillar.tone === "yellow" ? yellowBirdImageClass : ""
          )}
        />
      </div>
      <h3 className="mt-2 font-display text-[15px] font-semibold leading-tight text-[var(--hero-black)]">
        <EditableText path={`home.heroPillars.${activeIndex}.title`} fallback={pillar.title} />
      </h3>
      <div className={cn("my-2.5 h-px", styles.accentBg)} />
      <p className="font-serif text-[12px] leading-5 text-[var(--hero-text)]">
        <EditableText path={`home.heroPillars.${activeIndex}.description`} fallback={pillar.description} />
      </p>
      <EditableLink
        path={`home.heroPillars.${activeIndex}.ctaLink`}
        fallback={{ label: "Explore", href: pillar.href }}
        className={cn("pointer-events-auto mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase", styles.accentText)}
        showLabelWhenChildren
      >
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </EditableLink>
    </ScrollAnimation>
  );
}

function PillarColumn({
  pillar,
  active,
  onEnter,
  onLeave,
  delay,
  index,
}: {
  pillar: PillarItem;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  delay: number;
  index: number;
}) {
  const styles = toneStyles[pillar.tone];

  return (
    <ScrollAnimation className="group relative snap-center" onMouseEnter={onEnter} onMouseLeave={onLeave} delay={delay}>
      <EditableLink
        path={`home.heroPillars.${index}.cardLink`}
        fallback={{ label: `Open ${pillar.name} pillar`, href: pillar.href }}
        className="relative block w-full text-left focus-visible:outline-none"
        onFocus={onEnter}
      >
        <div className={cn("relative w-full origin-bottom transform-gpu transition-all duration-500 ease-out", active ? styles.glow : "")}>
          <PillarSvg className="block h-auto w-full" color={styles.pillarColor} strokeColor={styles.pillarStroke} />
          <div className="pointer-events-none absolute left-1/2 top-[22%] z-10 -translate-x-1/2">
            <PillarColorImage
              tone={pillar.tone}
              className={cn(
                "h-[min(10vw,10vh)] w-[min(10vw,10vh)] min-h-12 min-w-12 max-h-24 max-w-24 transition-transform duration-500",
                active ? "scale-105" : "scale-100"
              )}
              imageClassName={cn(
                pillar.tone === "yellow" ? yellowBirdImageClass : ""
              )}
            />
          </div>
        </div>
      </EditableLink>
    </ScrollAnimation>
  );
}

export function HeroFoundation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePillar = activeIndex !== null ? PILLARS[activeIndex] : null;

  return (
    <section className="relative min-h-screen overflow-hidden border-b border-[hsl(var(--border))] bg-background transition-colors duration-500" aria-labelledby="leadership-framework-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 56px",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <ScrollAnimation className="mx-auto max-w-4xl pb-14 pt-14 text-center sm:pb-16 sm:pt-16">
          <p className="font-body text-[11px] font-bold tracking-[0.26em] text-[var(--hero-main)] uppercase">
            {/* <EditableText path="home.hero.sectionLabel" fallback="Hero Section" /> */}
          </p>
          <h2 id="leadership-framework-heading" className="mt-3">
            <span className="sr-only">Te Pae O Te Rangi</span>
            <Image
              src="/logo.png"
              alt={`${SITE_CONFIG.name} logo`}
              width={720}
              height={720}
              className="mx-auto h-auto w-[min(62vw,22rem)] object-contain drop-shadow-[0_14px_28px_rgba(10,10,10,0.22)] sm:w-[min(56vw,26rem)] lg:w-[min(44vw,34rem)]"
              priority
            />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">
            <EditableText path="home.hero.subtitle" fallback="A safe meeting place for healing, identity, leadership, and connection." />
          </p>
          <p className="mx-auto mt-3 max-w-3xl font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">
            <EditableText
              path="home.hero.intro"
              fallback="Te Pae O Te Rangi is the meeting place for all to come - a space where people can arrive as they are, feel safe, be vulnerable, reconnect, and grow through kaupapa Maori values."
            />
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="relative mt-24 sm:mt-28 lg:mt-32" delay={0.12}>
          <div className="pb-2">
            <div
              className="relative mx-auto"
              style={{
                width: "min(96vw, 1120px, calc((100vh - 8.5rem) * 1.36))",
              }}
            >
              <RoofBeam />

              <div className="-mt-[0.6%] grid grid-cols-4 gap-[1.2%] sm:-mt-[0.8%]">
                {PILLARS.map((pillar, idx) => (
                  <PillarColumn
                    key={pillar.name}
                    pillar={pillar}
                    active={idx === activeIndex}
                    onEnter={() => setActiveIndex(idx)}
                    onLeave={() => setActiveIndex((prev) => (prev === idx ? null : prev))}
                    delay={0.16 + idx * 0.06}
                    index={idx}
                  />
                ))}
              </div>

              {activePillar && activeIndex !== null ? <FloatingPanel pillar={activePillar} activeIndex={activeIndex} /> : null}

              <div className="-mt-[0.8%]">
                <Foundation />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
