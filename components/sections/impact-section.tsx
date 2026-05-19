import { Container } from "@/components/layout/container";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

const IMPACT_METRICS = [
  { value: "Whānau", label: "Empowered Through Connection" },
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
            <p className="font-display text-[18px] leading-[26px] tracking-[0.14em] text-[var(--hero-main)] uppercase">About Te Pae O Te Rangi</p>
            <h2 className="mt-2 font-display text-3xl leading-tight font-semibold text-[var(--hero-black)] sm:text-5xl sm:leading-[56px]">
              Healing, Connection, Growth and Empowerment
            </h2>
          </div>
          <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
            Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Māori values.
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-6 lg:grid-cols-[2fr_1fr]" delay={0.08}>
          <div className="min-h-[14rem] border border-[var(--hero-main)]/25 bg-white/55 shadow-[0_22px_36px_rgba(7,58,61,0.14)] sm:min-h-[18rem]" />
          <div className="min-h-[14rem] border border-[var(--hero-main)]/25 bg-white/40 sm:min-h-[18rem]" />
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-start" delay={0.16}>
          <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
            Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whānau, rangatahi, tāne, wāhine and tamariki to recognise their value, their worth and their potential.
          </p>
          <div className="grid gap-4 border-t border-[var(--hero-main)]/25 pt-6 md:grid-cols-3">
            {IMPACT_METRICS.map((metric, index) => (
              <ScrollAnimation
                key={metric.label}
                className="flex min-h-36 min-w-0 flex-col justify-center border-l border-[var(--hero-main)]/20 pl-4 md:first:border-l-0 md:first:pl-0"
                delay={0.2 + index * 0.06}
              >
                <p className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] font-semibold text-[var(--hero-black)] [overflow-wrap:anywhere]">
                  {metric.value}
                </p>
                <p className="mt-2 font-display text-[18px] leading-[26px] text-[var(--hero-secondary)]">{metric.label}</p>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
