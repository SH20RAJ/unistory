'use client';
import { useState, useEffect } from 'react';

export default function SoulTwin() {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [dailyMatches, setDailyMatches] = useState(3);
    const [premiumMatches, setPremiumMatches] = useState(0);
    const [compatibility, setCompatibility] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: 'You',
        interests: ['Music', 'Books', 'Travel', 'Coffee'],
        personality: 'ENFP',
        age: 20,
        major: 'Psychology'
    });

    const [matchQueue, setMatchQueue] = useState([
        {
            id: 1,
            name: 'Alex',
            age: 21,
            major: 'Computer Science',
            interests: ['Gaming', 'Music', 'Pizza', 'Late night conversations'],
            personality: 'INTJ',
            photo: '🎮',
            rarity: 'Ultra Rare',
            compatibility: 94,
            distance: '0.2 miles away',
            lastSeen: 'Active 5 minutes ago',
            mutualFriends: 3,
            verified: true
        },
        {
            id: 2,
            name: 'Sam',
            age: 19,
            major: 'Art History',
            interests: ['Photography', 'Books', 'Indie music', 'Coffee shops'],
            personality: 'INFP',
            photo: '📷',
            rarity: 'Legendary',
            compatibility: 96,
            distance: '0.1 miles away',
            lastSeen: 'Active now',
            mutualFriends: 7,
            verified: true
        },
        {
            id: 3,
            name: 'Jordan',
            age: 22,
            major: 'Philosophy',
            interests: ['Deep conversations', 'Travel', 'Yoga', 'Cooking'],
            personality: 'ENFJ',
            photo: '🧘',
            rarity: 'Mythic',
            compatibility: 98,
            distance: '0.05 miles away',
            lastSeen: 'Active now',
            mutualFriends: 12,
            verified: true
        }
    ]);

    const [stats, setStats] = useState({
        totalMatches: 47,
        superLikes: 5,
        matches24h: 12,
        responseRate: 87,
        streak: 14
    });

    const [boosts, setBoosts] = useState({
        superSwipe: 2,
        rewind: 1,
        spotlight: 0,
        superBoost: 0
    });

    const rarityColors = {
        'Common': 'from-gray-400 to-gray-600',
        'Rare': 'from-blue-400 to-blue-600',
        'Ultra Rare': 'from-purple-400 to-purple-600',
        'Legendary': 'from-yellow-400 to-orange-500',
        'Mythic': 'from-pink-400 to-red-500'
    };

    const analyzeCompatibility = (match) => {
        setAnalyzing(true);
        setCurrentMatch(match);

        setTimeout(() => {
            const personalityMatch = Math.random() * 30 + 70; // 70-100%
            const interestMatch = Math.random() * 40 + 60; // 60-100%
            const overallMatch = match.compatibility;

            setCompatibility({
                overall: overallMatch,
                personality: personalityMatch,
                interests: interestMatch,
                lifestyle: Math.random() * 30 + 70,
                values: Math.random() * 25 + 75,
                communication: Math.random() * 35 + 65
            });
            setAnalyzing(false);
        }, 3000);
    };

    const swipeRight = (matchId) => {
        const match = matchQueue.find(m => m.id === matchId);
        if (match) {
            setMatchQueue(prev => prev.filter(m => m.id !== matchId));
            setDailyMatches(prev => Math.max(0, prev - 1));
            setStats(prev => ({ ...prev, totalMatches: prev.totalMatches + 1 }));

            // Simulate match notification
            setTimeout(() => {
                alert(`🎉 IT'S A MATCH! ${match.name} swiped right on you too!`);
            }, 1000);
        }
    };

    const swipeLeft = (matchId) => {
        setMatchQueue(prev => prev.filter(m => m.id !== matchId));
        setDailyMatches(prev => Math.max(0, prev - 1));
    };

    const useBoost = (boostType) => {
        setBoosts(prev => ({ ...prev, [boostType]: prev[boostType] - 1 }));

        switch (boostType) {
            case 'superSwipe':
                alert('💎 Super Swipe used! This match will see you first!');
                break;
            case 'rewind':
                alert('⏪ Rewind used! Last swipe undone!');
                // Add the last swiped match back to queue
                break;
            case 'spotlight':
                alert('🔦 Spotlight activated! You\'re now the top profile for 30 minutes!');
                break;
            case 'superBoost':
                alert('🚀 Super Boost activated! 10x more visibility for 1 hour!');
                break;
        }
    };

    const nextMatch = () => {
        if (matchQueue.length > 0 && dailyMatches > 0) {
            analyzeCompatibility(matchQueue[0]);
        }
    };

    useEffect(() => {
        if (!currentMatch && matchQueue.length > 0 && dailyMatches > 0) {
            nextMatch();
        }
    }, [matchQueue, dailyMatches]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white">
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                        SOUL TWIN 💫
                    </h1>
                    <p className="text-pink-200">Find your cosmic connection</p>

                    {/* Stats Dashboard */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-2xl font-bold text-pink-400">{stats.totalMatches}</div>
                                <div className="text-xs text-pink-200">Total Matches</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-400">{stats.responseRate}%</div>
                                <div className="text-xs text-pink-200">Response Rate</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-400">{stats.streak}</div>
                                <div className="text-xs text-pink-200">Day Streak</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Swipes Counter */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 mb-6 text-center">
                    <h3 className="font-bold mb-2">Daily Soul Searches Remaining</h3>
                    <div className="text-3xl font-bold">{dailyMatches}</div>
                    <div className="text-sm mt-2">
                        {dailyMatches === 0 ? (
                            <span className="text-yellow-200">Upgrade to unlimited! 💎</span>
                        ) : (
                            <span>Use them wisely... each one is precious ✨</span>
                        )}
                    </div>
                </div>

                {/* Current Match Analysis */}
                {analyzing ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 text-center">
                        <div className="animate-spin text-6xl mb-4">🔮</div>
                        <h3 className="text-xl font-bold mb-2">Analyzing Soul Compatibility...</h3>
                        <p className="text-pink-200">Reading cosmic energy patterns...</p>
                        <div className="mt-4">
                            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-pink-400 to-purple-400 h-full animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    </div>
                ) : currentMatch ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        {/* Match Card */}
                        <div className="text-center mb-6">
                            <div className={`text-8xl mb-4 p-4 rounded-full bg-gradient-to-br ${rarityColors[currentMatch.rarity]} inline-block`}>
                                {currentMatch.photo}
                            </div>
                            <h2 className="text-2xl font-bold">{currentMatch.name}, {currentMatch.age}</h2>
                            <p className="text-pink-200">{currentMatch.major}</p>

                            {/* Rarity Badge */}
                            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mt-2 bg-gradient-to-r ${rarityColors[currentMatch.rarity]}`}>
                                ✨ {currentMatch.rarity} Match
                            </div>

                            {/* Distance & Activity */}
                            <div className="flex justify-center gap-4 mt-3 text-sm text-pink-200">
                                <span>📍 {currentMatch.distance}</span>
                                <span>🟢 {currentMatch.lastSeen}</span>
                                <span>👥 {currentMatch.mutualFriends} mutual friends</span>
                            </div>
                        </div>

                        {/* Compatibility Analysis */}
                        {compatibility && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4 text-center">Soul Compatibility Analysis</h3>

                                {/* Overall Score */}
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 mb-4 text-center">
                                    <div className="text-4xl font-bold">{compatibility.overall}%</div>
                                    <div className="text-sm">Overall Soul Match</div>
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="space-y-3">
                                    {Object.entries(compatibility).filter(([key]) => key !== 'overall').map(([category, score]) => (
                                        <div key={category} className="flex justify-between items-center">
                                            <span className="capitalize text-pink-200">{category}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-white/20 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full"
                                                        style={{ width: `${score}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-bold w-12">{Math.round(score)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Interests */}
                        <div className="mb-6">
                            <h4 className="font-bold mb-2">Shared Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentMatch.interests.map(interest => (
                                    <span key={interest} className="bg-pink-500/30 px-3 py-1 rounded-full text-sm">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => swipeLeft(currentMatch.id)}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 py-4 rounded-xl font-bold transition-all transform active:scale-95"
                            >
                                😔 Pass
                            </button>
                            <button
                                onClick={() => swipeRight(currentMatch.id)}
                                className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 py-4 rounded-xl font-bold transition-all transform active:scale-95"
                            >
                                💖 Soul Connect
                            </button>
                        </div>
                    </div>
                ) : dailyMatches === 0 ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center mb-6">
                        <div className="text-6xl mb-4">💔</div>
                        <h3 className="text-xl font-bold mb-2">No More Soul Searches Today</h3>
                        <p className="text-pink-200 mb-4">Your daily matches have been used. Upgrade for unlimited soul searching!</p>
                        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-xl font-bold text-black">
                            Get Unlimited Access 💎
                        </button>
                    </div>
                ) : (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center mb-6">
                        <div className="text-6xl mb-4">🔮</div>
                        <h3 className="text-xl font-bold mb-2">Finding Your Soul Twin...</h3>
                        <p className="text-pink-200">The universe is aligning your perfect match...</p>
                    </div>
                )}

                {/* Boosts & Power-ups */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Cosmic Power-ups 🚀</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => useBoost('superSwipe')}
                            disabled={boosts.superSwipe === 0}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                        >
                            💎 Super Swipe ({boosts.superSwipe})
                        </button>
                        <button
                            onClick={() => useBoost('rewind')}
                            disabled={boosts.rewind === 0}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                        >
                            ⏪ Rewind ({boosts.rewind})
                        </button>
                        <button
                            onClick={() => useBoost('spotlight')}
                            disabled={boosts.spotlight === 0}
                            className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                        >
                            🔦 Spotlight ({boosts.spotlight})
                        </button>
                        <button
                            onClick={() => useBoost('superBoost')}
                            disabled={boosts.superBoost === 0}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                        >
                            🚀 Super Boost ({boosts.superBoost})
                        </button>
                    </div>
                </div>

                {/* Queue Preview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Upcoming Soul Twins ({matchQueue.length} waiting)</h3>
                    <div className="flex gap-3 overflow-x-auto">
                        {matchQueue.slice(1, 4).map(match => (
                            <div key={match.id} className="flex-shrink-0 text-center">
                                <div className={`text-4xl p-2 rounded-full bg-gradient-to-br ${rarityColors[match.rarity]} inline-block mb-2`}>
                                    {match.photo}
                                </div>
                                <div className="text-sm font-bold">{match.name}</div>
                                <div className="text-xs text-pink-200">{match.compatibility}% match</div>
                            </div>
                        ))}
                        <div className="flex-shrink-0 text-center">
                            <div className="text-4xl p-2 rounded-full bg-white/20 inline-block mb-2">?</div>
                            <div className="text-sm font-bold">Mystery</div>
                            <div className="text-xs text-pink-200">Coming soon...</div>
                        </div>
                    </div>
                </div>

                {/* Premium Upgrade */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">🌟 SOUL TWIN PREMIUM</h3>
                    <p className="mb-4">Unlimited swipes, see who likes you, advanced compatibility analysis, and cosmic insights!</p>
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold">
                        Unlock Premium - $9.99/month
                    </button>
                </div>
            </div>
        </div>
    );
}
