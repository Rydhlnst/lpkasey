import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok } from "@/lib/cms/api-response";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const actor = await getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
    const { slug } = await context.params;
    const revisions = await cmsService.listRevisionsBySlug(slug);
    return ok({ items: revisions });
  } catch (error) {
    return mapError(error);
  }
}
