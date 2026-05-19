import Link from "next/link";
import { HeroFoundation } from "@/components/sections/HeroFoundation";
import { ImpactSection } from "@/components/sections/impact-section";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { ValuesFrameworkCarousel } from "@/components/sections/values-framework-carousel";
import { LeadershipPillarsSection } from "@/components/sections/leadership-pillars-section";
import { SectionHeader } from "@/components/sections/section-header";
import { ArrowUpRight, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PROGRAMME_SUMMARY_LINKS } from "@/constants/links";
import { KAUAE_RARO_VALUES, KAUAE_RUNGA_VALUES } from "@/constants/values";

const WHO_WE_SUPPORT = [
  "Rangatahi seeking identity, confidence, and leadership",
  "Whanau seeking healing and reconnection",
  "Tane and wahine needing safe support spaces",
  "Tamariki and taiohi developing emotional and cultural grounding",
  "Individuals seeking physical, emotional, and spiritual realignment",
  "Communities looking for kaupapa Maori-led growth and wellbeing",
];

const OUR_APPROACH = [
  "Kaupapa Maori values",
  "Cultural identity and belonging",
  "Emotional safety",
  "Practical life skills",
  "Creative healing",
  "Leadership development",
  "Community connection",
  "Balance between reflection and action",
];

const PROGRAMME_SUMMARY = [
  {
    title: "Leadership & Identity",
    text: "Outdoor learning, Mau Rakau, cultural grounding, and rangatahi development.",
    icon: ShieldCheck,
    href: "/programmes/leadership-identity",
  },
  {
    title: "Healing & Wellbeing",
    text: "Music, journaling, Romiromi, Mirimiri, and emotional restoration.",
    icon: HeartHandshake,
    href: "/programmes/healing-wellbeing",
  },
  {
    title: "Community Support",
    text: "Men's and women's support groups designed for safe connection and growth.",
    icon: Users,
    href: "/programmes/community-support",
  },
  {
    title: "Cultural Frameworks",
    text: "Te Whiringawha, Kauae Runga, Kauae Raro, and Tau as guiding principles.",
    icon: Sparkles,
    href: "/programmes/cultural-frameworks",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroFoundation />
      <ImpactSection />
      <VisionMissionSection />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <article>
            <SectionHeader badge="Community Focus" title="Who We Support" />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              {WHO_WE_SUPPORT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <SectionHeader badge="Kaupapa Method" title="Our Approach" />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              {OUR_APPROACH.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <SectionHeader badge="Purpose" title="Why It Matters" />
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Many people carry more than they show. Disconnection, pressure, emotional pain, uncertainty, and lack of support can slowly affect identity, confidence, relationships, and wellbeing.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Te Pae O Te Rangi exists because people need places where they are not treated as problems to be fixed, but as people with mana, potential, and a story worth honoring.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Our kaupapa helps people reconnect with themselves, their culture, their community, and their next step forward.
          </p>
        </Container>
      </section>

      <ValuesFrameworkCarousel upperValues={KAUAE_RUNGA_VALUES} lowerValues={KAUAE_RARO_VALUES} />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <SectionHeader
            badge="Programme Overview"
            title="Programme Summary"
            description="Key pathways that connect leadership, healing, practical support, and cultural grounding."
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PROGRAMME_SUMMARY.map((item) => {
              const mappedLink =
                PROGRAMME_SUMMARY_LINKS.find((programmeLink) => programmeLink.title === item.title)?.href ?? item.href;
              return (
              <Link
                key={item.title}
                href={mappedLink}
                className="group relative overflow-hidden bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/40 hover:shadow-[0_16px_36px_rgba(12,35,54,0.08)]"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-muted text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
                    <item.icon className="h-5 w-5" />
                  </span>

                  <span className="inline-flex h-10 w-10 translate-x-2 items-center justify-center bg-background/90 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-foreground" />
                  </span>
                </div>

                <h3 className="relative z-10 mt-5 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="relative z-10 mt-3 text-base leading-8 text-muted-foreground">{item.text}</p>

                <div className="relative z-10 mt-5 h-1.5 w-16 bg-foreground/15 transition-all duration-300 group-hover:w-24 group-hover:bg-foreground/25" />
              </Link>
            )})}
          </div>
        </Container>
      </section>

      <LeadershipPillarsSection />
    </>
  );
}
