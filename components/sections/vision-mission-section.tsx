import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/constants/site";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden border-b border-[hsl(var(--border))] bg-card py-16 transition-colors duration-500 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(87,87,87,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(87,87,87,0.10) 1px, transparent 1px)",
          backgroundSize: "60px 56px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-muted/55" aria-hidden />

      <Container className="relative z-10 space-y-10">
        <ScrollAnimation className="max-w-5xl">
          <p className="font-display text-[18px] leading-[26px] tracking-[0.14em] text-[var(--hero-main)] uppercase">Vision and Mission</p>
          <h2 className="mt-2 font-display text-3xl leading-tight font-semibold text-[var(--hero-black)] sm:text-4xl sm:leading-[48px]">
            {SITE_CONFIG.description}
          </h2>
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 border border-[var(--hero-main)]/20 bg-white/40 p-5 sm:p-6 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-end lg:p-9" delay={0.1}>
          <div className="space-y-10 border-l-2 border-[var(--hero-main)]/35 pl-6">
            <div className="border-b border-[var(--hero-main)]/20 pb-6">
              <h3 className="font-display text-[28px] leading-[36px] font-semibold text-[var(--hero-black)] sm:text-[32px] sm:leading-[40px]">Our Vision</h3>
              <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">{SITE_CONFIG.heroMeaning}</p>
            </div>

            <div>
              <h3 className="font-display text-[28px] leading-[36px] font-semibold text-[var(--hero-black)] sm:text-[32px] sm:leading-[40px]">Our Mission</h3>
              <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">
                We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/services"
                className="inline-flex min-h-10 items-center border border-[var(--hero-main)] bg-[var(--hero-main)] px-4 py-2 font-serif text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Join a Programme
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center border border-[var(--hero-text)] px-4 py-2 font-serif text-base font-bold text-[var(--hero-text)] transition-colors hover:bg-white/65"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden border border-[var(--hero-main)]/30 bg-white/55 shadow-[0_20px_40px_rgba(8,52,55,0.18)]">
            <div className="absolute -left-6 bottom-10 h-11 w-[70%] min-w-[14rem] max-w-[26rem] -rotate-[12deg] border-y border-[var(--hero-main)]/35 bg-[var(--hero-main)] text-white/90 sm:-left-10 md:-left-12" />
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
