import type { CmsRole } from "@/lib/cms/types";

export type CmsActor = {
  id: string;
  role: CmsRole;
};

export function getCmsActorFromHeaders(headers: Headers): CmsActor | null {
  const id = headers.get("x-cms-user") ?? "owner.local";
  const role = (headers.get("x-cms-role") ?? "owner") as CmsRole;
  if (!["owner", "editor", "reviewer"].includes(role)) return null;
  return { id, role };
}

export function assertCmsRole(actor: CmsActor | null, allowed: CmsRole[]) {
  if (!actor) throw new Error("UNAUTHORIZED");
  if (!allowed.includes(actor.role)) throw new Error("FORBIDDEN");
}
