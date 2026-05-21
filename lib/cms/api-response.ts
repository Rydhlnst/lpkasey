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
      return err("UNAUTHORIZED", "Anda belum login sebagai admin.", 401);
    case "FORBIDDEN":
      return err("FORBIDDEN", "Anda tidak punya izin untuk aksi ini.", 403);
    case "NOT_FOUND":
      return err("NOT_FOUND", "Halaman atau revisi tidak ditemukan.", 404);
    case "CONFLICT_VERSION":
      return err("CONFLICT_VERSION", "Konten berubah oleh user lain. Silakan refresh dahulu.", 409);
    case "UNSAFE_URL":
      return err("UNSAFE_URL", "URL tidak aman. Gunakan https/http/mailto/tel.", 422);
    case "R2_NOT_CONFIGURED":
      return err("R2_NOT_CONFIGURED", "Konfigurasi Cloudflare R2 belum lengkap.", 500);
    case "MEDIA_TYPE_NOT_ALLOWED":
      return err("MEDIA_TYPE_NOT_ALLOWED", "Format media tidak didukung. Image: JPG/PNG/WEBP, Video: MP4/WEBM/MOV.", 422);
    case "MEDIA_TOO_LARGE":
      return err("MEDIA_TOO_LARGE", "Ukuran file terlalu besar. Maksimal 10MB.", 422);
    case "INVALID_LIST_PATH":
      return err("INVALID_LIST_PATH", "Path list tidak valid.", 422);
    case "INVALID_LIST_INDEX":
      return err("INVALID_LIST_INDEX", "Index list tidak valid.", 422);
    case "INVALID_CONTENT_PATH":
      return err("INVALID_CONTENT_PATH", "Path konten tidak diizinkan untuk halaman ini.", 422);
    default:
      return err("INTERNAL_ERROR", "Terjadi kesalahan sistem.", 500, { message });
  }
}
