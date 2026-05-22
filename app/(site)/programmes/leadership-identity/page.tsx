import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function LeadershipIdentityProgrammePage() {
  return (
    <CmsPageShell slug="programmes-leadership-identity" fallbackContent={getDefaultCmsContentBySlug("programmes-leadership-identity")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase"><EditableText path="content.badge" fallback="Programme Detail" /></p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><EditableText path="content.title" fallback="Leadership & Identity" /></h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="This pathway supports rangatahi and whanau to strengthen confidence, direction, and identity through kaupapa Maori leadership practices and practical development experiences." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="Activities include structured mentoring, cultural grounding, and challenge-based learning to build resilience, communication, and accountability in daily life." /></p>
          <div className="flex flex-wrap gap-4">
            <EditableLink path="content.cta1Link" fallback={{ label: "View related services", href: "/services" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
            <EditableLink path="content.cta2Link" fallback={{ label: "Enquire about this programme", href: "/contact" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}


