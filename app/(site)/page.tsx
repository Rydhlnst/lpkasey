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
import { cmsService } from "@/lib/cms/service/cms-service";
import { EditableList } from "@/components/cms-inline/editable-list";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

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

export default async function HomePage() {
  const page = await cmsService.getPageBySlug("home");
  const pageContent = page?.content as Record<string, unknown> | undefined;
  const homeBlock = (pageContent?.home as Record<string, unknown> | undefined) ?? {};
  const whoWeSupport = (homeBlock.whoWeSupport as string[] | undefined) ?? WHO_WE_SUPPORT;
  const ourApproach = (homeBlock.ourApproach as string[] | undefined) ?? OUR_APPROACH;
  const programmeSummaryCms =
    (homeBlock.programmeSummary as Array<{ title: string; text: string }> | undefined) ??
    PROGRAMME_SUMMARY.map((item) => ({ title: item.title, text: item.text }));
  const programmeLinks =
    ((page?.content.links as { programmeSummaryLinks?: Array<{ title: string; href: string }> } | undefined)?.programmeSummaryLinks ??
      PROGRAMME_SUMMARY_LINKS);

  return (
    <CmsPageShell slug="home" fallbackContent={getDefaultCmsContentBySlug("home")}>
      <HeroFoundation />
      <ImpactSection />
      <VisionMissionSection />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <article>
            <SectionHeader
              badge="Community Focus"
              title="Who We Support"
              badgePath="home.whoWeSupportHeader.badge"
              titlePath="home.whoWeSupportHeader.title"
            />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              <EditableList path="home.whoWeSupport" fallback={whoWeSupport} />
            </ul>
          </article>
          <article>
            <SectionHeader
              badge="Kaupapa Method"
              title="Our Approach"
              badgePath="home.ourApproachHeader.badge"
              titlePath="home.ourApproachHeader.title"
            />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              <EditableList path="home.ourApproach" fallback={ourApproach} />
            </ul>
          </article>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <SectionHeader
            badge="Purpose"
            title="Why It Matters"
            badgePath="home.whyItMattersHeader.badge"
            titlePath="home.whyItMattersHeader.title"
          />
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            <EditableText
              path="home.whyItMatters.p1"
              className=""
            />
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            <EditableText path="home.whyItMatters.p2" className="" />
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            <EditableText path="home.whyItMatters.p3" className="" />
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
            badgePath="home.programmeSummaryHeader.badge"
            titlePath="home.programmeSummaryHeader.title"
            descriptionPath="home.programmeSummaryHeader.description"
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {programmeSummaryCms.map((item, index) => {
              const mappedLink = programmeLinks.find((programmeLink) => programmeLink.title === item.title)?.href ?? PROGRAMME_SUMMARY[index]?.href ?? "/";
              const iconSource = PROGRAMME_SUMMARY[index] ?? PROGRAMME_SUMMARY[0];
              return (
                <Link
                  key={item.title}
                  href={mappedLink}
                  className="group relative overflow-hidden bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/40 hover:shadow-[0_16px_36px_rgba(12,35,54,0.08)]"
                >
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-muted text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
                      <iconSource.icon className="h-5 w-5" />
                    </span>

                    <span className="inline-flex h-10 w-10 translate-x-2 items-center justify-center bg-background/90 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-foreground" />
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-5 text-2xl font-semibold tracking-tight">
                    <EditableText path={`home.programmeSummary.${index}.title`} className="" />
                  </h3>
                  <p className="relative z-10 mt-3 text-base leading-8 text-muted-foreground">
                    <EditableText path={`home.programmeSummary.${index}.text`} className="" />
                  </p>

                  <div className="relative z-10 mt-5 h-1.5 w-16 bg-foreground/15 transition-all duration-300 group-hover:w-24 group-hover:bg-foreground/25" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <LeadershipPillarsSection />
    </CmsPageShell>
  );
}
