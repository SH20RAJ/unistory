'use client';
import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';

export default function AchievementHunter() {
    const [userLevel, setUserLevel] = useState(23);
    const [totalXP, setTotalXP] = useState(8947);
    const [nextLevelXP, setNextLevelXP] = useState(9500);
    const [completedAchievements, setCompletedAchievements] = useState(47);
    const [totalAchievements, setTotalAchievements] = useState(150);
    const [activeQuests, setActiveQuests] = useState(5);
    const [showReward, setShowReward] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('daily');

    const categories = [
        { id: 'daily', name: 'Daily Quests', icon: '⏰', color: 'from-blue-500 to-cyan-500' },
        { id: 'social', name: 'Social', icon: '👥', color: 'from-pink-500 to-rose-500' },
        { id: 'academic', name: 'Academic', icon: '📚', color: 'from-green-500 to-emerald-500' },
        { id: 'lifestyle', name: 'Lifestyle', icon: '🌟', color: 'from-purple-500 to-violet-500' },
        { id: 'rare', name: 'Rare', icon: '💎', color: 'from-yellow-500 to-orange-500' },
        { id: 'legendary', name: 'Legendary', icon: '🏆', color: 'from-red-500 to-pink-500' }
    ];

    const achievements = {
        daily: [
            {
                id: 1,
                name: 'Early Bird',
                description: 'Log in before 7 AM',
                progress: 1,
                target: 1,
                xp: 50,
                completed: true,
                rarity: 'common',
                icon: '🌅'
            },
            {
                id: 2,
                name: 'Streak Master',
                description: 'Maintain a 7-day login streak',
                progress: 7,
                target: 7,
                xp: 200,
                completed: true,
                rarity: 'rare',
                icon: '🔥'
            },
            {
                id: 3,
                name: 'Night Owl',
                description: 'Active after midnight',
                progress: 3,
                target: 5,
                xp: 100,
                completed: false,
                rarity: 'uncommon',
                icon: '🦉'
            },
            {
                id: 4,
                name: 'Weekend Warrior',
                description: 'Complete weekend activities',
                progress: 1,
                target: 3,
                xp: 150,
                completed: false,
                rarity: 'uncommon',
                icon: '⚡'
            }
        ],
        social: [
            {
                id: 5,
                name: 'Social Butterfly',
                description: 'Make 10 new connections',
                progress: 8,
                target: 10,
                xp: 300,
                completed: false,
                rarity: 'rare',
                icon: '🦋'
            },
            {
                id: 6,
                name: 'Party Starter',
                description: 'Host 5 events',
                progress: 2,
                target: 5,
                xp: 250,
                completed: false,
                rarity: 'rare',
                icon: '🎉'
            },
            {
                id: 7,
                name: 'Matchmaker',
                description: 'Help 3 couples get together',
                progress: 1,
                target: 3,
                xp: 500,
                completed: false,
                rarity: 'epic',
                icon: '💘'
            }
        ],
        academic: [
            {
                id: 8,
                name: 'Scholar',
                description: 'Attend 20 classes this month',
                progress: 15,
                target: 20,
                xp: 400,
                completed: false,
                rarity: 'rare',
                icon: '📖'
            },
            {
                id: 9,
                name: 'Grade A',
                description: 'Get A+ in 3 subjects',
                progress: 2,
                target: 3,
                xp: 600,
                completed: false,
                rarity: 'epic',
                icon: '🎓'
            },
            {
                id: 10,
                name: 'Library Regular',
                description: 'Study 50 hours in library',
                progress: 32,
                target: 50,
                xp: 300,
                completed: false,
                rarity: 'uncommon',
                icon: '📚'
            }
        ],
        lifestyle: [
            {
                id: 11,
                name: 'Fitness Freak',
                description: 'Work out 15 days this month',
                progress: 12,
                target: 15,
                xp: 350,
                completed: false,
                rarity: 'rare',
                icon: '💪'
            },
            {
                id: 12,
                name: 'Zen Master',
                description: 'Meditate for 30 days',
                progress: 18,
                target: 30,
                xp: 500,
                completed: false,
                rarity: 'epic',
                icon: '🧘'
            },
            {
                id: 13,
                name: 'Explorer',
                description: 'Visit 10 new places on campus',
                progress: 7,
                target: 10,
                xp: 200,
                completed: false,
                rarity: 'uncommon',
                icon: '🗺️'
            }
        ],
        rare: [
            {
                id: 14,
                name: 'Unicorn Hunter',
                description: 'Find the hidden easter egg',
                progress: 0,
                target: 1,
                xp: 1000,
                completed: false,
                rarity: 'legendary',
                icon: '🦄'
            },
            {
                id: 15,
                name: 'Time Traveler',
                description: 'Use the app at 11:11 for 11 days',
                progress: 6,
                target: 11,
                xp: 777,
                completed: false,
                rarity: 'epic',
                icon: '⏰'
            }
        ],
        legendary: [
            {
                id: 16,
                name: 'Campus Legend',
                description: 'Complete all other achievements',
                progress: 47,
                target: 149,
                xp: 5000,
                completed: false,
                rarity: 'mythic',
                icon: '👑'
            }
        ]
    };

    const [unlockedRewards, setUnlockedRewards] = useState([
        { id: 1, name: 'Custom Theme', unlocked: true, icon: '🎨' },
        { id: 2, name: 'Premium Avatar Frame', unlocked: true, icon: '🖼️' },
        { id: 3, name: 'Special Badge', unlocked: false, icon: '🏅' },
        { id: 4, name: 'VIP Status', unlocked: false, icon: '⭐' }
    ]);

    const [dailyQuests, setDailyQuests] = useState([
        { id: 1, name: 'Check in 3 times today', progress: 2, target: 3, xp: 100, completed: false },
        { id: 2, name: 'Send 5 messages', progress: 3, target: 5, xp: 75, completed: false },
        { id: 3, name: 'React to 10 posts', progress: 10, target: 10, xp: 50, completed: true },
        { id: 4, name: 'Complete your profile', progress: 4, target: 5, xp: 200, completed: false }
    ]);

    const rarityColors = {
        common: 'from-gray-400 to-gray-600',
        uncommon: 'from-green-400 to-green-600',
        rare: 'from-blue-400 to-blue-600',
        epic: 'from-purple-400 to-purple-600',
        legendary: 'from-yellow-400 to-orange-500',
        mythic: 'from-pink-400 to-red-500'
    };

    const completeAchievement = (achievement) => {
        setTotalXP(prev => prev + achievement.xp);
        setCompletedAchievements(prev => prev + 1);
        setShowReward(true);

        setTimeout(() => setShowReward(false), 3000);

        // Level up check
        if (totalXP + achievement.xp >= nextLevelXP) {
            setUserLevel(prev => prev + 1);
            setNextLevelXP(prev => prev + 500);
            setTimeout(() => alert('🎉 LEVEL UP! You are now level ' + (userLevel + 1)), 1000);
        }
    };

    const progressQuest = (questId) => {
        setDailyQuests(prev => prev.map(quest => {
            if (quest.id === questId && quest.progress < quest.target) {
                const newProgress = quest.progress + 1;
                const completed = newProgress >= quest.target;

                if (completed) {
                    setTotalXP(prevXP => prevXP + quest.xp);
                }

                return { ...quest, progress: newProgress, completed };
            }
            return quest;
        }));
    };

    const getProgressPercentage = (progress, target) => {
        return Math.min((progress / target) * 100, 100);
    };

    const getCurrentCategoryAchievements = () => {
        if (selectedCategory === 'daily') return dailyQuests;
        return achievements[selectedCategory] || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
            {/* Reward Popup */}
            {showReward && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl animate-bounce shadow-2xl">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🏆</div>
                            <div className="text-xl font-bold text-black">ACHIEVEMENT UNLOCKED!</div>
                            <div className="text-black">+XP Gained!</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                        ACHIEVEMENT HUNTER 🏆
                    </h1>
                    <p className="text-purple-200">Unlock your legendary potential</p>
                </div>

                {/* Player Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">Level {userLevel}</h2>
                            <p className="text-purple-200">Achievement Hunter</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl">👑</div>
                            <div className="text-sm text-purple-200">Rank #127</div>
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>XP: {totalXP}</span>
                            <span>Next: {nextLevelXP}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${(totalXP / nextLevelXP) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Achievement Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-yellow-400">{completedAchievements}</div>
                            <div className="text-xs text-purple-200">Completed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-400">{totalAchievements}</div>
                            <div className="text-xs text-purple-200">Total</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">{activeQuests}</div>
                            <div className="text-xs text-purple-200">Active</div>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === category.id
                                    ? `bg-gradient-to-r ${category.color} text-white`
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Achievements/Quests List */}
                <div className="space-y-4 mb-6">
                    {getCurrentCategoryAchievements().map((item) => (
                        <div key={item.id} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden ${item.completed ? 'border-2 border-green-500' : ''}`}>
                            {/* Rarity Glow Effect */}
                            {item.rarity && (
                                <div className={`absolute inset-0 bg-gradient-to-r ${rarityColors[item.rarity]} opacity-10 rounded-2xl`}></div>
                            )}

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{item.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <p className="text-purple-200 text-sm">{item.description}</p>
                                            {item.rarity && (
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 bg-gradient-to-r ${rarityColors[item.rarity]}`}>
                                                    {item.rarity.toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-yellow-400 font-bold">+{item.xp} XP</div>
                                        {item.completed && <div className="text-green-400 text-2xl">✓</div>}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{item.progress}/{item.target}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${item.completed
                                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                                                }`}
                                            style={{ width: `${getProgressPercentage(item.progress, item.target)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                {selectedCategory === 'daily' && !item.completed && (
                                    <button
                                        onClick={() => progressQuest(item.id)}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-2 rounded-xl font-bold transition-all transform active:scale-95"
                                    >
                                        Make Progress 🚀
                                    </button>
                                )}

                                {item.completed && selectedCategory !== 'daily' && (
                                    <div className="w-full bg-green-500 py-2 rounded-xl font-bold text-center">
                                        ✅ COMPLETED
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rewards Showcase */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Unlocked Rewards 🎁</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {unlockedRewards.map(reward => (
                            <div key={reward.id} className={`p-4 rounded-xl text-center ${reward.unlocked ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                                <div className="text-2xl mb-2">{reward.icon}</div>
                                <div className="text-sm font-bold">{reward.name}</div>
                                {reward.unlocked ? (
                                    <div className="text-green-400 text-xs">✓ Unlocked</div>
                                ) : (
                                    <div className="text-gray-400 text-xs">🔒 Locked</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard Preview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🏆 Top Hunters</h3>
                    <div className="space-y-3">
                        {[
                            { rank: 1, name: 'AchievementKing', xp: 15420, level: 31 },
                            { rank: 2, name: 'QuestMaster', xp: 14210, level: 29 },
                            { rank: 3, name: 'BadgeCollector', xp: 13150, level: 27 },
                            { rank: 127, name: 'You', xp: 8947, level: 23, isUser: true }
                        ].map(player => (
                            <div key={player.rank} className={`flex items-center justify-between p-3 rounded-xl ${player.isUser ? 'bg-purple-500/20 border border-purple-400' : 'bg-white/5'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                                            player.rank === 2 ? 'bg-gray-400 text-black' :
                                                player.rank === 3 ? 'bg-amber-600 text-black' :
                                                    'bg-purple-500'
                                        }`}>
                                        #{player.rank}
                                    </div>
                                    <div>
                                        <div className="font-bold">{player.name}</div>
                                        <div className="text-sm text-purple-200">Level {player.level}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-yellow-400">{player.xp} XP</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Booster */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">🚀 ACHIEVEMENT BOOSTER</h3>
                    <p className="mb-4">2x XP, exclusive achievements, and instant quest completions!</p>
                    <button className="bg-white text-orange-500 px-6 py-3 rounded-xl font-bold">
                        Activate Booster - $7.99/month
                    </button>
                </div>
            </div>
        </div>
    );
}
