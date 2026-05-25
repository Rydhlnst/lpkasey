import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { APIError } from "better-auth/api";
import { getCmsDb } from "@/lib/cms/db/client";
import { authAccounts, authSessions, authUsers, authVerifications } from "@/lib/cms/db/schema/auth";

let authInstance: ReturnType<typeof betterAuth> | null = null;

function createAuthInstance() {
  const db = getCmsDb();
  if (!db) return null;
  const authBaseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const trustedOrigins =
    process.env.NODE_ENV === "production"
      ? [authBaseUrl]
      : Array.from(
          new Set([
            authBaseUrl,
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:3003",
          ]),
        );

  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET ?? "dev-better-auth-secret-change-me",
    baseURL: authBaseUrl,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: authUsers,
        session: authSessions,
        account: authAccounts,
        verification: authVerifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
    },
    plugins: [username()],
    trustedOrigins,
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const allowedEmail = process.env.CMS_SEED_EMAIL ?? "kaseyadmin@cms.local";
            const allowedUsername = process.env.CMS_SEED_USERNAME ?? "kaseyadmin";
            if (user.email !== allowedEmail && user.username !== allowedUsername) {
              throw new APIError("BAD_REQUEST", { message: "Signup is disabled" });
            }
            return { data: user };
          },
        },
      },
    },
  });
}

function getAuthInstance() {
  if (authInstance) return authInstance;
  authInstance = createAuthInstance() as ReturnType<typeof betterAuth> | null;
  if (!authInstance) throw new Error("CMS_DB_NOT_CONFIGURED");
  return authInstance;
}

export const auth = getAuthInstance();

export async function ensureCmsDefaultOwnerSeed() {
  const db = getCmsDb();
  if (!db) return;

  const seedUsername = process.env.CMS_SEED_USERNAME ?? "kaseyadmin";
  const seedPassword = process.env.CMS_SEED_PASSWORD ?? "kaseyadmin123";
  const seedEmail = process.env.CMS_SEED_EMAIL ?? "kaseyadmin@cms.local";
  const seedName = process.env.CMS_SEED_NAME ?? "Kasey Owner";

  const existingRows = await db
    .select({ id: authUsers.id, username: authUsers.username })
    .from(authUsers)
    .where(eq(authUsers.email, seedEmail))
    .limit(1);
  const existing = existingRows[0];
  if (existing) {
    if (!existing.username) {
      await db
        .update(authUsers)
        .set({
          username: seedUsername,
          displayUsername: seedUsername,
        })
        .where(eq(authUsers.id, existing.id));
    }
    return;
  }

  try {
    await getAuthInstance().api.signUpEmail({
      body: {
        email: seedEmail,
        password: seedPassword,
        name: seedName,
      },
    });
    await db
      .update(authUsers)
      .set({
        username: seedUsername,
        displayUsername: seedUsername,
      })
      .where(eq(authUsers.email, seedEmail));
  } catch {
    const seededRows = await db
      .select({ id: authUsers.id, username: authUsers.username })
      .from(authUsers)
      .where(eq(authUsers.email, seedEmail))
      .limit(1);
    const seeded = seededRows[0];
    if (!seeded) {
      throw new Error("CMS_OWNER_SEED_FAILED");
    }
    if (!seeded.username) {
      await db
        .update(authUsers)
        .set({
          username: seedUsername,
          displayUsername: seedUsername,
        })
        .where(eq(authUsers.id, seeded.id));
    }
  }
}
