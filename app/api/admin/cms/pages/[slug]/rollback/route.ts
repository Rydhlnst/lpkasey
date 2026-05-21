import { cmsService } from "@/lib/cms/service/cms-service";
import { getCmsActorFromHeaders, assertCmsRole } from "@/lib/auth/cms-auth";
import { mapError, ok, err } from "@/lib/cms/api-response";
import { rollbackSchema } from "@/lib/cms/validation/schemas";

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const actor = getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "reviewer"]);
    if (!actor) return err("UNAUTHORIZED", "Anda belum login sebagai admin.", 401);

    const payload = rollbackSchema.safeParse(await request.json());
    if (!payload.success) {
      return err("VALIDATION_ERROR", "Payload rollback tidak valid.", 422, payload.error.flatten());
    }

    const { slug } = await context.params;
    const result = await cmsService.rollbackBySlug({
      slug,
      actorId: actor.id,
      revisionId: payload.data.revisionId,
      reason: payload.data.reason,
    });

    return ok({
      pageId: result.page.id,
      slug: result.page.slug,
      status: result.page.status,
      version: result.page.currentVersion,
      revisionId: result.revision.id,
    });
  } catch (error) {
    return mapError(error);
  }
}
