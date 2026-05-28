import { Container } from "@/components/layout/container";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { EditableYoutube } from "@/components/cms-inline/editable-youtube";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

const IMPACT_METRICS = [
  { value: "Whanau", label: "Empowered Through Connection" },
  { value: "Rangatahi", label: "Growing Identity & Leadership" },
  { value: "Tamariki", label: "Supported To Thrive" },
];

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden border-y border-[hsl(var(--border))] bg-muted/50 py-16 transition-colors duration-500 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/80 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-card/60" aria-hidden />
      <Container className="relative z-10 space-y-10">
        <ScrollAnimation className="grid gap-8 border-b border-[var(--hero-main)]/25 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-end">
          <div>
            <EditableText
              path="home.impact.label"
              as="p"
              fallback="About Te Pae O Te Rangi"
              className="font-display text-[18px] leading-[26px] tracking-[0.14em] text-[var(--hero-main)] uppercase"
            />
            <h2 className="mt-2 font-display text-3xl leading-tight font-semibold text-[var(--hero-black)] sm:text-5xl sm:leading-[56px]">
              <EditableText path="home.impact.title" fallback="Healing, Connection, Growth and Empowerment" />
            </h2>
          </div>
          <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
            <EditableText
              path="home.impact.summary"
              fallback="Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values."
            />
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 md:grid-cols-2 md:gap-10" delay={0.08}>
          <div className="mx-auto w-full max-w-[23rem]">
            <EditableMedia
              path="home.impact.mediaImage"
              type="image"
              emptyLabel="Impact image"
              className="aspect-[9/16] w-full overflow-hidden rounded-[4px] border border-[var(--hero-main)]/25 bg-white/55 object-cover shadow-[0_22px_36px_rgba(7,58,61,0.14)]"
            />
          </div>
          <div className="mx-auto w-full max-w-[23rem]">
            <EditableYoutube
              path="home.impact.videoUrl"
              fallback="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              emptyLabel="Impact YouTube video"
              className="aspect-[9/16] w-full overflow-hidden rounded-[4px] border border-[var(--hero-main)]/25 bg-black object-contain shadow-[0_22px_36px_rgba(7,58,61,0.14)]"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-start" delay={0.16}>
          <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
            <EditableText
              path="home.impact.description"
              fallback="Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential."
            />
          </p>
          <div className="grid items-stretch gap-0 border-t border-[var(--hero-main)]/25 pt-6 md:grid-cols-3">
            {IMPACT_METRICS.map((metric, index) => (
              <ScrollAnimation
                key={metric.label}
                className="grid min-h-36 min-w-0 grid-rows-[auto_1fr] border-l border-[var(--hero-main)]/20 px-6 first:border-l-0 md:px-8 md:first:pl-0"
                delay={0.2 + index * 0.06}
              >
                <p className="font-display whitespace-nowrap text-[clamp(2.2rem,4vw,4rem)] md:text-[clamp(2.5rem,3vw,3rem)] leading-none font-semibold tracking-tight text-[var(--hero-black)]">
                  <EditableText path={`home.impact.metrics.${index}.value`} fallback={metric.value} />
                </p>

                <p className="mt-4 max-w-[14rem] font-display text-[18px] leading-[26px] text-[var(--hero-secondary)]">
                  <EditableText path={`home.impact.metrics.${index}.label`} fallback={metric.label} />
                </p>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
