import Link from "next/link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function CookiePreferencesPage() {
  return (
    <CmsPageShell slug="cookie-preferences" fallbackContent={getDefaultCmsContentBySlug("cookie-preferences")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase"><EditableText path="content.badge" fallback="Legal" /></p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><EditableText path="content.title" fallback="Cookie Preferences" /></h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="Cookie preferences help you control how this website remembers session settings and measures general performance. You can adjust browser-level controls at any time." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="Essential cookies may remain active to support core website functionality. Optional analytics or experience cookies can be limited through your device and browser settings." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.2" fallback="If you need help understanding available options, our team can guide you." /></p>
          <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline"><EditableText path="content.cta" fallback="Ask about cookie settings" /></Link>
        </Container>
      </section>
    </CmsPageShell>
  );
}
