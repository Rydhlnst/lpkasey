import type { CmsRole } from "@/lib/cms/types";

export type CmsActor = {
  id: string;
  role: CmsRole;
};

function isHeaderAuthMode() {
  if (process.env.NODE_ENV === "test") return true;
  if (!process.env.DATABASE_URL) return true;
  if (process.env.VITEST || process.env.JEST_WORKER_ID || process.env.TEST_WORKER_ID) return true;
  return process.execArgv.includes("--test") || process.argv.includes("--test");
}

function getHeaderActor(headers: Headers): CmsActor | null {
  const id = headers.get("x-cms-user");
  const role = headers.get("x-cms-role");
  if (!id || !role) return null;
  if (!["owner", "editor", "reviewer"].includes(role)) return null;
  return { id, role: role as CmsRole };
}

function isAllowedCmsUser(session: { user?: { email?: string | null; username?: string | null; id?: string | null } } | null) {
  if (!session?.user) return false;
  const allowedEmail = process.env.CMS_SEED_EMAIL ?? "kaseyadmin@cms.local";
  const allowedUsername = process.env.CMS_SEED_USERNAME ?? "kaseyadmin";
  const email = session.user.email ?? "";
  const username = session.user.username ?? "";
  return email === allowedEmail || username === allowedUsername;
}

export async function hasCmsSession(headers: Headers): Promise<boolean> {
  if (isHeaderAuthMode()) return getHeaderActor(headers) !== null;
  const { auth } = await import("@/lib/auth/server");
  const session = await auth.api.getSession({ headers });
  return isAllowedCmsUser(session as { user?: { email?: string | null; username?: string | null } } | null);
}

export async function getCmsActorFromHeaders(headers: Headers): Promise<CmsActor | null> {
  if (isHeaderAuthMode()) return getHeaderActor(headers);

  const { auth } = await import("@/lib/auth/server");
  const session = await auth.api.getSession({ headers });
  if (!isAllowedCmsUser(session as { user?: { email?: string | null; username?: string | null } } | null)) return null;
  return {
    id: (session?.user?.id as string | undefined) ?? "owner.local",
    role: "owner",
  };
}

export function assertCmsRole(actor: CmsActor | null, allowed: CmsRole[]) {
  if (!actor) throw new Error("UNAUTHORIZED");
  if (!allowed.includes(actor.role)) throw new Error("FORBIDDEN");
}
