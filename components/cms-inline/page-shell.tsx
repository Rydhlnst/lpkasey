import { cmsService } from "@/lib/cms/service/cms-service";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { CmsPageShellClient } from "@/components/cms-inline/page-shell-client";
import { CMS_INLINE_MODE_COOKIE, isInlineModeEnabled } from "@/lib/cms/inline-mode";
import { hasCmsSession } from "@/lib/auth/cms-auth";

type Props = {
  slug: string;
  fallbackContent: Record<string, unknown>;
  children: React.ReactNode;
  showSaveBar?: boolean;
};

export async function CmsPageShell({ slug, fallbackContent, children, showSaveBar = true }: Props) {
  let page: Awaited<ReturnType<typeof cmsService.getPageBySlug>> = null;
  let pageLoadFailed = false;
  try {
    page = await cmsService.getPageBySlug(slug);
  } catch (error) {
    pageLoadFailed = true;
    console.error(`[CMS] Failed to load page "${slug}", using fallback content.`, error);
  }
  const content = page?.content ?? fallbackContent;
  const version = page?.currentVersion ?? 1;
  const cookieStore = await cookies();
  const inlineModeEnabled = isInlineModeEnabled(cookieStore.get(CMS_INLINE_MODE_COOKIE)?.value);
  const isCmsUser = await hasCmsSession(await headers());
  const canEditInline = inlineModeEnabled && isCmsUser && !pageLoadFailed;
  const reuseParentProvider = slug === "home";

  return (
    <CmsPageShellClient
      slug={slug}
      initialContent={content}
      initialVersion={version}
      initialEditMode={canEditInline}
      showSaveBar={showSaveBar}
      reuseParentProvider={reuseParentProvider}
    >
      {children}
    </CmsPageShellClient>
  );
}
