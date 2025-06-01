import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.js",
  out: "./src/db/migrations",
  driver: "d1-http",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.jsonc",
    dbName: "unistory-db",
  },
});