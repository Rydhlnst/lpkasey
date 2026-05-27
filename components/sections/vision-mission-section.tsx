import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/constants/site";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden border-b border-[hsl(var(--border))] bg-card py-16 transition-colors duration-500 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-muted/55" aria-hidden />

      <Container className="relative z-10 space-y-10">
        <ScrollAnimation className="max-w-5xl">
          <p className="font-display text-[18px] leading-[26px] tracking-[0.14em] text-[var(--hero-main)] uppercase">
            <EditableText path="home.visionMission.label" fallback="Vision and Mission" />
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight font-semibold text-[var(--hero-black)] sm:text-4xl sm:leading-[48px]">
            <EditableText path="home.visionMission.title" fallback={SITE_CONFIG.description} />
          </h2>
        </ScrollAnimation>

        <ScrollAnimation className="grid gap-8 border border-[var(--hero-main)]/20 bg-white/40 p-5 sm:p-6 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-end lg:p-9" delay={0.1}>
          <div className="space-y-10 border-l-2 border-[var(--hero-main)]/35 pl-6">
            <div className="border-b border-[var(--hero-main)]/20 pb-6">
              <h3 className="font-display text-[28px] leading-[36px] font-semibold text-[var(--hero-black)] sm:text-[32px] sm:leading-[40px]">
                <EditableText path="home.visionMission.visionHeading" fallback="Our Vision" />
              </h3>
              <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">
                <EditableText path="home.visionMission.visionText" fallback={SITE_CONFIG.heroMeaning} />
              </p>
            </div>

            <div>
              <h3 className="font-display text-[28px] leading-[36px] font-semibold text-[var(--hero-black)] sm:text-[32px] sm:leading-[40px]">
                <EditableText path="home.visionMission.missionHeading" fallback="Our Mission" />
              </h3>
              <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">
                <EditableText
                  path="home.visionMission.missionText"
                  fallback="We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing."
                />
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <EditableLink
                path="home.visionMission.ctaPrimaryLink"
                fallback={{ label: "Join a Programme", href: "/services" }}
                className="inline-flex min-h-10 items-center border border-[var(--hero-main)] bg-[var(--hero-main)] px-4 py-2 font-serif text-base font-bold text-white transition-opacity hover:opacity-90"
              />
              <EditableLink
                path="home.visionMission.ctaSecondaryLink"
                fallback={{ label: "Learn More", href: "/about" }}
                className="inline-flex min-h-10 items-center border border-[var(--hero-text)] px-4 py-2 font-serif text-base font-bold text-[var(--hero-text)] transition-colors hover:bg-white/65"
              />
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden border border-[var(--hero-main)]/30 bg-white/55 shadow-[0_20px_40px_rgba(8,52,55,0.18)]">
            <EditableMedia
              path="home.visionMission.mediaMain"
              type="image"
              emptyLabel="Vision image"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
