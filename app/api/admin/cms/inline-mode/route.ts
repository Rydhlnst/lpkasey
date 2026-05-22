import { NextResponse } from "next/server";
import { CMS_INLINE_MODE_COOKIE } from "@/lib/cms/inline-mode";
import { assertCmsRole, getCmsActorFromHeaders } from "@/lib/auth/cms-auth";
import { err } from "@/lib/cms/api-response";

export async function GET(request: Request) {
  const actor = await getCmsActorFromHeaders(request.headers);
  try {
    assertCmsRole(actor, ["owner", "editor", "reviewer"]);
  } catch {
    return err("UNAUTHORIZED", "You are not logged in as admin.", 401);
  }

  const { searchParams } = new URL(request.url);
  const enabled = searchParams.get("enabled") === "1";
  const redirectToRaw = searchParams.get("redirectTo") || "/cms";
  const redirectTo = redirectToRaw.startsWith("/") && !redirectToRaw.startsWith("//")
    ? redirectToRaw
    : "/cms";
  const isSecure = process.env.NODE_ENV === "production" || new URL(request.url).protocol === "https:";

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set(CMS_INLINE_MODE_COOKIE, enabled ? "on" : "off", {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
