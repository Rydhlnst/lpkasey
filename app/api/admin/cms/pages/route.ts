import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok } from "@/lib/cms/api-response";

export async function GET() {
  try {
    const pages = await cmsService.listPages();
    return ok({ items: pages.map((p) => ({ slug: p.slug, title: p.title, status: p.status, version: p.currentVersion, updatedAt: p.updatedAt })) });
  } catch (error) {
    return mapError(error);
  }
}
