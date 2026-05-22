import { NextResponse } from "next/server";
import { getObjectFromR2 } from "@/lib/cms/media/r2-storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key")?.trim();

    if (!key) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Missing media key." } },
        { status: 400 },
      );
    }

    const object = await getObjectFromR2(key);
    if (!object.body) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Media asset was not found." } },
        { status: 404 },
      );
    }

    const arrayBuffer = object.body.buffer.slice(
      object.body.byteOffset,
      object.body.byteOffset + object.body.byteLength,
    ) as ArrayBuffer;

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": object.contentType,
        "Cache-Control": object.cacheControl,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: "MEDIA_FETCH_FAILED", message: "Failed to load media asset." } },
      { status: 502 },
    );
  }
}
