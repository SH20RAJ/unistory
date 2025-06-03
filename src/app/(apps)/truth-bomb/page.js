'use client';
import { useState, useEffect } from 'react';
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';

export default function TruthBomb() {
    const { hasAccess } = useAppAccess('Truth Bomb');
    
    const [confessions, setConfessions] = useState([
        {
            id: 1,
            text: "I've been pretending to understand crypto for 2 years just to fit in with my roommates 😅",
            reactions: { fire: 234, relatable: 189, shocking: 45, love: 67 },
            comments: 23,
            timeAgo: '2m ago',
            isHot: true,
            verified: true
        },
        {
            id: 2,
            text: "I have a crush on my TA but I sit in the back row and never speak. Today they smiled at me and I literally forgot how to breathe 💀",
            reactions: { fire: 456, relatable: 301, shocking: 12, love: 234 },
            comments: 67,
            timeAgo: '8m ago',
            isHot: true,
            verified: false
        },
        {
            id: 3,
            text: "I've been eating cereal with a fork when my roommate isn't home because I hate doing dishes. It's been 3 months.",
            reactions: { fire: 123, relatable: 456, shocking: 78, love: 34 },
            comments: 34,
            timeAgo: '15m ago',
            isHot: false,
            verified: true
        },
        {
            id: 4,
            text: "My parents think I'm studying computer science but I switched to art therapy 6 months ago. Graduation is in 2 months and I don't know how to tell them 😭",
            reactions: { fire: 567, relatable: 234, shocking: 345, love: 123 },
            comments: 89,
            timeAgo: '23m ago',
            isHot: true,
            verified: true
        }
    ]);

    const [newConfession, setNewConfession] = useState('');
    const [selectedReaction, setSelectedReaction] = useState({});
    const [userStats, setUserStats] = useState({
        confessionsPosted: 12,
        totalReactions: 2847,
        rank: 'Truth Seeker',
        streak: 5,
        karma: 1923
    });
    const [showConfessionBoost, setShowConfessionBoost] = useState(false);
    const [trending, setTrending] = useState(true);
    const [filter, setFilter] = useState('hot');
    const [anonymityLevel, setAnonymityLevel] = useState(3);

    const reactionEmojis = {
        fire: '🔥',
        relatable: '💯',
        shocking: '😱',
        love: '❤️'
    };

    const anonymityLevels = [
        { level: 1, name: 'Slightly Anonymous', description: 'Your major is visible', cost: 0 },
        { level: 2, name: 'Pretty Anonymous', description: 'Only your year is visible', cost: 50 },
        { level: 3, name: 'Super Anonymous', description: 'Only your university', cost: 100 },
        { level: 4, name: 'Ghost Mode', description: 'Completely untraceable', cost: 200 },
        { level: 5, name: 'Phantom Elite', description: 'Premium encryption + VPN', cost: 500 }
    ];

    const boosts = [
        { name: 'Trending Boost', description: 'Push to trending for 1 hour', cost: 100, emoji: '🚀' },
        { name: 'Reaction Magnet', description: '2x reactions for 24h', cost: 200, emoji: '🧲' },
        { name: 'Comment Storm', description: 'Auto-promote in comments', cost: 150, emoji: '💬' },
        { name: 'Hot Status', description: 'Guaranteed hot badge', cost: 300, emoji: '🔥' }
    ];

    const handleReaction = (confessionId, reactionType) => {
        setConfessions(prev => prev.map(confession => {
            if (confession.id === confessionId) {
                const newReactions = { ...confession.reactions };

                // Remove previous reaction if exists
                Object.keys(selectedReaction).forEach(key => {
                    if (selectedReaction[key] === confessionId && key !== reactionType) {
                        newReactions[key] = Math.max(0, newReactions[key] - 1);
                    }
                });

                // Add new reaction
                if (selectedReaction[reactionType] === confessionId) {
                    newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
                    setSelectedReaction(prev => ({ ...prev, [reactionType]: null }));
                } else {
                    newReactions[reactionType] = newReactions[reactionType] + 1;
                    setSelectedReaction(prev => ({ ...prev, [reactionType]: confessionId }));
                }

                return { ...confession, reactions: newReactions };
            }
            return confession;
        }));
    };

    const postConfession = () => {
        if (newConfession.trim()) {
            const newPost = {
                id: Date.now(),
                text: newConfession,
                reactions: { fire: 0, relatable: 0, shocking: 0, love: 0 },
                comments: 0,
                timeAgo: 'now',
                isHot: false,
                verified: anonymityLevel >= 4
            };

            setConfessions(prev => [newPost, ...prev]);
            setNewConfession('');
            setUserStats(prev => ({
                ...prev,
                confessionsPosted: prev.confessionsPosted + 1,
                karma: prev.karma + 50
            }));

            // Random instant engagement for dopamine hit
            setTimeout(() => {
                setConfessions(prev => prev.map(conf =>
                    conf.id === newPost.id
                        ? { ...conf, reactions: { fire: Math.floor(Math.random() * 50), relatable: Math.floor(Math.random() * 30), shocking: Math.floor(Math.random() * 20), love: Math.floor(Math.random() * 40) } }
                        : conf
                ));
            }, 2000);
        }
    };

    const getTotalReactions = (reactions) => {
        return Object.values(reactions).reduce((sum, count) => sum + count, 0);
    };

    return (
        <>
            {!hasAccess && <PremiumGate appName="Truth Bomb" />}
            {hasAccess && (
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
                    <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        TRUTH BOMB 💣
                    </h1>
                    <p className="text-gray-300">Anonymous confessions that hit different</p>

                    {/* User Stats */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div>
                                <div className="text-xl font-bold text-yellow-400">{userStats.confessionsPosted}</div>
                                <div className="text-xs text-gray-300">Posted</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-red-400">{userStats.totalReactions}</div>
                                <div className="text-xs text-gray-300">Reactions</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-purple-400">{userStats.streak}</div>
                                <div className="text-xs text-gray-300">Day Streak</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-green-400">{userStats.karma}</div>
                                <div className="text-xs text-gray-300">Karma</div>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-bold">
                                {userStats.rank} 👑
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {['hot', 'new', 'trending', 'controversial'].map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === filterType
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            {filterType === 'hot' && '🔥'}
                            {filterType === 'new' && '✨'}
                            {filterType === 'trending' && '📈'}
                            {filterType === 'controversial' && '⚡'}
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </button>
                    ))}
                </div>

                {/* New Confession */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-3">Drop Your Truth 💭</h3>

                    {/* Anonymity Level Selector */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-300 mb-2 block">Anonymity Level</label>
                        <select
                            value={anonymityLevel}
                            onChange={(e) => setAnonymityLevel(Number(e.target.value))}
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
                        >
                            {anonymityLevels.map(level => (
                                <option key={level.level} value={level.level} className="bg-gray-800">
                                    {level.name} - {level.description} ({level.cost} karma)
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        value={newConfession}
                        onChange={(e) => setNewConfession(e.target.value)}
                        placeholder="What's your deepest, darkest secret? The more shocking, the more reactions... 👀"
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 resize-none h-32"
                        maxLength={500}
                    />

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-400">{newConfession.length}/500</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowConfessionBoost(!showConfessionBoost)}
                                className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold text-sm"
                            >
                                🚀 Boost
                            </button>
                            <button
                                onClick={postConfession}
                                disabled={!newConfession.trim()}
                                className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-2 rounded-xl font-bold disabled:opacity-50"
                            >
                                Drop Truth Bomb 💣
                            </button>
                        </div>
                    </div>

                    {/* Boost Options */}
                    {showConfessionBoost && (
                        <div className="mt-4 p-4 bg-white/5 rounded-xl">
                            <h4 className="font-bold mb-3">Boost Your Confession 🚀</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {boosts.map(boost => (
                                    <button
                                        key={boost.name}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl text-sm font-bold text-black"
                                    >
                                        {boost.emoji} {boost.name} ({boost.cost})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Confessions Feed */}
                <div className="space-y-4">
                    {confessions.map((confession) => (
                        <div key={confession.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 relative">
                            {/* Hot Badge */}
                            {confession.isHot && (
                                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1 rounded-full text-xs font-bold">
                                    🔥 HOT
                                </div>
                            )}

                            {/* Verified Badge */}
                            {confession.verified && (
                                <div className="absolute top-3 right-16 bg-blue-500 px-2 py-1 rounded-full text-xs font-bold">
                                    ✓ Verified
                                </div>
                            )}

                            <p className="text-white mb-4 leading-relaxed">{confession.text}</p>

                            {/* Reaction Bar */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex gap-3">
                                    {Object.entries(reactionEmojis).map(([type, emoji]) => (
                                        <button
                                            key={type}
                                            onClick={() => handleReaction(confession.id, type)}
                                            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${selectedReaction[type] === confession.id
                                                    ? 'bg-white/20 scale-110'
                                                    : 'bg-white/10 hover:bg-white/15'
                                                }`}
                                        >
                                            <span className="text-lg">{emoji}</span>
                                            <span className="text-sm font-bold">{confession.reactions[type]}</span>
                                        </button>
                                    ))}
                                </div>

                                <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                                    💬 {confession.comments}
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span>{confession.timeAgo}</span>
                                <span>{getTotalReactions(confession.reactions)} total reactions</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Premium Upgrade */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mt-8 text-center">
                    <h3 className="text-xl font-bold mb-2">🌟 TRUTH BOMB PREMIUM</h3>
                    <p className="mb-4">Unlimited boosts, ghost mode, priority placement, and reaction analytics!</p>
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold">
                        Go Premium - $6.99/month
                    </button>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mt-6">
                    <h3 className="font-bold mb-3">🔴 Live Activity</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Anonymous user just posted...</span>
                            <span className="text-red-400">2s ago</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">"Crush confession got 50 🔥 reactions"</span>
                            <span className="text-red-400">12s ago</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">"Someone used Ghost Mode boost"</span>
                            <span className="text-red-400">28s ago</span>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            )}
        </>
    );
}
