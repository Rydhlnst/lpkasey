import { NextResponse } from "next/server";
import { CMS_INLINE_MODE_COOKIE } from "@/lib/cms/inline-mode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const enabled = searchParams.get("enabled") === "1";
  const redirectTo = searchParams.get("redirectTo") || "/cms";

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set(CMS_INLINE_MODE_COOKIE, enabled ? "on" : "off", {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

