import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PillarColorImage } from "@/components/shared/pillar-color-image";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

type LeadershipPillar = {
  slug: string;
  name: string;
  meaning: string;
  role: string;
  element: string;
  colorLabel: string;
  tone: "blue" | "red" | "yellow" | "green";
  accentClassName: string;
  iconWrapClassName: string;
  buttonClassName: string;
  hoverSurfaceClassName: string;
  overlayClassName: string;
  patternClassName: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const LEADERSHIP_PILLARS: LeadershipPillar[] = [
  {
    slug: "ariki",
    name: "Ariki",
    meaning: "Te Wai",
    role: "Leader",
    element: "Water",
    colorLabel: "Blue",
    tone: "blue",
    accentClassName: "group-hover:border-[var(--color-pillar-blue)]/45 group-hover:shadow-[0_18px_42px_hsl(var(--pillar-blue)/0.12)]",
    iconWrapClassName: "bg-[var(--color-pillar-blue)]/12 text-[var(--color-pillar-blue)]",
    buttonClassName: "border-[var(--color-pillar-blue)]/35 text-[var(--color-pillar-blue)] hover:bg-[var(--color-pillar-blue)]/12",
    hoverSurfaceClassName: "group-hover:bg-[var(--color-pillar-blue)]/12",
    overlayClassName: "from-[rgba(82,170,201,0.40)] via-[rgba(82,170,201,0.18)] to-transparent",
    patternClassName:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_3px,transparent_3px,transparent_18px),repeating-linear-gradient(135deg,transparent_0,transparent_9px,rgba(255,255,255,0.14)_9px,rgba(255,255,255,0.14)_12px,transparent_12px,transparent_24px)] bg-[length:48px_48px]",
  },
  {
    slug: "tohunga",
    name: "Tohunga",
    meaning: "Te Ahi",
    role: "Learner",
    element: "Fire",
    colorLabel: "Red",
    tone: "red",
    accentClassName: "group-hover:border-[var(--color-pillar-red)]/45 group-hover:shadow-[0_18px_42px_hsl(var(--pillar-red)/0.12)]",
    iconWrapClassName: "bg-[var(--color-pillar-red)]/12 text-[var(--color-pillar-red)]",
    buttonClassName: "border-[var(--color-pillar-red)]/35 text-[var(--color-pillar-red)] hover:bg-[var(--color-pillar-red)]/12",
    hoverSurfaceClassName: "group-hover:bg-[var(--color-pillar-red)]/12",
    overlayClassName: "from-[rgba(196,111,98,0.42)] via-[rgba(196,111,98,0.18)] to-transparent",
    patternClassName:
      "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_2px,transparent_2px,transparent_14px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.14)_0,rgba(255,255,255,0.14)_2px,transparent_2px,transparent_16px),linear-gradient(0deg,transparent_0,transparent_38%,rgba(255,255,255,0.11)_38%,rgba(255,255,255,0.11)_62%,transparent_62%,transparent_100%)] bg-[length:42px_42px]",
  },
  {
    slug: "mangotoa",
    name: "Mangotoa",
    meaning: "Te Haa",
    role: "Leverager",
    element: "Air",
    colorLabel: "Yellow",
    tone: "yellow",
    accentClassName: "group-hover:border-[var(--color-pillar-yellow)]/50 group-hover:shadow-[0_18px_42px_hsl(var(--pillar-yellow)/0.14)]",
    iconWrapClassName: "bg-[var(--color-pillar-yellow)]/14 text-[var(--color-pillar-yellow)]",
    buttonClassName: "border-[var(--color-pillar-yellow)]/35 text-[var(--color-pillar-yellow)] hover:bg-[var(--color-pillar-yellow)]/14",
    hoverSurfaceClassName: "group-hover:bg-[var(--color-pillar-yellow)]/14",
    overlayClassName: "from-[rgba(210,171,79,0.40)] via-[rgba(210,171,79,0.18)] to-transparent",
    patternClassName:
      "bg-[linear-gradient(45deg,rgba(255,255,255,0.20)_12%,transparent_12%,transparent_38%,rgba(255,255,255,0.20)_38%,rgba(255,255,255,0.20)_62%,transparent_62%,transparent_88%,rgba(255,255,255,0.20)_88%),linear-gradient(-45deg,rgba(255,255,255,0.14)_12%,transparent_12%,transparent_38%,rgba(255,255,255,0.14)_38%,rgba(255,255,255,0.14)_62%,transparent_62%,transparent_88%,rgba(255,255,255,0.14)_88%)] bg-[length:40px_40px]",
  },
  {
    slug: "aronui",
    name: "Aronui",
    meaning: "Papatuanuku",
    role: "Lover / Nurturer",
    element: "Earth",
    colorLabel: "Green",
    tone: "green",
    accentClassName: "group-hover:border-[var(--color-pillar-green)]/45 group-hover:shadow-[0_18px_42px_hsl(var(--pillar-green)/0.12)]",
    iconWrapClassName: "bg-[var(--color-pillar-green)]/12 text-[var(--color-pillar-green)]",
    buttonClassName: "border-[var(--color-pillar-green)]/35 text-[var(--color-pillar-green)] hover:bg-[var(--color-pillar-green)]/12",
    hoverSurfaceClassName: "group-hover:bg-[var(--color-pillar-green)]/12",
    overlayClassName: "from-[rgba(111,150,126,0.42)] via-[rgba(111,150,126,0.20)] to-transparent",
    patternClassName:
      "bg-[radial-gradient(ellipse_14px_10px_at_25%_25%,rgba(255,255,255,0.26)_0,rgba(255,255,255,0.26)_35%,transparent_36%),radial-gradient(ellipse_14px_10px_at_75%_75%,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_35%,transparent_36%),repeating-linear-gradient(45deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_2px,transparent_2px,transparent_14px)] bg-[length:56px_56px]",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What are the four leadership styles?",
    answer:
      "Ariki, Tohunga, Mangotoa, and Aronui represent distinct ways of leading, learning, leveraging opportunity, and nurturing others.",
  },
  {
    question: "How do these styles support group growth?",
    answer:
      "They help people understand how they show up, communicate better, and contribute in ways that strengthen the collective.",
  },
  {
    question: "Can someone carry more than one style?",
    answer:
      "Yes. These are not fixed labels. People can grow across styles and use different strengths in different contexts.",
  },
  {
    question: "Why are these linked with Te Wai, Te Ahi, Te Haa, and Papatuanuku?",
    answer: "The elements provide cultural language and symbolism that make each leadership expression easier to understand and apply.",
  },
  {
    question: "How can I start applying these leadership styles?",
    answer:
      "Start by identifying your strongest style, then consciously develop the others to balance vision, learning, action, and care.",
  },
];

