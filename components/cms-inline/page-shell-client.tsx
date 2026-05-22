"use client";

import { CmsInlineProvider } from "@/components/cms-inline/provider-client";
import { CmsSaveBar } from "@/components/cms-inline/save-bar";

type CmsPageShellClientProps = {
  slug: string;
  initialContent: Record<string, unknown>;
  initialVersion: number;
  initialEditMode: boolean;
  showSaveBar: boolean;
  reuseParentProvider: boolean;
  children: React.ReactNode;
};

export function CmsPageShellClient({
  slug,
  initialContent,
  initialVersion,
  initialEditMode,
  showSaveBar,
  reuseParentProvider,
  children,
}: CmsPageShellClientProps) {
  if (reuseParentProvider) {
    return (
      <>
        {children}
        {initialEditMode && showSaveBar ? <CmsSaveBar /> : null}
      </>
    );
  }

  return (
    <CmsInlineProvider
      pageSlug={slug}
      scopeKey={`page-${slug}`}
      syncChromeOnSave
      initialContent={initialContent}
      initialVersion={initialVersion}
      initialEditMode={initialEditMode}
    >
      {children}
      {initialEditMode && showSaveBar ? <CmsSaveBar /> : null}
    </CmsInlineProvider>
  );
}

