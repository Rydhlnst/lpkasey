"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { EditableText } from "@/components/cms-inline/editable-text";
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from "@/components/uilayouts/carousel";
import { SERVICES } from "@/constants/services";
import { AdaptiveEditableMedia } from "./_components/adaptive-editable-media";

const highlightServiceSlugs = [
  "te-manu-puoro",
  "te-manu-rongoa-o-te-rangi",
  "kahukura-matatahi-mentoring",
  "rere-to-tika-rere-pai",
  "tinana-whakarunga",
  "rangatahi-hiking-leadership-initiative",
  "mau-rakau-programme",
] as const;
const serviceTags = ["All", ...new Set(SERVICES.map((service) => service.category))] as const;
const serviceIcons = [Sparkles, MessageCircleMore, CalendarDays, ShieldCheck];

export function ServicesPageClient() {
  const servicesWithIndex = useMemo(() => SERVICES.map((service, serviceIndex) => ({ service, serviceIndex })), []);
  const highlightServices = useMemo(
    () =>
      highlightServiceSlugs
        .map((slug) => servicesWithIndex.find(({ service }) => service.slug === slug))
        .filter((item): item is (typeof servicesWithIndex)[number] => Boolean(item)),
    [servicesWithIndex],
  );
  const [activeTag, setActiveTag] = useState<(typeof serviceTags)[number]>("All");

  const filteredServices = useMemo(
    () =>
      activeTag === "All"
        ? servicesWithIndex
        : servicesWithIndex.filter(({ service }) => service.category === activeTag),
    [activeTag, servicesWithIndex],
  );

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="inline-flex w-fit bg-muted px-3 py-1 font-body text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              <EditableText path="home.services.pageLabel" fallback="Services Overview" />
            </p>
            <h1 className="font-display text-4xl leading-tight font-bold text-[var(--hero-black)] sm:text-5xl">
              <EditableText path="home.services.pageTitle" fallback="Leadership, Healing, and Wellbeing Pathways" />
            </h1>
            <p className="max-w-2xl font-serif text-lg leading-8 text-[var(--hero-text)]">
              <EditableText
                path="home.services.pageSummary"
                fallback="Explore programmes grounded in kaupapa Maori values that support identity, emotional wellbeing, and practical growth."
              />
            </p>
          </div>

          <Carousel options={{ align: "start", containScroll: "trimSnaps" }} className="space-y-6">
            <SliderContainer className="-ml-4">
              {highlightServices.map(({ service, serviceIndex }) => (
                <Slider key={service.slug} className="basis-full pl-4 md:basis-1/2 xl:basis-1/3">
                  <article className="flex h-full flex-col">
                    <header>
                      <h2 className="font-display text-xl font-semibold text-[var(--hero-black)]">
                        <EditableText path={`home.services.highlight.${serviceIndex}.title`} fallback={service.title} />
                      </h2>
                    </header>
                    <main className="mt-2">
                      <div className="overflow-hidden rounded-2xl border border-border">
                        <AdaptiveEditableMedia
                          path={`home.services.highlightMedia.${serviceIndex}.image`}
                          emptyLabel={service.placeholderLabel}
                          className="w-full rounded-none"
                          unknownClassName="aspect-[16/10]"
                          landscapeClassName="aspect-[16/10]"
                          portraitClassName="aspect-[4/5]"
                          squareClassName="aspect-square"
                        />
                      </div>
                    </main>
                    <footer className="mt-4">
                      <p className="font-serif text-sm leading-6 text-[var(--hero-text)]">
                        <EditableText path={`home.services.highlight.${serviceIndex}.description`} fallback={service.summary} />
                      </p>
                    </footer>
                  </article>
                </Slider>
              ))}
            </SliderContainer>

            <div className="flex items-center justify-between gap-3">
              <SliderDotButton className="flex-wrap" activeClass="bg-primary" />
              <div className="flex items-center gap-2">
                <SliderPrevButton
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[var(--hero-black)] transition hover:bg-muted/70 disabled:opacity-40"
                  aria-label="Previous services"
                >
                  <ChevronLeft className="h-5 w-5" />
                </SliderPrevButton>
                <SliderNextButton
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[var(--hero-black)] transition hover:bg-muted/70 disabled:opacity-40"
                  aria-label="Next services"
                >
                  <ChevronRight className="h-5 w-5" />
                </SliderNextButton>
              </div>
            </div>
          </Carousel>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-8">
          <SectionHeader
            badge="Services"
            title="Choose the Pathway That Fits Your Next Step"
            description="Each service is designed to help people reconnect with identity, build confidence, and move forward with support."
            maxWidth="wide"
          />

          <div className="flex flex-wrap gap-3">
            {serviceTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          <Carousel
            key={activeTag}
            options={{ align: "start", containScroll: "trimSnaps" }}
            className="space-y-6"
          >
            <SliderContainer className="-ml-4">
              {filteredServices.map(({ service, serviceIndex }, visualIndex) => {
                const Icon = serviceIcons[visualIndex % serviceIcons.length];

                return (
                  <Slider key={service.slug} className="basis-full pl-4 md:basis-1/2 xl:basis-1/3">
                    <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl leading-tight font-semibold text-[var(--hero-black)]">
                        <EditableText path={`home.services.list.${serviceIndex}.title`} fallback={service.title} />
                      </h3>
                      <p className="mt-4 font-serif text-base leading-7 text-[var(--hero-text)]">
                        <EditableText path={`home.services.list.${serviceIndex}.description`} fallback={service.summary} />
                      </p>
                      <EditableLink
                        path={`home.services.list.${serviceIndex}.ctaLink`}
                        fallback={{ label: service.ctaLabel, href: `/services/${service.slug}` }}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--hero-black)] transition hover:text-primary"
                        aria-label={`${service.ctaLabel} for ${service.title}`}
                      >
                        <EditableText path={`home.services.list.${serviceIndex}.ctaLabel`} fallback={service.ctaLabel} />
                        <ArrowRight className="h-4 w-4" />
                      </EditableLink>
                    </article>
                  </Slider>
                );
              })}
            </SliderContainer>

            <div className="flex items-center justify-between gap-3">
              <SliderDotButton className="flex-wrap" activeClass="bg-primary" />
              <div className="flex items-center gap-2">
                <SliderPrevButton
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[var(--hero-black)] transition hover:bg-muted/70 disabled:opacity-40"
                  aria-label="Previous service cards"
                >
                  <ChevronLeft className="h-5 w-5" />
                </SliderPrevButton>
                <SliderNextButton
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[var(--hero-black)] transition hover:bg-muted/70 disabled:opacity-40"
                  aria-label="Next service cards"
                >
                  <ChevronRight className="h-5 w-5" />
                </SliderNextButton>
              </div>
            </div>
          </Carousel>
        </Container>
      </section>
    </>
  );
}
