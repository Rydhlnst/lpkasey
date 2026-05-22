import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function HealingWellbeingProgrammePage() {
  return (
    <CmsPageShell slug="programmes-healing-wellbeing" fallbackContent={getDefaultCmsContentBySlug("programmes-healing-wellbeing")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase"><EditableText path="content.badge" fallback="Programme Detail" /></p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><EditableText path="content.title" fallback="Healing & Wellbeing" /></h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="This programme offers culturally grounded healing pathways through music, journaling, and bodywork modalities that support emotional regulation, restoration, and reconnection." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="Participants are guided in safe spaces where reflection and practical wellbeing habits are developed at a pace that respects personal context and lived experience." /></p>
          <div className="flex flex-wrap gap-4">
            <EditableLink path="content.cta1Link" fallback={{ label: "View related services", href: "/services" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
            <EditableLink path="content.cta2Link" fallback={{ label: "Enquire about this programme", href: "/contact" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}


