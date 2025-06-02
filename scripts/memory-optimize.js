#!/usr/bin/env node

/**
 * Memory optimization script for Unistory development environment
 * Clears caches and optimizes memory usage before starting the dev server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Starting memory optimization...');

// Clear Next.js cache
const nextCacheDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextCacheDir)) {
    console.log('🗑️  Clearing Next.js cache...');
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
}

// Clear node_modules/.cache if it exists
const nodeCacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(nodeCacheDir)) {
    console.log('🗑️  Clearing node_modules cache...');
    fs.rmSync(nodeCacheDir, { recursive: true, force: true });
}

// Clear Turbopack cache
const turbopackCacheDir = path.join(process.cwd(), '.next', 'cache');
if (fs.existsSync(turbopackCacheDir)) {
    console.log('🗑️  Clearing Turbopack cache...');
    fs.rmSync(turbopackCacheDir, { recursive: true, force: true });
}

// Run garbage collection
if (global.gc) {
    console.log('♻️  Running garbage collection...');
    global.gc();
}

// Check available memory
const memUsage = process.memoryUsage();
console.log('📊 Memory Usage:');
console.log(`   RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
console.log(`   Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);
console.log(`   Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`);
console.log(`   External: ${Math.round(memUsage.external / 1024 / 1024)} MB`);

console.log('✅ Memory optimization complete!');
console.log('💡 Starting development server with optimized settings...');
