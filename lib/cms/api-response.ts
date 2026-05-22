import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function err(code: string, message: string, status: number, details?: unknown) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        details,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
    },
    { status },
  );
}

export function mapError(error: unknown) {
  const message = error instanceof Error ? error.message : "INTERNAL_ERROR";
  switch (message) {
    case "UNAUTHORIZED":
      return err("UNAUTHORIZED", "You are not logged in as admin.", 401);
    case "FORBIDDEN":
      return err("FORBIDDEN", "You do not have permission for this action.", 403);
    case "NOT_FOUND":
      return err("NOT_FOUND", "Page or revision was not found.", 404);
    case "CONFLICT_VERSION":
      return err("CONFLICT_VERSION", "Content was changed by another user. Please refresh first.", 409);
    case "UNSAFE_URL":
      return err("UNSAFE_URL", "Unsafe URL. Use https/http/mailto/tel only.", 422);
    case "CMS_DB_NOT_CONFIGURED":
      return err("CMS_DB_NOT_CONFIGURED", "DATABASE_URL is not configured for persistent CMS storage.", 500);
    case "R2_NOT_CONFIGURED":
      return err("R2_NOT_CONFIGURED", "Cloudflare R2 configuration is incomplete.", 500);
    case "MEDIA_TYPE_NOT_ALLOWED":
      return err("MEDIA_TYPE_NOT_ALLOWED", "Unsupported media format. Image: JPG/PNG/WEBP/GIF/SVG/AVIF, Video: MP4/WEBM/MOV.", 422);
    case "MEDIA_TOO_LARGE":
      return err("MEDIA_TOO_LARGE", "File size is too large. Max 10MB (image) / 60MB (video).", 422);
    case "INVALID_LIST_PATH":
      return err("INVALID_LIST_PATH", "Invalid list path.", 422);
    case "INVALID_LIST_INDEX":
      return err("INVALID_LIST_INDEX", "Invalid list index.", 422);
    case "INVALID_CONTENT_PATH":
      return err("INVALID_CONTENT_PATH", "Content path is not allowed for this page.", 422);
    case "INVALID_SCHEDULE_RANGE":
      return err("INVALID_SCHEDULE_RANGE", "Invalid publish/expiry schedule range.", 422);
    default:
      return err("INTERNAL_ERROR", "System error occurred.", 500, { message });
  }
}
