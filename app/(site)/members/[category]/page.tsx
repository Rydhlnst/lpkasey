import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { PillarColorImage, type PillarTone } from "@/components/shared/pillar-color-image";
import { getProfileImagesByTone } from "@/constants/member-profile-images";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

const CATEGORY_DATA = {
  ariki: {
    label: "Ariki",
    tone: "blue",
    subtitle: "Tumuakitanga",
    members: ["Member Ariki 01", "Member Ariki 02", "Member Ariki 03", "Member Ariki 04"],
  },
  tohunga: {
    label: "Tohunga",
    tone: "red",
    subtitle: "Awatea",
    members: ["Member Tohunga 01", "Member Tohunga 02", "Member Tohunga 03", "Member Tohunga 04"],
  },
  mangotoa: {
    label: "Mangotoa",
    tone: "yellow",
    subtitle: "Tautika",
    members: ["Member Mangotoa 01", "Member Mangotoa 02", "Member Mangotoa 03", "Member Mangotoa 04"],
  },
  aronui: {
    label: "Aronui",
    tone: "green",
    subtitle: "Rauemi",
    members: ["Member Aronui 01", "Member Aronui 02", "Member Aronui 03", "Member Aronui 04"],
  },
} as const;

type CategoryKey = keyof typeof CATEGORY_DATA;

type CategoryData = (typeof CATEGORY_DATA)[CategoryKey] & { tone: PillarTone };

export function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map((category) => ({ category }));
}

export default async function MemberCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = CATEGORY_DATA[category as CategoryKey] as CategoryData | undefined;

  if (!data) notFound();

  const profileImages = getProfileImagesByTone(data.tone);

  return (
    <CmsPageShell slug={`members-${category}`} fallbackContent={getDefaultCmsContentBySlug(`members-${category}`)}>
      <section className="border-b border-border bg-background py-10 sm:py-14">
        <Container>
          <div className="overflow-hidden rounded-[28px] border border-border bg-card p-4 sm:p-6">
            <div className="relative min-h-[400px] overflow-hidden rounded-3xl">
              <Skeleton className="absolute inset-0 h-full w-full rounded-none opacity-60" />
              <PillarColorImage tone={data.tone} className="absolute right-8 top-8 h-40 w-40 opacity-90 sm:h-52 sm:w-52" priority />
              <div className="relative z-10 m-4 max-w-xl rounded-3xl bg-white/92 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.14)] sm:m-6 sm:p-8">
                <p className="inline-flex rounded-full border border-border bg-muted px-3 py-1 font-body text-[11px] font-semibold tracking-[0.14em] uppercase">
                  <EditableText path="content.hero.badge" fallback="Category Members" />
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[var(--hero-black)] sm:text-6xl">
                  <EditableText path="content.hero.title" fallback={data.label} />
                </h1>
                <p className="mt-4 font-serif text-base font-bold leading-7 text-[var(--hero-text)] sm:text-xl">
                  <EditableText path="content.hero.subtitle" fallback={data.subtitle} />
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-[#f6f3e8] py-14 sm:py-20">
        <Container className="space-y-8">
          <SectionHeader
            badgePath="content.team.badge"
            titlePath="content.team.title"
            descriptionPath="content.team.description"
            badge="Our Team"
            title="Meet The Team"
            description={`Members within ${data.label} who support this pathway with practical experience and care.`}
            maxWidth="wide"
          />

          {profileImages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {profileImages.map((_, index) => {
                const memberName = data.members[index] ?? `${data.label} Member ${index + 1}`;

                return (
                  <article key={`${data.label}-${index + 1}`} className="rounded-2xl border border-border bg-white p-5 text-center shadow-[0_12px_26px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-[0_16px_30px_rgba(15,23,42,0.12)]">
                    <PillarColorImage tone={data.tone} className="mx-auto h-16 w-16 rounded-full" sizes="64px" />
                    <h3 className="mt-3 font-display text-lg font-bold text-[var(--hero-black)]">
                      <EditableText path={`content.team.members.${index}.name`} fallback={memberName} />
                    </h3>
                    <p className="mt-1 font-serif text-sm font-bold text-[var(--hero-main)]">
                      <EditableText path={`content.team.members.${index}.subtitle`} fallback={data.subtitle} />
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white/60 p-6 text-center font-serif text-sm text-[var(--hero-text)]">
              No profile images found for this category yet.
            </div>
          )}
        </Container>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:scale-[1.005] hover:shadow-[0_16px_34px_rgba(12,35,54,0.10)] sm:p-8 lg:grid-cols-2">
            <div>
              <SectionHeader
                badgePath="content.insight.badge"
                titlePath="content.insight.title"
                descriptionPath="content.insight.description"
                badge="Team Insight"
                title="Collective Progress Starts with Support"
                description="Shared values and trusted relationships help each member move from challenge to stability."
              />
              <blockquote className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-[var(--hero-black)] sm:text-4xl">
                &quot;<EditableText path="content.insight.quote" fallback="When people feel seen and supported, collective progress becomes possible." />&quot;
              </blockquote>
            </div>
            <div className="flex h-[320px] w-full items-center justify-center rounded-2xl border border-border bg-muted/40">
              <PillarColorImage tone={data.tone} className="h-28 w-28" sizes="112px" />
            </div>
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}


