const Database = require('better-sqlite3');

// Initialize database with the correct path
const db = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/de2b995f358d4c87c1ca785ebebdb978ca228e19277974df2a72180287c73af6.sqlite');

console.log('📋 Checking database tables...');

try {
    // Check what tables exist
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('\n🗄️  Existing tables:');
    tables.forEach(table => {
        console.log(`   - ${table.name}`);
    });

    // Check if key tables exist
    const requiredTables = ['users', 'posts', 'comments', 'follows'];
    console.log('\n🔍 Checking required tables:');

    requiredTables.forEach(tableName => {
        const exists = tables.some(table => table.name === tableName);
        console.log(`   - ${tableName}: ${exists ? '✅' : '❌'}`);

        if (exists) {
            // Get table schema
            const schema = db.prepare(`PRAGMA table_info(${tableName})`).all();
            console.log(`     Columns: ${schema.map(col => col.name).join(', ')}`);
        }
    });

    // Test follows table specifically
    const followsExists = tables.some(table => table.name === 'follows');
    if (followsExists) {
        console.log('\n🎯 Testing follows table:');

        // Check if it's empty
        const count = db.prepare("SELECT COUNT(*) as count FROM follows").get();
        console.log(`   - Current records: ${count.count}`);

        // Show schema
        const schema = db.prepare("PRAGMA table_info(follows)").all();
        console.log('   - Schema:');
        schema.forEach(col => {
            console.log(`     * ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
        });
    }

    // Test other key tables
    console.log('\n🧪 Testing other tables:');

    // Users table
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
    console.log(`   - Users: ${userCount.count} records`);

    // Posts table  
    const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get();
    console.log(`   - Posts: ${postCount.count} records`);

    // Comments table
    const commentCount = db.prepare("SELECT COUNT(*) as count FROM comments").get();
    console.log(`   - Comments: ${commentCount.count} records`);

    console.log('\n✅ Database check completed successfully!');

} catch (error) {
    console.error('❌ Error checking database:', error);
} finally {
    db.close();
}
