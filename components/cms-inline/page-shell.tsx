import { cmsService } from "@/lib/cms/service/cms-service";
import { cookies } from "next/headers";
import { CmsInlineProvider } from "@/components/cms-inline/provider-client";
import { CmsSaveBar } from "@/components/cms-inline/save-bar";
import { CMS_INLINE_MODE_COOKIE, isInlineModeEnabled } from "@/lib/cms/inline-mode";

type Props = {
  slug: string;
  fallbackContent: Record<string, unknown>;
  children: React.ReactNode;
};

export async function CmsPageShell({ slug, fallbackContent, children }: Props) {
  const page = await cmsService.getPageBySlug(slug);
  const content = page?.content ?? fallbackContent;
  const version = page?.currentVersion ?? 1;
  const cookieStore = await cookies();
  const inlineModeEnabled = isInlineModeEnabled(cookieStore.get(CMS_INLINE_MODE_COOKIE)?.value);

  return (
    <CmsInlineProvider
      pageSlug={slug}
      initialContent={content}
      initialVersion={version}
      initialEditMode={inlineModeEnabled}
    >
      {children}
      {inlineModeEnabled ? <CmsSaveBar /> : null}
    </CmsInlineProvider>
  );
}
