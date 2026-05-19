"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Container } from "@/components/layout/container";
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

function RoofBeam() {
  return (
    <div className="relative z-10" aria-hidden>
      <div className="relative left-1/2 w-[104%] -translate-x-1/2">
        <div className="mx-auto h-9 w-[98%] rounded-t-md bg-[var(--color-foundation)] shadow-[0_10px_18px_rgba(38,33,24,0.16)]" />
        <div className="mx-auto h-2 w-[95%] bg-[color-mix(in_oklab,var(--color-foundation)_84%,black)]" />
        <div className="mx-auto h-2 w-[96%] bg-[color-mix(in_oklab,var(--color-foundation)_90%,white)]" />
        <div className="mx-auto h-5 w-[99%] bg-[var(--color-foundation)]" />
      </div>
    </div>
  );
}

function Foundation() {
  return (
    <div className="relative z-10" aria-hidden>
      <div className="relative left-1/2 w-[110%] -translate-x-1/2">
        <div className="mx-auto h-5 w-[99%] bg-[var(--color-foundation)]" />
        <div className="mx-auto h-2 w-[96%] bg-[color-mix(in_oklab,var(--color-foundation)_90%,white)]" />
        <div className="mx-auto h-2 w-[95%] bg-[color-mix(in_oklab,var(--color-foundation)_84%,black)]" />
        <div className="mx-auto h-14 w-[98%] bg-[var(--color-foundation)] shadow-[0_12px_20px_rgba(38,33,24,0.14)]" />
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
      <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase", styles.accentText, styles.accentBg)}>
        {pillar.label}
      </span>
      <h3 className="mt-2 font-display text-[15px] font-semibold leading-tight text-[var(--hero-black)]">{pillar.title}</h3>
      <div className={cn("my-2.5 h-px", styles.accentBg)} />
      <p className="font-serif text-[12px] leading-5 text-[var(--hero-text)]">{pillar.description}</p>
      <Link href={pillar.href} className={cn("pointer-events-auto mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase", styles.accentText)}>
        Explore
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </Link>
    </ScrollAnimation>
  );
}

function PillarColumn({
  pillar,
  active,
  onEnter,
  onLeave,
  delay,
}: {
  pillar: PillarItem;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  delay: number;
}) {
  const styles = toneStyles[pillar.tone];

  return (
    <ScrollAnimation className="group relative snap-center" onMouseEnter={onEnter} onMouseLeave={onLeave} delay={delay}>
      <Link href={pillar.href} className="relative block w-full text-left focus-visible:outline-none" onFocus={onEnter}>
        <div className={cn("relative w-full origin-bottom transform-gpu transition-all duration-500 ease-out", active ? styles.glow : "")}>
          <PillarSvg className="block h-auto w-full" color={styles.pillarColor} strokeColor={styles.pillarStroke} />
        </div>
      </Link>
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
        <ScrollAnimation className="mx-auto max-w-4xl pb-8 pt-14 text-center sm:pb-10 sm:pt-16">
          <p className="font-body text-[11px] font-bold tracking-[0.26em] text-[var(--hero-main)] uppercase">Hero Section</p>
          <h2 id="leadership-framework-heading" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--hero-black)] sm:text-5xl">
            Te Pae O Te Rangi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">
            A safe meeting place for healing, identity, leadership, and connection.
          </p>
          <p className="mx-auto mt-3 max-w-3xl font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">
            Te Pae O Te Rangi is the meeting place for all to come - a space where people can arrive as they are, feel safe, be vulnerable, reconnect, and grow through kaupapa Maori values.
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="mb-3 text-center font-body text-[11px] font-semibold tracking-wide text-[var(--hero-text)] md:hidden" delay={0.06}>
          Swipe to explore -&gt;
        </ScrollAnimation>

        <ScrollAnimation className="relative" delay={0.12}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[var(--hero-bg)] to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[var(--hero-bg)] to-transparent md:hidden" />

          <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
            <div className="relative min-w-[46rem] snap-x snap-mandatory sm:min-w-[56rem] lg:min-w-0">
              <RoofBeam />

              <div className="-mt-4 grid grid-cols-4 gap-2 sm:-mt-5 sm:gap-3">
                {PILLARS.map((pillar, idx) => (
                  <PillarColumn
                    key={pillar.name}
                    pillar={pillar}
                    active={idx === activeIndex}
                    onEnter={() => setActiveIndex(idx)}
                    onLeave={() => setActiveIndex((prev) => (prev === idx ? null : prev))}
                    delay={0.16 + idx * 0.06}
                  />
                ))}
              </div>

              {activePillar && activeIndex !== null ? <FloatingPanel pillar={activePillar} activeIndex={activeIndex} /> : null}

              <Foundation />
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}


