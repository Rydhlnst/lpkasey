import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { SUPPORT_GROUPS } from "@/constants/services";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

const SUPPORT_HIGHLIGHTS = [
  {
    title: "Safe, Structured Spaces",
    description: "Support circles are facilitated with clear boundaries so people can process and grow safely.",
  },
  {
    title: "Identity-Led Healing",
    description: "Each group strengthens identity, dignity, and practical confidence through culturally grounded care.",
  },
  {
    title: "Whanau-Centred Outcomes",
    description: "Growth is designed to ripple beyond individuals into whanau and wider community wellbeing.",
  },
] as const;

const SUPPORT_STATS = [
  { value: "2 Active Groups", label: "Men's and women's circles running with dedicated facilitators" },
  { value: "Weekly Rhythm", label: "Consistent support cadence to build trust and momentum" },
  { value: "Practical + Cultural", label: "Balanced care model for restoration, identity, and action" },
] as const;

export default function CommunitySupportPage() {
  const [mensGroup, womensGroup] = SUPPORT_GROUPS;

  return (
    <CmsPageShell slug="community-support" fallbackContent={getDefaultCmsContentBySlug("community-support")}>
      <section className="border-b border-border py-16 sm:py-24">
        <Container>
          <EditableMedia path="home.communitySupport.mediaHero" type="image" emptyLabel="Community support hero image" className="aspect-[16/7] w-full rounded-none" />

          <div className="mt-8">
            <SectionHeader
              badge="Community Support"
              title="Safe Spaces for Connection, Healing, and Growth"
              description="Tangata Manaaki Toroa and Whakapakari Manuka are support spaces where people can speak honestly, be heard, and rebuild with support."
              maxWidth="wide"
            />

            <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
              <div className="space-y-8">
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  <EditableText
                    path="home.communitySupport.pageIntro"
                    fallback="These groups create warm and structured spaces where people can be heard, understood, and supported without judgement while strengthening identity, wellbeing, and belonging."
                  />
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {SUPPORT_STATS.map((item, index) => (
                    <article key={item.value} className="border border-border bg-background p-5">
                      <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                        <EditableText path={`home.communitySupport.stats.${index}.value`} fallback={item.value} />
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        <EditableText path={`home.communitySupport.stats.${index}.label`} fallback={item.label} />
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 xl:sticky xl:top-24">
                {SUPPORT_HIGHLIGHTS.map((item, index) => (
                  <article key={item.title} className="border border-border bg-background p-5">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      <EditableText path={`home.communitySupport.highlights.${index}.title`} fallback={item.title} />
                    </h2>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">
                      <EditableText path={`home.communitySupport.highlights.${index}.description`} fallback={item.description} />
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <SectionHeader
            badge="Active Groups"
            title="Join a Group That Meets You Where You Are"
            description="Structured circles designed to strengthen identity, confidence, and collective wellbeing through consistent care."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
              <EditableMedia path="home.communitySupport.mediaMensGroup" type="image" emptyLabel="Men group image" className="absolute inset-0 h-full w-full bg-pillar-blue-soft" />
              <div className="relative z-10">
                <p className="mb-5 w-fit border border-border bg-background px-4 py-2 font-body text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
                  {mensGroup.schedule}
                </p>
                <h3 className="max-w-xl font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
                  <EditableText path="home.communitySupport.mensGroup.title" fallback={mensGroup.title} />
                </h3>
                <p className="mt-3 max-w-xl font-serif text-lg font-bold text-muted-foreground">
                  <EditableText path="home.communitySupport.mensGroup.subtitle" fallback={mensGroup.subtitle} />
                </p>
                <p className="mt-8 max-w-2xl font-serif text-base leading-8 text-foreground/85">
                  <EditableText path="home.communitySupport.mensGroup.description" fallback={mensGroup.description[0]} />
                </p>
                <div className="mt-8">
                  <Button asChild className="min-h-11 border border-border bg-background px-6 font-body text-foreground hover:bg-secondary">
                    <EditableLink path="home.communitySupport.mensGroup.ctaLink" fallback={{ label: mensGroup.ctaLabel, href: "/contact" }} />
                  </Button>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
              <EditableMedia path="home.communitySupport.mediaWomensGroup" type="image" emptyLabel="Women group image" className="absolute inset-0 h-full w-full bg-pillar-green-soft" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="space-y-4">
                  <p className="w-fit border border-border bg-background px-3 py-1 font-body text-xs tracking-[0.12em] text-foreground uppercase">
                    {womensGroup.type}
                  </p>
                  <h3 className="font-display text-2xl leading-tight font-bold text-foreground sm:text-3xl">
                    <EditableText path="home.communitySupport.womensGroup.title" fallback={womensGroup.title} />
                  </h3>
                  <p className="font-serif text-base font-bold leading-7 text-foreground/80">
                    <EditableText path="home.communitySupport.womensGroup.description" fallback={womensGroup.description[0]} />
                  </p>
                </div>

                <ul className="space-y-2">
                  {womensGroup.bullets?.slice(0, 3).map((bullet, index) => (
                    <li key={bullet} className="w-fit border border-border bg-background px-3 py-1 font-body text-sm text-foreground">
                      <EditableText path={`home.communitySupport.womensGroup.bullets.${index}`} fallback={bullet} />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 border border-border bg-background p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              badge="Community Outcome"
              title="You Are Welcome Here"
              description="Come as you are. We support each journey from pressure and isolation toward connection, clarity, and practical wellbeing."
              className="max-w-3xl"
            />
            <Button asChild className="min-h-12 w-full bg-primary px-8 font-body font-semibold text-primary-foreground sm:w-auto">
              <EditableLink path="home.communitySupport.joinCtaLink" fallback={{ label: "Join a Support Group", href: "/contact" }}>
                <EditableText path="home.communitySupport.joinCta" fallback="Join a Support Group" />
              </EditableLink>
            </Button>
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}




