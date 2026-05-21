import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CTASection } from "@/components/sections/cta-section";
import { GlobalScrollAnimations } from "@/components/uilayouts/global-scroll-animations";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalScrollAnimations />
      <Navbar />
      <main>{children}</main>
      <CTASection title="Always stay up-to-date. Join our Newsletter." />
      <Footer />
    </>
  );
}
