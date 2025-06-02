import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema.js';

export function createDB(d1Database) {
  return drizzle(d1Database, { schema });
}

// For development with local SQLite
import Database from 'better-sqlite3';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';

export function createLocalDB() {
  const sqlite = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/database.sqlite');
  return drizzleSQLite(sqlite, { schema });
}
