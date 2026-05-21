"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/constants/site";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { useCmsLinks } from "@/components/cms-inline/use-cms-links";

const SOCIAL_LINK_ICONS = [FaFacebook, FaLinkedin, FaTwitter, FaInstagram] as const;

export function Footer() {
  const { navbarItems, socialLinks, companyLinks } = useCmsLinks();

  return (
    <footer className="bg-[hsl(var(--roof))] text-primary-foreground">
      <Container className="py-14">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt={`${SITE_CONFIG.name} logo`} width={48} height={48} className="h-12 w-12 object-contain" />
            </Link>
            <p className="max-w-sm font-body text-sm leading-7 text-white/90">{SITE_CONFIG.tagline}</p>
            <div className="flex gap-2.5">
              {socialLinks.slice(0, SOCIAL_LINK_ICONS.length).map((_, index) => {
                const Icon = SOCIAL_LINK_ICONS[index];
                return (
                  <EditableLink
                    key={index}
                    path={`links.socialLinks.${index}`}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-white/10 text-white/90 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </EditableLink>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold">Quick Links</h3>
            <nav aria-label="Quick links" className="space-y-2 font-body text-sm text-white/65">
              {navbarItems.map((_, index) => (
                <EditableLink key={index} path={`links.navbarItems.${index}`} className="block transition-colors hover:text-white" />
              ))}
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-2xl font-semibold">Company</h3>
            <nav aria-label="Company links" className="space-y-2 font-body text-sm text-white/65">
              {companyLinks.map((_, index) => (
                <EditableLink key={index} path={`links.companyLinks.${index}`} className="block transition-colors hover:text-white" />
              ))}
            </nav>
          </div>

          <div className="h-fit space-y-6 border-t-4 border-[hsl(var(--pillar-yellow))] bg-card p-6 text-card-foreground">
            <p className="font-display text-3xl font-semibold leading-tight">Have questions or want to get involved?</p>
            <EditableLink
              path="links.navbarCta"
              className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-2 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center font-body text-sm text-white/65">
          <p>Copyright 2026 {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

