import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok, err } from "@/lib/cms/api-response";
import { auditQuerySchema } from "@/lib/cms/validation/schemas";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const actor = await getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
    const { slug } = await context.params;
    const url = new URL(request.url);
    const parsed = auditQuerySchema.safeParse({
      actor: url.searchParams.get("actor") ?? undefined,
      path: url.searchParams.get("path") ?? undefined,
      from: url.searchParams.get("from") ?? undefined,
      to: url.searchParams.get("to") ?? undefined,
    });

    if (!parsed.success) {
      return err("VALIDATION_ERROR", "Invalid audit query.", 422, parsed.error.flatten());
    }

    const items = await cmsService.auditBySlug(slug, parsed.data);
    return ok({ items });
  } catch (error) {
    return mapError(error);
  }
}
