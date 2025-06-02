import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema.js";

export function getDB() {
  // Check if we're in development environment
  if (process.env.NODE_ENV === 'development') {
    try {
      // Use local SQLite database for development
      const sqlite = new Database('./local.db');
      return drizzleSqlite(sqlite, { schema });
    } catch (error) {
      console.warn('Local SQLite database not found, falling back to Cloudflare D1');
    }
  }

  // Production or fallback: use Cloudflare D1
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}

// Do NOT export db at the top level!
// Always call getDB() inside your API route handler functions.
// Example usage in a route:
//   const db = getDB();