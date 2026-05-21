import { mapError, ok } from "@/lib/cms/api-response";
import { cmsService } from "@/lib/cms/service/cms-service";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";

export async function GET(request: Request) {
  try {
    const actor = getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
    const items = await cmsService.listMediaAssets();
    return ok({ items });
  } catch (error) {
    return mapError(error);
  }
}
