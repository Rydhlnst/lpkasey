"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { useCmsLinks } from "@/components/cms-inline/use-cms-links";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/constants/site";

export function Footer() {
  const { navbarItems, companyLinks, socialLinks } = useCmsLinks();
  const socialIcons = [FaFacebook, FaLinkedin, FaTwitter, FaInstagram];

  return (
    <footer className="bg-roof text-primary-foreground">
      <Container className="py-14 md:w-[90%]">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="space-y-5">
            <EditableLink path="links.brandLogo" fallback={{ label: "Home", href: "/" }} className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              {/* <span className="font-display text-4xl font-semibold">{SITE_CONFIG.name}</span> */}
            </EditableLink>
            <p className="max-w-sm font-body text-sm leading-7 text-white/90">
              <EditableText path="home.footer.tagline" fallback={SITE_CONFIG.tagline} />
            </p>
            <div className="flex gap-2.5">
              {socialLinks.slice(0, socialIcons.length).map((item, index) => {
                const Icon = socialIcons[index]!;
                return (
                  <EditableLink
                    key={`${item.href}-${index}`}
                    path={`links.socialLinks.${index}`}
                    fallback={{ label: item.label ?? `Social ${index + 1}`, href: item.href, newTab: true }}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-white/10 text-white/90 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </EditableLink>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold"><EditableText path="home.footer.quickLinksTitle" fallback="Quick Links" /></h3>
            <nav aria-label="Quick links" className="space-y-2 font-body text-sm text-white/65">
              {navbarItems.map((item, index) => (
                <EditableLink key={`${item.href}-${index}`} path={`links.navbarItems.${index}`} className="block transition-colors hover:text-white" />
              ))}
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-2xl font-semibold"><EditableText path="home.footer.companyTitle" fallback="Company" /></h3>
            <nav aria-label="Company links" className="space-y-2 font-body text-sm text-white/65">
              {companyLinks.map((item, index) => (
                <EditableLink key={`${item.href}-${index}`} path={`links.companyLinks.${index}`} className="block transition-colors hover:text-white" />
              ))}
            </nav>
          </div>

          <div className="h-fit space-y-6 border-t-4 border-[hsl(var(--pillar-yellow))] bg-card p-6 text-card-foreground">
            <p className="font-display text-3xl font-semibold leading-tight">
              <EditableText path="home.footer.ctaText" fallback="Have questions or want to get involved?" />
            </p>
            <EditableLink
              path="links.navbarCta"
              fallback={{ label: "Contact us", href: "/contact" }}
              className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-2 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center font-body text-sm text-white/65">
          <p><EditableText path="home.footer.copyright" fallback={`Copyright 2026 ${SITE_CONFIG.name}. All rights reserved.`} /></p>
        </div>
      </Container>
    </footer>
  );
}
