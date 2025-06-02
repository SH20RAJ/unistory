const Database = require('better-sqlite3');

// Initialize database
const db = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/a0b7c9b71b1e5a3c94a2b8f5e8e8d3e4.sqlite');

console.log('📋 Checking database tables...');

try {
    // Check what tables exist
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('\n🗄️  Existing tables:');
    tables.forEach(table => {
        console.log(`   - ${table.name}`);
    });

    // Check if conversations table exists
    const conversationsExists = tables.some(table => table.name === 'conversations');
    console.log(`\n🔍 Conversations table exists: ${conversationsExists}`);

    if (!conversationsExists) {
        console.log('\n🔨 Creating missing messaging tables...');

        // Create conversations table
        db.exec(`
            CREATE TABLE conversations (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                name TEXT,
                avatar TEXT,
                last_message_id TEXT,
                last_activity INTEGER,
                is_archived INTEGER DEFAULT 0,
                created_at INTEGER NOT NULL
            )
        `);

        // Create conversation_participants table
        db.exec(`
            CREATE TABLE conversation_participants (
                id TEXT PRIMARY KEY,
                conversation_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                role TEXT DEFAULT 'member',
                is_active INTEGER DEFAULT 1,
                joined_at INTEGER NOT NULL,
                last_read INTEGER,
                FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create messages table
        db.exec(`
            CREATE TABLE messages (
                id TEXT PRIMARY KEY,
                conversation_id TEXT NOT NULL,
                sender_id TEXT NOT NULL,
                content TEXT NOT NULL,
                type TEXT DEFAULT 'text',
                timestamp INTEGER NOT NULL,
                edited_at INTEGER,
                is_deleted INTEGER DEFAULT 0,
                metadata TEXT,
                FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
                FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log('✅ Created messaging tables successfully!');
    } else {
        console.log('✅ Messaging tables already exist');
    }

} catch (error) {
    console.error('❌ Error checking/creating tables:', error.message);
}

db.close();
console.log('\n✅ Database check complete!');