export function LeadershipPillarsSection() {
  return (
    <section className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-background py-16 transition-colors duration-500 sm:py-20" aria-labelledby="leadership-pillars-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-secondary/60 to-transparent" aria-hidden />

      <Container className="relative space-y-16">
        <ScrollAnimation className="space-y-4 text-center">
          <h2
            id="leadership-pillars-heading"
            className="mx-auto max-w-4xl font-display text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <EditableText path="home.leadershipPillars.heading" fallback="Our Leadership Styles" />
          </h2>
          <p className="mx-auto max-w-3xl font-serif text-base leading-7 text-muted-foreground sm:text-lg">
            <EditableText
              path="home.leadershipPillars.description"
              fallback="Through Te Whiringawha, we recognize four leadership styles that help people understand themselves and how they relate to others."
            />
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="mx-0 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0" delay={0.08}>
          {LEADERSHIP_PILLARS.map((pillar, index) => {
            return (
              <ScrollAnimation
                key={pillar.name}
                className={cn(
                  "group relative flex min-h-[320px] w-[min(82vw,22rem)] min-w-[16rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_16px_34px_rgba(12,35,54,0.08)] transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:scale-[1.01] sm:w-[360px] lg:w-auto",
                  pillar.accentClassName,
                  pillar.hoverSurfaceClassName
                )}
                delay={0.12}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr opacity-0 transition-all duration-500 ease-out",
                    "translate-x-[-65%] translate-y-[65%] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                    pillar.overlayClassName
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 opacity-0 transition-all duration-700 ease-out",
                    "translate-x-[-75%] translate-y-[75%] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                    pillar.patternClassName
                  )}
                />

                <div className="relative z-10 space-y-4">
                  <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-xl", pillar.iconWrapClassName)}>
                    <PillarColorImage tone={pillar.tone} className="h-12 w-12" />
                  </div>

                  <div>
                    <p className="font-body text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                      <EditableText
                        path={`home.leadershipPillars.pillars.${index}.meta`}
                        fallback={`${pillar.colorLabel} - ${pillar.element}`}
                      />
                    </p>
                    <h3 className="mt-2 font-display text-[30px] leading-[34px] font-semibold text-foreground">
                      <EditableText path={`home.leadershipPillars.pillars.${index}.name`} fallback={pillar.name} />
                    </h3>
                    <p className="mt-2 font-serif text-base leading-7 text-muted-foreground">
                      <EditableText
                        path={`home.leadershipPillars.pillars.${index}.meaning`}
                        fallback={`${pillar.meaning} - ${pillar.role}`}
                      />
                    </p>
                  </div>
                </div>

                <EditableMedia
                  path={`home.leadershipPillars.pillars.${index}.media`}
                  type="image"
                  emptyLabel="Pillar image"
                  className="relative z-10 mt-4 min-h-24"
                />

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-body text-sm font-semibold text-foreground">
                    <EditableText path={`home.leadershipPillars.pillars.${index}.cta`} fallback="Explore Pillar" />
                  </span>
                  <Link
                    href={`/about/${pillar.slug}`}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-card transition-all duration-300 ease-out hover:scale-110",
                      pillar.buttonClassName
                    )}
                    aria-label={`Explore ${pillar.name} pillar`}
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:scale-110" aria-hidden />
                  </Link>
                </div>

                <Link href={`/about/${pillar.slug}`} className="absolute inset-0 z-20" aria-label={`Open ${pillar.name} pillar page`}>
                  <span className="sr-only">Open {pillar.name}</span>
                </Link>
              </ScrollAnimation>
            );
          })}
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 border-t border-border pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12" delay={0.16}>
          <div>
            <h3 className="max-w-md font-display text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
              <EditableText path="home.leadershipPillars.faqHeading" fallback="Frequently Asked Questions" />
            </h3>
          </div>

          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full border-t border-border">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-border py-1">
                <AccordionTrigger className="py-4 font-body text-base font-semibold text-foreground hover:no-underline sm:text-lg">
                  <EditableText path={`home.leadershipPillars.faq.${index}.question`} fallback={item.question} />
                </AccordionTrigger>
                <AccordionContent className="pb-4 font-serif text-base leading-7 text-muted-foreground">
                  <EditableText path={`home.leadershipPillars.faq.${index}.answer`} fallback={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </Container>
    </section>
  );
}

