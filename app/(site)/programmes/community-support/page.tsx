import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function CommunitySupportProgrammePage() {
  return (
    <CmsPageShell slug="programmes-community-support" fallbackContent={getDefaultCmsContentBySlug("programmes-community-support")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase"><EditableText path="content.badge" fallback="Programme Detail" /></p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><EditableText path="content.title" fallback="Community Support" /></h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="Community Support connects individuals, whanau, and groups with trusted spaces for conversation, accountability, and practical guidance during difficult seasons." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="The focus is on restoring belonging, reducing isolation, and creating sustainable support networks through consistent group care and culturally safe facilitation." /></p>
          <div className="flex flex-wrap gap-4">
            <EditableLink path="content.cta1Link" fallback={{ label: "Explore community support page", href: "/community-support" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
            <EditableLink path="content.cta2Link" fallback={{ label: "Enquire about this programme", href: "/contact" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}


