import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import { ServicesPageClient } from "./services-page-client";

export default function ServicesPage() {
  return (
    <CmsPageShell slug="services" fallbackContent={getDefaultCmsContentBySlug("services")}>
      <ServicesPageClient />
    </CmsPageShell>
  );
}


