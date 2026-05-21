import { mapError, ok, err } from "@/lib/cms/api-response";
import { cmsService } from "@/lib/cms/service/cms-service";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";
import { assertMediaFileRules, mediaUploadSchema } from "@/lib/cms/validation/schemas";
import { uploadImageToR2 } from "@/lib/cms/media/r2-storage";

function extensionFromMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/webm") return "webm";
  if (mime === "video/quicktime") return "mov";
  return "bin";
}

export async function POST(request: Request) {
  try {
    const actor = getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor"]);
    if (!actor) return err("UNAUTHORIZED", "Anda belum login sebagai admin.", 401);

    const form = await request.formData();
    const fileCandidate = form.get("file");
    const altTextCandidate = form.get("altText");
    const mediaTypeCandidate = form.get("mediaType");

    if (!(fileCandidate instanceof File)) {
      return err("VALIDATION_ERROR", "File wajib diisi.", 422);
    }

    const parsedMeta = mediaUploadSchema.safeParse({
      mediaType: typeof mediaTypeCandidate === "string" ? mediaTypeCandidate : "image",
      altText: typeof altTextCandidate === "string" ? altTextCandidate : "",
    });
    if (!parsedMeta.success) {
      return err("VALIDATION_ERROR", "Alt text tidak valid.", 422, parsedMeta.error.flatten());
    }

    assertMediaFileRules(fileCandidate, parsedMeta.data.mediaType);

    const ext = extensionFromMime(fileCandidate.type);
    const key = `cms/${parsedMeta.data.mediaType}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
    const buffer = new Uint8Array(await fileCandidate.arrayBuffer());
    const url = await uploadImageToR2({
      key,
      body: buffer,
      contentType: fileCandidate.type,
    });

    const asset = await cmsService.createMediaAsset({
      key,
      url,
      mime: fileCandidate.type,
      sizeBytes: fileCandidate.size,
      altText: parsedMeta.data.altText,
      createdBy: actor.id,
    });

    return ok({ asset }, 201);
  } catch (error) {
    return mapError(error);
  }
}
