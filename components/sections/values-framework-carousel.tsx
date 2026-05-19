"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import type { ValueItem } from "@/constants/values";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

interface ValuesFrameworkCarouselProps {
  upperValues: ValueItem[];
  lowerValues: ValueItem[];
}

interface SlideItem {
  group: "KAUAE RUNGA" | "KAUAE RARO";
  title: string;
  keyword: string;
  text: string;
}

function ValuesCarouselBlock({
  subheading,
  slides,
  reverseLayout = false,
}: {
  subheading: "KAUAE RUNGA" | "KAUAE RARO";
  slides: SlideItem[];
  reverseLayout?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative mt-8 sm:mt-12", reverseLayout && "lg:ml-auto")}>
      <div className="mb-4 sm:mb-6">
        <p className="font-heading text-lg font-bold tracking-[0.25em] text-[var(--hero-main)] uppercase">{subheading}</p>
      </div>

      <div className="hidden lg:block">
        <div className="pointer-events-none absolute -left-48 top-[48%] h-[68%] w-72 -translate-y-1/2 rounded-3xl bg-white/70 shadow-[0_0_70px_rgba(18,18,18,0.08)]" />
        <div className="pointer-events-none absolute -right-48 top-[48%] h-[68%] w-72 -translate-y-1/2 rounded-3xl bg-white/70 shadow-[0_0_70px_rgba(18,18,18,0.08)]" />
      </div>

      <ScrollAnimation className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-[0_0_80px_rgba(18,18,18,0.08)] sm:p-6" delay={0.06}>
        <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_1fr]", reverseLayout && "lg:grid-cols-[1fr_minmax(0,0.42fr)]")}>
          <div className="relative rounded-2xl bg-[#a9a9a9] p-3">
            <span className="inline-flex rounded-full border border-black/20 bg-white/85 px-3 py-1 font-display text-sm font-medium text-[var(--hero-text)]">
              {current.group}
            </span>
            <div className="mt-4 min-h-[14rem] rounded-xl bg-[#a9a9a9] sm:min-h-[20rem]" />
          </div>

          <div
            className={cn(
              "flex flex-col justify-between gap-6 p-2 sm:p-4",
              reverseLayout && "lg:order-first"
            )}
          >
            <div>
              <p className="font-display text-lg font-medium text-[var(--hero-main)]">{current.keyword}</p>
              <h3 className="mt-2 font-display text-3xl leading-tight font-semibold text-[var(--hero-black)] sm:text-5xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-2xl font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg sm:leading-8">{current.text}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/services"
                className="inline-flex min-h-10 items-center gap-1 rounded-[80px] bg-[var(--hero-main)] px-4 py-2 font-serif text-base font-bold text-white"
              >
                View Value
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center rounded-[80px] border border-[var(--hero-text)] px-4 py-2 font-serif text-base font-bold text-[var(--hero-text)]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation className="mt-5 flex items-center justify-center gap-3" delay={0.12}>
        <button
          onClick={goPrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d5d5d5] bg-white text-[var(--hero-text)]"
          aria-label={`Previous value ${subheading}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={`${subheading}-${slide.title}`}
              onClick={() => setIndex(dotIndex)}
              className={dotIndex === index ? "h-2 w-12 rounded-full bg-[var(--hero-main)]" : "h-2 w-2 rounded-full bg-[#d9d9d9]"}
              aria-label={`Go to slide ${dotIndex + 1} ${subheading}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d5d5d5] bg-white text-[var(--hero-text)]"
          aria-label={`Next value ${subheading}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </ScrollAnimation>
    </div>
  );
}

export function ValuesFrameworkCarousel({ upperValues, lowerValues }: ValuesFrameworkCarouselProps) {
  const upperSlides: SlideItem[] = upperValues.map((item) => ({
    group: "KAUAE RUNGA",
    title: item.title,
    keyword: item.keyword,
    text: item.text,
  }));

  const lowerSlides: SlideItem[] = lowerValues.map((item) => ({
    group: "KAUAE RARO",
    title: item.title,
    keyword: item.keyword,
    text: item.text,
  }));

  return (
    <section className="border-y border-[hsl(var(--border))] bg-secondary/55 py-16 transition-colors duration-500 sm:py-20">
      <Container>
        <ScrollAnimation className="text-center">
          <p className="font-display text-[18px] leading-[26px] text-[var(--hero-main)]">Values Framework</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--hero-black)] sm:text-5xl">KAUAE RUNGA & KAUAE RARO</h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.08}>
          <ValuesCarouselBlock subheading="KAUAE RUNGA" slides={upperSlides} />
        </ScrollAnimation>
        <ScrollAnimation delay={0.16}>
          <ValuesCarouselBlock subheading="KAUAE RARO" slides={lowerSlides} reverseLayout />
        </ScrollAnimation>
      </Container>
    </section>
  );
}


