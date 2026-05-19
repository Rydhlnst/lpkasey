import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/constants/site";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { COMPANY_LINKS, SOCIAL_LINKS } from "@/constants/links";

const SOCIAL_LINK_ICONS = [FaFacebook, FaLinkedin, FaTwitter, FaInstagram] as const;

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--roof))] text-primary-foreground">
      <Container className="py-14">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              {/* <span className="font-display text-4xl font-semibold">{SITE_CONFIG.name}</span> */}
            </Link>
            <p className="max-w-sm font-body text-sm leading-7 text-white/90">{SITE_CONFIG.tagline}</p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.slice(0, SOCIAL_LINK_ICONS.length).map((item, index) => {
                const Icon = SOCIAL_LINK_ICONS[index];
                return (
                  <Link
                    key={`${item.href}-${index}`}
                    href={item.href}
                    aria-label={`External link ${index + 1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-white/10 text-white/90 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold">Quick Links</h3>
            <nav aria-label="Quick links" className="space-y-2 font-body text-sm text-white/65">
              {NAVIGATION_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} className="block transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-2xl font-semibold">Company</h3>
            <nav aria-label="Company links" className="space-y-2 font-body text-sm text-white/65">
              {COMPANY_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className="block transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="h-fit space-y-6 border-t-4 border-[hsl(var(--pillar-yellow))] bg-card p-6 text-card-foreground">
            <p className="font-display text-3xl font-semibold leading-tight">Have questions or want to get involved?</p>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-2 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center font-body text-sm text-white/65">
          <p>Copyright 2026 {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
