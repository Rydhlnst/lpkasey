import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { Container } from "@/components/layout/container";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

export default function PrivacyPage() {
  return (
    <CmsPageShell slug="privacy" fallbackContent={getDefaultCmsContentBySlug("privacy")}>
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl space-y-6">
          <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
            <EditableText path="content.badge" fallback="Legal" />
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <EditableText path="content.title" fallback="Privacy Policy" />
          </h1>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.0" fallback="We respect your privacy and only collect information needed to respond to enquiries, coordinate programmes, and provide support services effectively." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.1" fallback="Personal information shared through forms, messages, or session coordination is handled with care and is not sold to third parties. Access is limited to relevant team members and trusted service providers." /></p>
          <p className="text-base leading-8 text-muted-foreground"><EditableText path="content.paragraphs.2" fallback="If you would like to request updates or removal of personal information, please contact us directly." /></p>
          <EditableLink path="content.ctaLink" fallback={{ label: "Request privacy support", href: "/contact" }} className="inline-flex text-sm font-semibold text-primary hover:underline" />
        </Container>
      </section>
    </CmsPageShell>
  );
}


