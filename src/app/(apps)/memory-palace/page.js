'use client';
import { useState, useEffect } from 'react';

export default function MemoryPalace() {
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [showCreationWizard, setShowCreationWizard] = useState(false);
    const [newMemory, setNewMemory] = useState({
        title: '',
        content: '',
        emotion: 'happy',
        location: '',
        tags: [],
        privacy: 'private'
    });
    const [memoryStats, setMemoryStats] = useState({
        totalMemories: 47,
        streakDays: 12,
        emotionPoints: 2847,
        friendsConnected: 23,
        sharedMemories: 8
    });

    const emotions = [
        { id: 'happy', name: 'Happy', emoji: '😊', color: 'from-yellow-400 to-orange-500' },
        { id: 'nostalgic', name: 'Nostalgic', emoji: '🥺', color: 'from-purple-400 to-pink-500' },
        { id: 'excited', name: 'Excited', emoji: '🤩', color: 'from-blue-400 to-cyan-500' },
        { id: 'peaceful', name: 'Peaceful', emoji: '😌', color: 'from-green-400 to-emerald-500' },
        { id: 'proud', name: 'Proud', emoji: '😤', color: 'from-red-400 to-pink-500' },
        { id: 'grateful', name: 'Grateful', emoji: '🙏', color: 'from-indigo-400 to-purple-500' },
        { id: 'love', name: 'Love', emoji: '🥰', color: 'from-pink-400 to-red-500' },
        { id: 'funny', name: 'Funny', emoji: '😂', color: 'from-yellow-400 to-amber-500' }
    ];

    const memories = [
        {
            id: 1,
            title: 'First Day of College',
            content: 'Walking into my dorm room for the first time, meeting my roommate Sarah, and feeling like the world was full of infinite possibilities...',
            emotion: 'excited',
            date: '2023-08-28',
            location: 'Morrison Hall, Room 314',
            tags: ['college', 'friendship', 'new beginnings'],
            likes: 23,
            comments: 7,
            shares: 3,
            privacy: 'friends',
            photos: ['📸', '📱'],
            connected: ['Sarah M.', 'Alex K.']
        },
        {
            id: 2,
            title: 'Coffee Shop Breakthrough',
            content: 'Finally understanding calculus while studying at Bean There café. The rain was pattering on the windows, my favorite playlist was on, and suddenly everything just clicked...',
            emotion: 'proud',
            date: '2023-10-15',
            location: 'Bean There Café',
            tags: ['study', 'achievement', 'coffee'],
            likes: 31,
            comments: 12,
            shares: 5,
            privacy: 'public',
            photos: ['☕', '📚'],
            connected: ['Study Group']
        },
        {
            id: 3,
            title: 'Midnight Pizza with Friends',
            content: 'After pulling an all-nighter for finals, we ordered pizza at 2 AM and just laughed until our stomachs hurt. These are the moments that make everything worth it...',
            emotion: 'happy',
            date: '2023-12-12',
            location: 'Common Room',
            tags: ['friends', 'food', 'late night'],
            likes: 45,
            comments: 18,
            shares: 9,
            privacy: 'friends',
            photos: ['🍕', '😂'],
            connected: ['Mike T.', 'Emma L.', 'David R.']
        },
        {
            id: 4,
            title: 'Grandma\'s Secret Recipe',
            content: 'She taught me how to make her famous chocolate chip cookies over video call. Even though we were miles apart, I could feel her love in every instruction...',
            emotion: 'love',
            date: '2023-11-20',
            location: 'My Kitchen',
            tags: ['family', 'cooking', 'tradition'],
            likes: 67,
            comments: 25,
            shares: 15,
            privacy: 'friends',
            photos: ['🍪', '👵'],
            connected: ['Grandma Rose']
        }
    ];

    const [dailyPrompts, setDailyPrompts] = useState([
        'What made you smile today?',
        'Describe a moment when you felt proud of yourself',
        'What\'s a small victory you achieved recently?',
        'Who made your day better and how?',
        'What\'s something beautiful you noticed today?'
    ]);

    const [memoryMilestones, setMemoryMilestones] = useState([
        { title: 'Memory Keeper', description: 'Created your first memory', completed: true, emoji: '📝' },
        { title: 'Emotion Explorer', description: 'Used 5 different emotions', completed: true, emoji: '🎭' },
        { title: 'Social Butterfly', description: 'Shared 10 memories with friends', completed: false, emoji: '🦋' },
        { title: 'Time Traveler', description: 'Created memories for 30 days', completed: false, emoji: '⏰' },
        { title: 'Palace Builder', description: 'Created 100 memories', completed: false, emoji: '🏰' }
    ]);

    const getEmotionData = (emotionId) => {
        return emotions.find(e => e.id === emotionId) || emotions[0];
    };

    const createMemory = () => {
        if (newMemory.title && newMemory.content) {
            const memory = {
                ...newMemory,
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                likes: 0,
                comments: 0,
                shares: 0,
                photos: ['📸'],
                connected: []
            };

            // Add to memories (in real app, this would save to backend)
            setMemoryStats(prev => ({
                ...prev,
                totalMemories: prev.totalMemories + 1,
                emotionPoints: prev.emotionPoints + 100
            }));

            setNewMemory({
                title: '',
                content: '',
                emotion: 'happy',
                location: '',
                tags: [],
                privacy: 'private'
            });
            setShowCreationWizard(false);

            // Show success animation
            setTimeout(() => alert('🌟 Memory saved to your palace!'), 500);
        }
    };

    const getTimeSince = (date) => {
        const now = new Date();
        const memoryDate = new Date(date);
        const daysDiff = Math.floor((now - memoryDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) return 'Today';
        if (daysDiff === 1) return '1 day ago';
        if (daysDiff < 30) return `${daysDiff} days ago`;
        if (daysDiff < 365) return `${Math.floor(daysDiff / 30)} months ago`;
        return `${Math.floor(daysDiff / 365)} years ago`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        MEMORY PALACE 🏰
                    </h1>
                    <p className="text-purple-200">Your sanctuary of precious moments</p>

                    {/* Stats Dashboard */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-2xl font-bold text-purple-400">{memoryStats.totalMemories}</div>
                                <div className="text-xs text-purple-200">Memories</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-pink-400">{memoryStats.streakDays}</div>
                                <div className="text-xs text-purple-200">Day Streak</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-400">{memoryStats.emotionPoints}</div>
                                <div className="text-xs text-purple-200">Emotion Pts</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Memory Prompt */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-center">
                    <h3 className="font-bold mb-3">✨ Today's Memory Prompt</h3>
                    <p className="text-lg mb-4">"{dailyPrompts[0]}"</p>
                    <button
                        onClick={() => setShowCreationWizard(true)}
                        className="bg-white text-purple-600 px-6 py-2 rounded-xl font-bold"
                    >
                        Capture This Moment 📸
                    </button>
                </div>

                {/* Memory Creation Wizard */}
                {showCreationWizard && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Create New Memory ✨</h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Memory title..."
                                value={newMemory.title}
                                onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
                            />

                            <textarea
                                placeholder="Describe this beautiful moment in detail... What did you see, feel, hear, smell?"
                                value={newMemory.content}
                                onChange={(e) => setNewMemory(prev => ({ ...prev, content: e.target.value }))}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 resize-none h-32"
                            />

                            <input
                                type="text"
                                placeholder="Where did this happen?"
                                value={newMemory.location}
                                onChange={(e) => setNewMemory(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
                            />

                            {/* Emotion Selector */}
                            <div>
                                <label className="text-sm text-purple-200 mb-2 block">How did this make you feel?</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {emotions.map(emotion => (
                                        <button
                                            key={emotion.id}
                                            onClick={() => setNewMemory(prev => ({ ...prev, emotion: emotion.id }))}
                                            className={`p-3 rounded-xl transition-all ${newMemory.emotion === emotion.id
                                                    ? `bg-gradient-to-r ${emotion.color}`
                                                    : 'bg-white/10 hover:bg-white/20'
                                                }`}
                                        >
                                            <div className="text-2xl">{emotion.emoji}</div>
                                            <div className="text-xs">{emotion.name}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Setting */}
                            <div>
                                <label className="text-sm text-purple-200 mb-2 block">Who can see this memory?</label>
                                <select
                                    value={newMemory.privacy}
                                    onChange={(e) => setNewMemory(prev => ({ ...prev, privacy: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
                                >
                                    <option value="private" className="bg-gray-800">Only me 🔒</option>
                                    <option value="friends" className="bg-gray-800">Close friends 👥</option>
                                    <option value="public" className="bg-gray-800">Everyone 🌍</option>
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCreationWizard(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createMemory}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-xl font-bold"
                                >
                                    Save Memory ✨
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Memory Feed */}
                <div className="space-y-4 mb-6">
                    {memories.map(memory => {
                        const emotionData = getEmotionData(memory.emotion);
                        return (
                            <div key={memory.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 relative">
                                {/* Emotion Indicator */}
                                <div className={`absolute top-3 right-3 w-12 h-12 rounded-full bg-gradient-to-r ${emotionData.color} flex items-center justify-center`}>
                                    <span className="text-2xl">{emotionData.emoji}</span>
                                </div>

                                <div className="pr-16">
                                    <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
                                    <p className="text-purple-200 mb-3 leading-relaxed">{memory.content}</p>

                                    {/* Memory Details */}
                                    <div className="flex items-center gap-2 mb-3 text-sm text-purple-300">
                                        <span>📍 {memory.location}</span>
                                        <span>•</span>
                                        <span>🕒 {getTimeSince(memory.date)}</span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {memory.tags.map(tag => (
                                            <span key={tag} className="bg-purple-500/30 px-2 py-1 rounded-full text-xs">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Connected People */}
                                    {memory.connected.length > 0 && (
                                        <div className="mb-4">
                                            <div className="text-sm text-purple-200 mb-2">Connected with:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {memory.connected.map(person => (
                                                    <span key={person} className="bg-pink-500/30 px-2 py-1 rounded-full text-xs">
                                                        👤 {person}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Engagement Stats */}
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                        <div className="flex gap-4 text-sm">
                                            <span className="flex items-center gap-1">
                                                ❤️ {memory.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                💬 {memory.comments}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                🔄 {memory.shares}
                                            </span>
                                        </div>
                                        <div className="text-xs text-purple-300">
                                            {memory.privacy === 'private' ? '🔒 Private' :
                                                memory.privacy === 'friends' ? '👥 Friends' : '🌍 Public'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Memory Milestones */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🏆 Memory Milestones</h3>
                    <div className="space-y-3">
                        {memoryMilestones.map((milestone, index) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${milestone.completed ? 'bg-green-500/20' : 'bg-gray-500/20'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{milestone.emoji}</span>
                                    <div>
                                        <div className="font-bold">{milestone.title}</div>
                                        <div className="text-sm text-purple-200">{milestone.description}</div>
                                    </div>
                                </div>
                                {milestone.completed ? (
                                    <div className="text-green-400 text-xl">✓</div>
                                ) : (
                                    <div className="text-gray-400 text-xl">🔒</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Emotion Analytics */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">📊 Your Emotion Journey</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {emotions.slice(0, 6).map(emotion => (
                            <div key={emotion.id} className={`p-3 rounded-xl bg-gradient-to-r ${emotion.color} opacity-80`}>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">{emotion.emoji}</div>
                                    <div className="text-sm font-bold">{emotion.name}</div>
                                    <div className="text-xs">
                                        {Math.floor(Math.random() * 20) + 5} memories
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={() => setShowCreationWizard(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-bold text-center"
                    >
                        ✨ New Memory
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl font-bold text-center">
                        🔍 Explore Memories
                    </button>
                </div>

                {/* Premium Memory Palace */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">👑 MEMORY PALACE PREMIUM</h3>
                    <p className="mb-4">Unlimited memories, AI insights, photo storage, collaboration features, and advanced privacy!</p>
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold">
                        Upgrade Palace - $5.99/month
                    </button>
                </div>
            </div>
        </div>
    );
}
