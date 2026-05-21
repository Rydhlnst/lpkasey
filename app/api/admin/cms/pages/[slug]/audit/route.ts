import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok, err } from "@/lib/cms/api-response";
import { auditQuerySchema } from "@/lib/cms/validation/schemas";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const url = new URL(request.url);
    const parsed = auditQuerySchema.safeParse({
      actor: url.searchParams.get("actor") ?? undefined,
      path: url.searchParams.get("path") ?? undefined,
      from: url.searchParams.get("from") ?? undefined,
      to: url.searchParams.get("to") ?? undefined,
    });

    if (!parsed.success) {
      return err("VALIDATION_ERROR", "Query audit tidak valid.", 422, parsed.error.flatten());
    }

    const items = await cmsService.auditBySlug(slug, parsed.data);
    return ok({ items });
  } catch (error) {
    return mapError(error);
  }
}
