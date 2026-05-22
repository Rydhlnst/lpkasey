import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getCmsDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 8000,
    } as never);
  }
  if (!dbInstance) {
    dbInstance = drizzle(pool);
  }
  return dbInstance;
}
