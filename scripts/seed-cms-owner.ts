import { loadEnvFromRoot } from "@/scripts/load-env";
import { ensureCmsDefaultOwnerSeed } from "@/lib/auth/server";
import { getCmsDb } from "@/lib/cms/db/client";
import { authUsers } from "@/lib/cms/db/schema/auth";
import { eq } from "drizzle-orm";

async function main() {
  loadEnvFromRoot();
  await ensureCmsDefaultOwnerSeed();
  const db = getCmsDb();
  if (!db) {
    throw new Error("CMS_DB_NOT_CONFIGURED");
  }
  const email = process.env.CMS_SEED_EMAIL ?? "kasey123@cms.local";
  const user = await db
    .select({ id: authUsers.id, email: authUsers.email, username: authUsers.username })
    .from(authUsers)
    .where(eq(authUsers.email, email))
    .limit(1);
  if (!user[0]) {
    throw new Error("CMS_OWNER_NOT_FOUND_AFTER_SEED");
  }
  if (!user[0].username) {
    throw new Error("CMS_OWNER_USERNAME_NOT_SET");
  }
  // eslint-disable-next-line no-console
  console.log("cms-owner-seed-ok", {
    email: user[0].email,
    username: user[0].username,
  });
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("cms-owner-seed-failed", error);
  process.exit(1);
});
