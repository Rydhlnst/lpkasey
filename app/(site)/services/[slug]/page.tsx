import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { SERVICES, getServiceBySlug, getServiceDetailSlug } from "@/constants/services";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import { AdaptiveEditableMedia } from "../_components/adaptive-editable-media";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const pageSlug = getServiceDetailSlug(slug);
  const hasKeyPoints = (service.keyPoints?.length ?? 0) > 0;
  const hasOutcomes = (service.outcomes?.length ?? 0) > 0;
  const hasSchedule = Boolean(service.schedule);
  const hasLocation = Boolean(service.location);

  return (
    <CmsPageShell slug={pageSlug} fallbackContent={getDefaultCmsContentBySlug(pageSlug)}>
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="space-y-8">
          <div className="space-y-4">
            <p className="inline-flex w-fit bg-muted px-3 py-1 font-body text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              <EditableText path="content.badge" fallback={service.badge} />
            </p>
            <h1 className="max-w-5xl font-display text-4xl leading-tight font-bold text-[var(--hero-black)] sm:text-5xl">
              <EditableText path="content.title" fallback={service.title} />
            </h1>
            <p className="max-w-4xl font-serif text-lg leading-8 text-[var(--hero-text)]">
              <EditableText path="content.summary" fallback={service.summary} />
            </p>
          </div>

          <AdaptiveEditableMedia
            path="content.mediaHero"
            emptyLabel={service.placeholderLabel}
            className="w-full rounded-none border border-border"
            unknownClassName="aspect-[16/8]"
            landscapeClassName="aspect-[16/8]"
            portraitClassName="aspect-[4/5]"
            squareClassName="aspect-square"
          />
        </Container>
      </section>

      <section className="border-b border-border bg-muted/20 py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
          <div className="space-y-4">
            {service.description.map((paragraph, index) => (
              <p key={`${service.slug}-paragraph-${index}`} className="font-serif text-base leading-8 text-[var(--hero-text)]">
                <EditableText path={`content.paragraphs.${index}`} fallback={paragraph} />
              </p>
            ))}
          </div>

          {(hasSchedule || hasLocation) ? (
            <aside className="space-y-4 rounded-2xl border border-border bg-card p-5">
              {hasSchedule ? (
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    <EditableText path="content.scheduleLabel" fallback="Schedule" />
                  </p>
                  <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
                    <EditableText path="content.schedule" fallback={service.schedule ?? ""} />
                  </p>
                </div>
              ) : null}

              {hasLocation ? (
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    <EditableText path="content.locationLabel" fallback="Location" />
                  </p>
                  <p className="font-serif text-base leading-7 text-[var(--hero-text)]">
                    <EditableText path="content.location" fallback={service.location ?? ""} />
                  </p>
                </div>
              ) : null}
            </aside>
          ) : null}
        </Container>
      </section>

      {(hasKeyPoints || hasOutcomes) ? (
        <section className="border-b border-border py-16 sm:py-20">
          <Container className="space-y-10">
            {hasKeyPoints ? (
              <div className="space-y-4">
                <SectionHeader
                  badge="Service Focus"
                  titlePath="content.keyPointsTitle"
                  title="Key Focus Areas"
                  description="Practical elements that shape this service pathway."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.keyPoints?.map((item, index) => (
                    <p key={`${service.slug}-focus-${index}`} className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-6 text-[var(--hero-text)]">
                      <EditableText path={`content.keyPoints.${index}`} fallback={item} />
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {hasOutcomes ? (
              <div className="space-y-4">
                <SectionHeader
                  badge="Expected Results"
                  titlePath="content.outcomesTitle"
                  title="Expected Outcomes"
                  description="What participants can expect to build through consistent engagement."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.outcomes?.map((item, index) => (
                    <p key={`${service.slug}-outcome-${index}`} className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-6 text-[var(--hero-text)]">
                      <EditableText path={`content.outcomes.${index}`} fallback={item} />
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader
              badge="Next Step"
              title="Ready to Continue This Pathway?"
              description="Reach out for support, programme fit, and next available options."
              className="max-w-3xl"
            />
            <div className="flex flex-wrap gap-3">
              <EditableLink
                path="content.ctaPrimaryLink"
                fallback={{ label: service.ctaLabel, href: service.ctaHref ?? "/contact" }}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <EditableText path="content.ctaPrimary" fallback={service.ctaLabel} />
              </EditableLink>
              <EditableLink
                path="content.ctaSecondaryLink"
                fallback={{ label: "Back to Services", href: "/services" }}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-[var(--hero-black)] transition hover:bg-muted/60"
              >
                <EditableText path="content.ctaSecondary" fallback="Back to Services" />
              </EditableLink>
            </div>
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}
