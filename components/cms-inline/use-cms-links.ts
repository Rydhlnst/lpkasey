"use client";

import { NAVBAR_CTA, NAVIGATION_ITEMS } from "@/constants/navigation";
import { COMPANY_LINKS, PROGRAMME_SUMMARY_LINKS, SOCIAL_LINKS } from "@/constants/links";
import { useCmsInline } from "@/components/cms-inline/provider-client";

export type CmsLinkItem = { label?: string; title?: string; href: string; newTab?: boolean };

export function useCmsLinks() {
  const { getField } = useCmsInline();
  const navbarItems = (getField("links.navbarItems") as CmsLinkItem[] | undefined) ?? NAVIGATION_ITEMS;
  const navbarCta =
    (getField("links.navbarCta") as CmsLinkItem | undefined) ?? ({ label: NAVBAR_CTA.label, href: NAVBAR_CTA.href } as CmsLinkItem);
  const socialLinks = (getField("links.socialLinks") as CmsLinkItem[] | undefined) ?? SOCIAL_LINKS;
  const companyLinks = (getField("links.companyLinks") as CmsLinkItem[] | undefined) ?? COMPANY_LINKS;
  const programmeSummaryLinks =
    (getField("links.programmeSummaryLinks") as CmsLinkItem[] | undefined) ?? PROGRAMME_SUMMARY_LINKS;

  return { navbarItems, navbarCta, socialLinks, companyLinks, programmeSummaryLinks };
}
