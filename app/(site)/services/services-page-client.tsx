"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { SERVICES } from "@/constants/services";

const highlightServices = SERVICES.slice(0, 4);
const serviceTags = ["All", "Leadership & Identity", "Healing & Wellbeing"];
const serviceIcons = [Sparkles, MessageCircleMore, CalendarDays, ShieldCheck];

export function ServicesPageClient() {
  const [activeTag, setActiveTag] = useState<(typeof serviceTags)[number]>("All");
  const filteredServices = useMemo(
    () => (activeTag === "All" ? SERVICES : SERVICES.filter((service) => service.category === activeTag)),
    [activeTag],
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

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlightServices.map((service, index) => (
              <article key={service.title} className="flex h-full flex-col">
                <header className="min-h-[112px]">
                  <h2 className="font-display text-xl font-semibold text-[var(--hero-black)]">
                    <EditableText path={`home.services.highlight.${index}.title`} fallback={service.title} />
                  </h2>
                </header>
                <main className="mt-4">
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <EditableMedia path={`home.services.highlightMedia.${index}.image`} type="image" emptyLabel={service.placeholderLabel} className="h-56 w-full rounded-none" />
                  </div>
                </main>
                <footer className="mt-4">
                  <p className="font-serif text-sm leading-6 text-[var(--hero-text)]">
                    <EditableText path={`home.services.highlight.${index}.description`} fallback={service.description[0]} />
                  </p>
                </footer>
              </article>
            ))}
          </div>
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];

              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl leading-tight font-semibold text-[var(--hero-black)]">
                    <EditableText path={`home.services.list.${index}.title`} fallback={service.title} />
                  </h3>
                  <p className="mt-4 font-serif text-base leading-7 text-[var(--hero-text)]">
                    <EditableText path={`home.services.list.${index}.description`} fallback={service.description[0]} />
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--hero-black)] transition hover:text-primary"
                    aria-label={`${service.ctaLabel} for ${service.title}`}
                  >
                    <EditableText path={`home.services.list.${index}.ctaLabel`} fallback={service.ctaLabel} />
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}



