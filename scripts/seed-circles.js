#!/usr/bin/env node

import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { circles } from '../src/db/schema.js';
import { generateId } from '../src/utils/idGenerator.js';
import * as schema from '../src/db/schema.js';
import { inArray } from 'drizzle-orm';

const defaultCircles = [
  {
    id: generateId('circle'),
    name: 'General',
    description: 'General discussions for everyone',
    category: 'general',
    college: 'All Colleges',
    createdBy: 'system',
    isPrivate: false,
    requireApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId('circle'),
    name: 'Study Groups',
    description: 'Find study partners and academic discussions',
    category: 'academic',
    college: 'All Colleges',
    createdBy: 'system',
    isPrivate: false,
    requireApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId('circle'),
    name: 'Campus Events',
    description: 'Share and discover campus events',
    category: 'events',
    college: 'All Colleges',
    createdBy: 'system',
    isPrivate: false,
    requireApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId('circle'),
    name: 'Buy & Sell',
    description: 'Marketplace for students',
    category: 'marketplace',
    college: 'All Colleges',
    createdBy: 'system',
    isPrivate: false,
    requireApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedCircles() {
  try {
    // Connect directly to local SQLite database (same as development)
    const sqlite = new Database('./local.db');
    const db = drizzle(sqlite, { schema });
    
    console.log('🌱 Seeding default circles...');
    
    // Check if circles already exist by looking for our specific default circles
    const existingDefaultCircles = await db.select().from(circles).where(
      inArray(circles.name, ['General', 'Study Groups', 'Campus Events', 'Buy & Sell'])
    );
    
    if (existingDefaultCircles.length > 0) {
      console.log('ℹ️ Default circles already exist, skipping seed...');
      sqlite.close();
      return;
    }
    
    // Get the first user to use as creator
    const { users } = schema;
    const firstUser = await db.select().from(users).limit(1);
    if (firstUser.length === 0) {
      console.log('❌ No users found, please create a user first');
      sqlite.close();
      return;
    }
    
    const creatorId = firstUser[0].id;
    
    // Update circles with valid creator ID
    const circlesWithCreator = defaultCircles.map(circle => ({
      ...circle,
      createdBy: creatorId
    }));
    
    // Insert default circles
    await db.insert(circles).values(circlesWithCreator);
    
    console.log(`✅ Successfully seeded ${circlesWithCreator.length} circles`);
    console.log('Default circles:');
    circlesWithCreator.forEach(circle => {
      console.log(`  - ${circle.name}: ${circle.description}`);
    });
    
    sqlite.close();
    
  } catch (error) {
    console.error('❌ Error seeding circles:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCircles();
}

export { seedCircles };
