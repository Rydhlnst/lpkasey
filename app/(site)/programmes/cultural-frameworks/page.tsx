import Link from "next/link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function CulturalFrameworksProgrammePage() {
  return (
    <CmsPageShell slug="programmes-cultural-frameworks" fallbackContent={getDefaultCmsContentBySlug("programmes-cultural-frameworks")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase"><EditableText path="content.badge" fallback="Programme Detail" /></p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><EditableText path="content.title" fallback="Cultural Frameworks" /></h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="This pathway explains how Te Whiringawha, Kauae Runga, Kauae Raro, and Tau guide leadership, decision making, and wellbeing practices across personal and community contexts." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="Participants gain practical language and structure to reflect on behavior, relationships, and growth while keeping identity and values at the center." /></p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="inline-flex text-sm font-semibold text-primary hover:underline"><EditableText path="content.cta1" fallback="Explore framework context" /></Link>
            <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline"><EditableText path="content.cta2" fallback="Enquire about this programme" /></Link>
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}
