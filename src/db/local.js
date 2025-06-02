// Local database connection for seeding and development
import { drizzle } from 'drizzle-orm/d1';
import { createClient } from '@cloudflare/d1';
import * as schema from './schema.js';

// Create a local D1 database instance for development
// This uses the local D1 database that wrangler creates
export function getLocalDB() {
    // For local development, we need to connect directly to the local D1 instance
    // This requires the wrangler dev server to be running or using the local D1 file
    const localD1 = createClient({
        url: 'http://localhost:8787', // Default wrangler dev server
        token: 'local-dev-token' // Local dev token
    });

    return drizzle(localD1, { schema });
}

// Export both for flexibility
export { getDB } from './index.js';
