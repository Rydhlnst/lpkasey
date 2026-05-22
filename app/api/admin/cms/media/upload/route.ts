import { mapError, ok, err } from "@/lib/cms/api-response";
import { cmsService } from "@/lib/cms/service/cms-service";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";
import { assertMediaFileRules, mediaUploadSchema } from "@/lib/cms/validation/schemas";
import { uploadImageToR2 } from "@/lib/cms/media/r2-storage";

function extensionFromMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/jpg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/svg+xml") return "svg";
  if (mime === "image/avif") return "avif";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/webm") return "webm";
  if (mime === "video/quicktime") return "mov";
  return "bin";
}

function resolveUploader() {
  const injected = (globalThis as { __CMS_UPLOAD_OBJECT__?: typeof uploadImageToR2 }).__CMS_UPLOAD_OBJECT__;
  return injected ?? uploadImageToR2;
}

export async function POST(request: Request) {
  try {
    const actor = await getCmsActorFromHeaders(request.headers);
    assertCmsRole(actor, ["owner", "editor"]);
    if (!actor) return err("UNAUTHORIZED", "You are not logged in as admin.", 401);

    const form = await request.formData();
    const fileCandidate = form.get("file");
    const altTextCandidate = form.get("altText");
    const mediaTypeCandidate = form.get("mediaType");

    if (!(fileCandidate instanceof File)) {
      return err("VALIDATION_ERROR", "File is required.", 422);
    }

    const parsedMeta = mediaUploadSchema.safeParse({
      mediaType: typeof mediaTypeCandidate === "string" ? mediaTypeCandidate : "image",
      altText: typeof altTextCandidate === "string" ? altTextCandidate : "",
    });
    if (!parsedMeta.success) {
      return err("VALIDATION_ERROR", "Invalid alt text.", 422, parsedMeta.error.flatten());
    }

    assertMediaFileRules(fileCandidate, parsedMeta.data.mediaType);

    const ext = extensionFromMime(fileCandidate.type);
    const key = `cms/${parsedMeta.data.mediaType}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
    const buffer = new Uint8Array(await fileCandidate.arrayBuffer());
    const url = await resolveUploader()({
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
