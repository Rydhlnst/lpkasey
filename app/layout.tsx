import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CTASection } from "@/components/sections/cta-section";
import { GlobalScrollAnimations } from "@/components/uilayouts/global-scroll-animations";
import { SITE_CONFIG } from "@/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <GlobalScrollAnimations />
        <Navbar />
        <main>{children}</main>
        <CTASection title="Always stay up-to-date. Join our Newsletter." />
        <Footer />
      </body>
    </html>
  );
}
