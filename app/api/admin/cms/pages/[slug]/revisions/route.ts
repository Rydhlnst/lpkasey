import { cmsService } from "@/lib/cms/service/cms-service";
import { mapError, ok } from "@/lib/cms/api-response";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const revisions = await cmsService.listRevisionsBySlug(slug);
    return ok({ items: revisions });
  } catch (error) {
    return mapError(error);
  }
}
