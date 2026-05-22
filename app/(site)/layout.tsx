import { cookies } from "next/headers";
import { headers } from "next/headers";
import { CmsInlineProvider } from "@/components/cms-inline/provider-client";
import { CmsInlineSessionProvider, CMS_CHROME_SCOPE_KEY } from "@/components/cms-inline/session-client";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CTASection } from "@/components/sections/cta-section";
import { GlobalScrollAnimations } from "@/components/uilayouts/global-scroll-animations";
import { hasCmsSession } from "@/lib/auth/cms-auth";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import { CMS_INLINE_MODE_COOKIE, isInlineModeEnabled } from "@/lib/cms/inline-mode";
import { cmsService } from "@/lib/cms/service/cms-service";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homePage = await cmsService.getPageBySlug("home");
  const homeContent = homePage?.content ?? getDefaultCmsContentBySlug("home");
  const homeVersion = homePage?.currentVersion ?? 1;
  const cookieStore = await cookies();
  const inlineModeEnabled = isInlineModeEnabled(cookieStore.get(CMS_INLINE_MODE_COOKIE)?.value);
  const isCmsUser = await hasCmsSession(await headers());
  const canEditInline = inlineModeEnabled && isCmsUser;

  return (
    <CmsInlineSessionProvider initialEditMode={canEditInline}>
      <CmsInlineProvider
        pageSlug="home"
        scopeKey={CMS_CHROME_SCOPE_KEY}
        initialContent={homeContent}
        initialVersion={homeVersion}
        initialEditMode={canEditInline}
      >
        <GlobalScrollAnimations />
        <Navbar />
        <main>{children}</main>
        <CTASection title="Always stay up-to-date. Join our Newsletter." />
        <Footer />
      </CmsInlineProvider>
    </CmsInlineSessionProvider>
  );
}
