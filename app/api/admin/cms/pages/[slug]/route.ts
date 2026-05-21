import { cmsService } from "@/lib/cms/service/cms-service";
import { getCmsActorFromHeaders, assertCmsRole } from "@/lib/auth/cms-auth";
import { mapError, ok, err } from "@/lib/cms/api-response";
import { cmsPatchSchema } from "@/lib/cms/validation/schemas";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const page = await cmsService.getPageBySlug(slug);
    if (!page) return err("NOT_FOUND", "Halaman tidak ditemukan.", 404);
    return ok({
      pageId: page.id,
      slug: page.slug,
      status: page.status,
      version: page.currentVersion,
      content: page.content,
      updatedAt: page.updatedAt,
      updatedBy: page.updatedBy,
    });
  } catch (error) {
    return mapError(error);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const actor = getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
    if (!actor) return err("UNAUTHORIZED", "Anda belum login sebagai admin.", 401);

    const payload = cmsPatchSchema.safeParse(await request.json());
    if (!payload.success) {
      return err("VALIDATION_ERROR", "Payload tidak valid.", 422, payload.error.flatten());
    }

    const { slug } = await context.params;
    const result = await cmsService.patchPageBySlug({
      slug,
      actorId: actor.id,
      expectedVersion: payload.data.expectedVersion,
      changes: payload.data.changes,
      message: payload.data.message,
    });

    if (result.skipped) {
      return ok({ skipped: true, reason: "NO_CHANGES" });
    }

    return ok({
      pageId: result.page.id,
      slug: result.page.slug,
      status: result.page.status,
      version: result.page.currentVersion,
      content: result.page.content,
      updatedAt: result.page.updatedAt,
      updatedBy: result.page.updatedBy,
      revisionId: result.revision?.id,
      changedPaths: result.revision?.changedPaths ?? [],
      operationSummary: result.operationSummary ?? [],
    });
  } catch (error) {
    return mapError(error);
  }
}
