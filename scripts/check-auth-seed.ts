// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require("pg");
import { loadEnvFromRoot } from "@/scripts/load-env";

async function main() {
  loadEnvFromRoot();
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const tables = await client.query(
    "select table_name from information_schema.tables where table_schema='public' and table_name in ('user','session','account','verification') order by table_name",
  );
  const users = await client.query(
    'select id,email,username from "user" where email=$1 or username=$2',
    ["kasey123@cms.local", "kasey123"],
  );

  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ tables: tables.rows, users: users.rows }, null, 2));

  await client.end();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("check-auth-seed-failed", error);
  process.exit(1);
});
