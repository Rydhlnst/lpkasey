import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { SOCIAL_LINKS } from "@/constants/links";
import { SITE_CONFIG } from "@/constants/site";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

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
    <section className="bg-muted/40 py-10 sm:py-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="space-y-6">
            <p className="inline-flex w-fit bg-muted px-3 py-1 font-body text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact us</h1>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Whether you are looking for healing, guidance, leadership development, cultural
              connection, emotional support, or a safe place to begin again, we welcome you to
              reach out.
            </p>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Te Pae O Te Rangi is a place where people can come to feel safe, supported, seen,
              and empowered.
            </p>
          </div>

          <div className="space-y-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">General enquiries</p>
                <p className="flex items-start gap-2 font-medium">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.contactEmail}</span>
                </p>
                <p className="flex items-start gap-2 font-medium">
                  <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.contactPhone}</span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="flex items-start gap-2 font-medium">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.contactAddress}</span>
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
                {CONTACT_REASONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-16">
          {SOCIAL_LINKS.slice(0, CONTACT_SOCIAL_ICONS.length).map((item, index) => {
            const Icon = CONTACT_SOCIAL_ICONS[index];
            return (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`External link ${index + 1}`}
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4" />
            </Link>
            );
          })}
        </div>
      </Container>

      <div className="mt-8 flex justify-end">
        <div className="h-128 w-[92vw] max-w-[860px] rounded-l-2xl">
          <Skeleton className="h-full w-full rounded-l-2xl rounded-r-none" />
        </div>
      </div>
    </section>
  );
}
