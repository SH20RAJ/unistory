const Database = require('better-sqlite3');
const { nanoid } = require('nanoid');

// Simple ID generator for setup
const generateSimpleId = () => nanoid(12);

// Initialize database
const db = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/de2b995f358d4c87c1ca785ebebdb978ca228e19277974df2a72180287c73af6.sqlite');

console.log('🗄️  Setting up sample conversations and messages...');

// Sample users (using existing user IDs from previous setup)
const users = [
    { id: '1', name: 'Alex Johnson', avatar: 'AJ', major: 'Computer Science' },
    { id: '2', name: 'Sarah Kim', avatar: 'SK', major: 'Data Science' },
    { id: '3', name: 'Michael Brown', avatar: 'MB', major: 'Engineering' },
    { id: '4', name: 'Maya Rodriguez', avatar: 'MR', major: 'Psychology' },
    { id: '5', name: 'Jordan Lee', avatar: 'JL', major: 'Design' },
];

// Update existing users table with sample users
try {
    console.log('✅ Checking/updating users table');

    // Check if users exist
    const checkUsers = db.prepare(`SELECT COUNT(*) as count FROM users WHERE id IN ('1', '2', '3', '4', '5')`);
    const userCount = checkUsers.get().count;

    if (userCount === 5) {
        console.log('✅ Sample users already exist');
    } else {
        // Insert sample users
        const insertUser = db.prepare(`
            INSERT OR IGNORE INTO users (id, email, username, name, avatar, major, university, is_verified, created_at, updated_at, joined_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        users.forEach(user => {
            const now = Math.floor(Date.now() / 1000);
            const email = `${user.name.toLowerCase().replace(' ', '.')}@example.com`;
            const username = user.name.toLowerCase().replace(' ', '');
            insertUser.run(
                user.id,
                email,
                username,
                user.name,
                user.avatar,
                user.major,
                'Stanford University',
                1, // is_verified
                now,
                now,
                now
            );
        });
        console.log('✅ Sample users inserted');
    }

    // Update user last_active field for online status
    const updateLastActive = db.prepare(`
        UPDATE users SET last_active = ? WHERE id = ?
    `);

    users.forEach(user => {
        const recentTime = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 300); // active within 5 minutes
        updateLastActive.run(recentTime, user.id);
    });
    console.log('✅ Updated user activity timestamps');

} catch (error) {
    console.log('ℹ️  User setup error:', error.message);
}

// Clear existing conversations and messages
try {
    db.exec('DELETE FROM conversation_participants');
    db.exec('DELETE FROM messages');
    db.exec('DELETE FROM conversations');
    console.log('✅ Cleared existing conversations and messages');
} catch (error) {
    console.log('ℹ️  Tables may not exist yet, continuing...');
}

// Create conversations
const conversations = [
    {
        id: generateSimpleId(),
        type: 'direct',
        name: null,
        avatar: null,
        participants: ['1', '2'], // Alex & Sarah
        category: 'study'
    },
    {
        id: generateSimpleId(),
        type: 'group',
        name: 'ML Study Group',
        avatar: 'ML',
        participants: ['1', '2', '3', '5'], // Alex, Sarah, Michael, Jordan
        category: 'study'
    },
    {
        id: generateSimpleId(),
        type: 'direct',
        name: null,
        avatar: null,
        participants: ['1', '4'], // Alex & Maya
        category: 'wellness'
    },
    {
        id: generateSimpleId(),
        type: 'group',
        name: 'Campus Events Team',
        avatar: 'CE',
        participants: ['1', '3', '4', '5'], // Alex, Michael, Maya, Jordan
        category: 'events'
    },
    {
        id: generateSimpleId(),
        type: 'anonymous',
        name: 'Anonymous Admirer',
        avatar: '💕',
        participants: ['1', '5'], // Alex & Jordan (anonymous)
        category: 'crush'
    },
];

// Insert conversations
const insertConversation = db.prepare(`
    INSERT INTO conversations (id, type, name, avatar, last_activity, is_archived, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertParticipant = db.prepare(`
    INSERT INTO conversation_participants (id, conversation_id, user_id, role, is_active, joined_at)
    VALUES (?, ?, ?, ?, ?, ?)
`);

conversations.forEach(conv => {
    const now = new Date();

    // Insert conversation
    insertConversation.run(
        conv.id,
        conv.type,
        conv.name,
        conv.avatar,
        Math.floor(now.getTime() / 1000),
        0, // is_archived
        Math.floor(now.getTime() / 1000)
    );

    // Insert participants
    conv.participants.forEach((userId, index) => {
        insertParticipant.run(
            generateSimpleId(),
            conv.id,
            userId,
            index === 0 ? 'admin' : 'member',
            1, // is_active
            Math.floor(now.getTime() / 1000)
        );
    });

    console.log(`✅ Created conversation: ${conv.name || conv.type}`);
});

// Create sample messages
const messages = [
    // Alex & Sarah direct conversation
    {
        conversationId: conversations[0].id,
        senderId: '2',
        content: 'Hey! Did you understand the machine learning assignment?',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
    },
    {
        conversationId: conversations[0].id,
        senderId: '1',
        content: 'Yeah, mostly! The neural network part was tricky though',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 1000) // 1 minute ago
    },
    {
        conversationId: conversations[0].id,
        senderId: '2',
        content: 'Same here! Want to study together this evening?',
        type: 'text',
        timestamp: new Date(Date.now() - 30 * 1000) // 30 seconds ago
    },
    {
        conversationId: conversations[0].id,
        senderId: '1',
        content: 'Absolutely! Library at 7 PM?',
        type: 'text',
        timestamp: new Date(Date.now() - 15 * 1000) // 15 seconds ago
    },
    {
        conversationId: conversations[0].id,
        senderId: '2',
        content: 'Perfect! I\'ll bring my notes. Thanks for the study notes you shared earlier! 📚',
        type: 'text',
        timestamp: new Date() // Just now
    },

    // ML Study Group messages
    {
        conversationId: conversations[1].id,
        senderId: '3',
        content: 'Hey everyone! Don\'t forget about our meeting tomorrow',
        type: 'text',
        timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
    },
    {
        conversationId: conversations[1].id,
        senderId: '5',
        content: 'What time was it again?',
        type: 'text',
        timestamp: new Date(Date.now() - 14 * 60 * 1000) // 14 minutes ago
    },
    {
        conversationId: conversations[1].id,
        senderId: '1',
        content: 'Meeting tomorrow at 3 PM confirmed. Room 204 in the CS building',
        type: 'text',
        timestamp: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
    },

    // Alex & Maya wellness conversation
    {
        conversationId: conversations[2].id,
        senderId: '4',
        content: 'Hi Alex! Thanks for sharing that mindfulness resource',
        type: 'text',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
    {
        conversationId: conversations[2].id,
        senderId: '1',
        content: 'No problem! How did the meditation session go?',
        type: 'text',
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000) // 2.5 hours ago
    },
    {
        conversationId: conversations[2].id,
        senderId: '4',
        content: 'Really well! See you at the mental health workshop!',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },

    // Campus Events Team
    {
        conversationId: conversations[3].id,
        senderId: '5',
        content: 'Event planning doc updated with latest sponsor info',
        type: 'text',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        conversationId: conversations[3].id,
        senderId: '3',
        content: 'Great work! The venue looks amazing',
        type: 'text',
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000) // 23 hours ago
    },

    // Anonymous conversation
    {
        conversationId: conversations[4].id,
        senderId: '5',
        content: 'I think you\'re really cute... 😊',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
];

// Insert messages
const insertMessage = db.prepare(`
    INSERT INTO messages (id, conversation_id, sender_id, content, type, timestamp, is_deleted)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const updateConversationLastMessage = db.prepare(`
    UPDATE conversations 
    SET last_message_id = ?, last_activity = ?
    WHERE id = ?
`);

messages.forEach(msg => {
    const messageId = generateSimpleId();

    insertMessage.run(
        messageId,
        msg.conversationId,
        msg.senderId,
        msg.content,
        msg.type,
        Math.floor(msg.timestamp.getTime() / 1000),
        0 // is_deleted
    );

    // Update conversation with last message
    updateConversationLastMessage.run(
        messageId,
        Math.floor(msg.timestamp.getTime() / 1000),
        msg.conversationId
    );
});

console.log(`✅ Created ${messages.length} sample messages`);

// Update participant last read times (simulate some unread messages)
const updateLastRead = db.prepare(`
    UPDATE conversation_participants 
    SET last_read = ?
    WHERE conversation_id = ? AND user_id = ?
`);

// Mark some messages as read for user 1
updateLastRead.run(
    Math.floor((Date.now() - 5 * 60 * 1000) / 1000), // 5 minutes ago
    conversations[0].id,
    '1'
); // This will leave the last message from Sarah unread

updateLastRead.run(
    Math.floor((Date.now() - 20 * 60 * 1000) / 1000), // 20 minutes ago
    conversations[1].id,
    '1'
); // This will leave group messages unread

console.log('✅ Set up read/unread message states');

// Verify setup
const conversationCount = db.prepare('SELECT COUNT(*) as count FROM conversations').get();
const messageCount = db.prepare('SELECT COUNT(*) as count FROM messages').get();
const participantCount = db.prepare('SELECT COUNT(*) as count FROM conversation_participants').get();

console.log(`\n📊 Setup Summary:`);
console.log(`   Conversations: ${conversationCount.count}`);
console.log(`   Messages: ${messageCount.count}`);
console.log(`   Participants: ${participantCount.count}`);

console.log('\n🎉 Messages database setup complete!');
console.log('💡 You can now test the messages API and SWR integration');

db.close();
