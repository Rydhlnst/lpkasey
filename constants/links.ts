export interface SocialLinkItem {
  label: string;
  href: string;
}

export interface CompanyLinkItem {
  label: string;
  href: string;
}

export interface ProgrammeSummaryLinkItem {
  title: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  { label: "Facebook", href: "https://www.facebook.com/tepaeoterangi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/te-pae-o-te-rangi" },
  { label: "X", href: "https://x.com/tepaeoterangi" },
  { label: "Instagram", href: "https://www.instagram.com/tepaeoterangi" },
];

export const COMPANY_LINKS: CompanyLinkItem[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Preferences", href: "/cookie-preferences" },
];

export const PROGRAMME_SUMMARY_LINKS: ProgrammeSummaryLinkItem[] = [
  { title: "Leadership & Identity", href: "/programmes/leadership-identity" },
  { title: "Healing & Wellbeing", href: "/programmes/healing-wellbeing" },
  { title: "Community Support", href: "/programmes/community-support" },
  { title: "Cultural Frameworks", href: "/programmes/cultural-frameworks" },
];

