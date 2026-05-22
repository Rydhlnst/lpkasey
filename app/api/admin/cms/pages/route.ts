import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok } from "@/lib/cms/api-response";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";

export async function GET(request: Request) {
  try {
    const actor = await getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
    const pages = await cmsService.listPages();
    return ok({ items: pages.map((p) => ({ slug: p.slug, title: p.title, status: p.status, version: p.currentVersion, updatedAt: p.updatedAt })) });
  } catch (error) {
    return mapError(error);
  }
}
