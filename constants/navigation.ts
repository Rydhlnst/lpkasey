export interface NavigationItem {
  label: string;
  href: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Community Support", href: "/community-support" },
  { label: "Contact", href: "/contact" },
];

export const NAVBAR_CTA: NavigationItem = {
  label: "Book a Session",
  href: "/contact",
};
