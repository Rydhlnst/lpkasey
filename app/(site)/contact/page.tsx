import { Mail, MapPin, PhoneCall } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { SOCIAL_LINKS } from "@/constants/links";
import { SITE_CONFIG } from "@/constants/site";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

const CONTACT_REASONS = [
  "Book a Romiromi / Mirimiri session",
  "Join a programme",
  "Ask about support groups",
  "Enquire about rangatahi leadership initiatives",
  "Learn more about our kaupapa",
  "Connect with our team",
];

const CONTACT_SOCIAL_ICONS = [FaFacebook, FaInstagram, FaTwitter] as const;

export default function ContactPage() {
  return (
    <CmsPageShell slug="contact" fallbackContent={getDefaultCmsContentBySlug("contact")}>
    <section className="bg-muted/40 py-10 sm:py-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="space-y-6">
            <p className="inline-flex w-fit bg-muted px-3 py-1 font-body text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              <EditableText path="home.contact.label" fallback="Contact" />
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <EditableText path="home.contact.title" fallback="Contact us" />
            </h1>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              <EditableText
                path="home.contact.intro1"
                fallback="Whether you are looking for healing, guidance, leadership development, cultural connection, emotional support, or a safe place to begin again, we welcome you to reach out."
              />
            </p>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              <EditableText
                path="home.contact.intro2"
                fallback="Te Pae O Te Rangi is a place where people can come to feel safe, supported, seen, and empowered."
              />
            </p>
          </div>

          <div className="space-y-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <EditableText path="home.contact.generalEnquiriesLabel" fallback="General enquiries" />
                </p>
                <p className="flex items-start gap-2 font-medium">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <EditableText path="home.contact.email" fallback={SITE_CONFIG.contactEmail} />
                  </span>
                </p>
                <p className="flex items-start gap-2 font-medium">
                  <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <EditableText path="home.contact.phone" fallback={SITE_CONFIG.contactPhone} />
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <EditableText path="home.contact.addressLabel" fallback="Address" />
                </p>
                <p className="flex items-start gap-2 font-medium">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <EditableText path="home.contact.address" fallback={SITE_CONFIG.contactAddress} />
                  </span>
                </p>
              </div>
            </div>

            <div>
              <SectionHeader
                badge="Contact Purpose"
                title="You can contact us to"
                description="Choose the reason that best matches your needs and our team will guide you from there."
                className="max-w-2xl"
              />
              <ul className="mt-3 space-y-2 text-sm font-medium">
                {CONTACT_REASONS.map((item, index) => (
                  <li key={item}>
                    <EditableText path={`home.contact.reasons.${index}`} fallback={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-16">
          {SOCIAL_LINKS.slice(0, CONTACT_SOCIAL_ICONS.length).map((item, index) => {
            const Icon = CONTACT_SOCIAL_ICONS[index];
            return (
            <EditableLink
              key={`${item.href}-${index}`}
              path={`home.contact.socialLinks.${index}`}
              fallback={{ label: `External link ${index + 1}`, href: item.href, newTab: true }}
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4" />
            </EditableLink>
            );
          })}
        </div>
      </Container>

      <div className="mt-8 flex justify-end">
        <div className="w-[92vw] max-w-[1100px] overflow-hidden rounded-l-2xl border border-border/40 bg-background">
          <div className="grid min-h-[520px] md:grid-cols-[0.95fr_1.45fr]">
            <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                <EditableText path="home.contact.locationDetailsLabel" fallback="Location details" />
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                <EditableText path="home.contact.locationDetailsTitle" fallback="Find us here" />
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <EditableText
                  path="home.contact.locationDetailsBody1"
                  fallback="Use this space to add directions, nearby landmarks, parking notes, and accessibility guidance for visitors."
                />
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <EditableText path="home.contact.locationDetailsBody2" fallback={SITE_CONFIG.contactAddress} />
              </p>
            </div>
            <div className="min-h-[280px]">
              <EditableMedia path="home.contact.mediaMap" type="image" emptyLabel="Map image" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </CmsPageShell>
  );
}




