'use client';
import { useState, useEffect } from 'react';

export default function BattleRoyale() {
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [userTeam, setUserTeam] = useState('Phoenixes');
    const [userRank, setUserRank] = useState(42);
    const [userPoints, setUserPoints] = useState(2847);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [joined, setJoined] = useState(false);
    const [showVictory, setShowVictory] = useState(false);

    const teams = [
        {
            name: 'Phoenixes',
            color: 'from-red-500 to-orange-500',
            emoji: '🔥',
            members: 156,
            totalPoints: 45230,
            motto: 'Rise from the ashes!'
        },
        {
            name: 'Storm Hawks',
            color: 'from-blue-500 to-cyan-500',
            emoji: '⚡',
            members: 143,
            totalPoints: 42180,
            motto: 'Swift as lightning!'
        },
        {
            name: 'Shadow Panthers',
            color: 'from-purple-500 to-indigo-500',
            emoji: '🐆',
            members: 139,
            totalPoints: 38970,
            motto: 'Hunt in silence!'
        },
        {
            name: 'Golden Eagles',
            color: 'from-yellow-500 to-amber-500',
            emoji: '🦅',
            members: 134,
            totalPoints: 35420,
            motto: 'Soar above all!'
        }
    ];

    const challenges = [
        {
            id: 1,
            title: 'CAMPUS CONQUEST',
            description: 'Teams compete to visit the most locations on campus',
            type: 'location',
            timeLimit: '2 hours',
            maxParticipants: 50,
            currentParticipants: 38,
            prize: '2000 points + exclusive badge',
            difficulty: 'Epic',
            rules: ['Visit 10 different campus locations', 'Take photos at each spot', 'Tag your team in posts'],
            status: 'active'
        },
        {
            id: 2,
            title: 'KNOWLEDGE WARFARE',
            description: 'Academic trivia battle between teams',
            type: 'trivia',
            timeLimit: '30 minutes',
            maxParticipants: 100,
            currentParticipants: 87,
            prize: '1500 points + study rewards',
            difficulty: 'Hard',
            rules: ['Answer 20 questions', 'Team scores combined', 'No googling allowed'],
            status: 'starting_soon'
        },
        {
            id: 3,
            title: 'SOCIAL STORM',
            description: 'Generate the most campus engagement',
            type: 'social',
            timeLimit: '4 hours',
            maxParticipants: 75,
            currentParticipants: 62,
            prize: '3000 points + viral badge',
            difficulty: 'Legendary',
            rules: ['Create viral content', 'Get reactions & shares', 'Use team hashtag'],
            status: 'active'
        }
    ];

    const liveUpdates = [
        { user: 'StormRider47', team: 'Storm Hawks', action: 'just scored 200 points!', time: '2s ago' },
        { user: 'PhoenixFire', team: 'Phoenixes', action: 'completed location challenge!', time: '15s ago' },
        { user: 'ShadowNinja', team: 'Shadow Panthers', action: 'answered trivia question!', time: '23s ago' },
        { user: 'GoldenWing', team: 'Golden Eagles', action: 'uploaded challenge photo!', time: '41s ago' },
        { user: 'TeamPhoenix', team: 'Phoenixes', action: 'took the lead!', time: '1m ago' },
    ];

    const powerUps = [
        { name: 'Point Multiplier', description: '2x points for 10 minutes', cost: 500, icon: '⚡', available: 2 },
        { name: 'Time Freeze', description: 'Pause timer for 5 minutes', cost: 800, icon: '⏰', available: 1 },
        { name: 'Team Rally', description: 'Boost all team members', cost: 1200, icon: '📢', available: 1 },
        { name: 'Intel Hack', description: 'See opponent strategies', cost: 1000, icon: '🔍', available: 0 }
    ];

    const weeklyLeaderboard = [
        { rank: 1, user: 'ChallengeKing', team: 'Phoenixes', points: 15420, badge: '👑' },
        { rank: 2, user: 'BattleQueen', team: 'Storm Hawks', points: 14210, badge: '⚔️' },
        { rank: 3, user: 'WarriorPro', team: 'Shadow Panthers', points: 13150, badge: '🛡️' },
        { rank: 4, user: 'EagleEye', team: 'Golden Eagles', points: 12890, badge: '🎯' },
        { rank: 42, user: 'You', team: userTeam, points: userPoints, badge: '🔥', isUser: true }
    ];

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const joinChallenge = (challenge) => {
        setCurrentChallenge(challenge);
        setJoined(true);
        // Simulate completing challenge after 3 seconds
        setTimeout(() => {
            setShowVictory(true);
            setUserPoints(prev => prev + 500);
            setTimeout(() => setShowVictory(false), 3000);
        }, 3000);
    };

    const usePowerUp = (powerUp) => {
        if (powerUp.available > 0 && userPoints >= powerUp.cost) {
            setUserPoints(prev => prev - powerUp.cost);
            alert(`🚀 ${powerUp.name} activated! ${powerUp.description}`);
        }
    };

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
            {/* Victory Animation */}
            {showVictory && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl animate-pulse shadow-2xl">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🏆</div>
                            <div className="text-2xl font-bold text-black">VICTORY!</div>
                            <div className="text-black">+500 Battle Points!</div>
                            <div className="text-black">Team Phoenixes Rises!</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2">
                        BATTLE ROYALE ⚔️
                    </h1>
                    <p className="text-red-200">Unite. Compete. Conquer.</p>
                </div>

                {/* Global Timer */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-6 text-center">
                    <h3 className="font-bold mb-2">🔥 NEXT BATTLE BEGINS IN</h3>
                    <div className="text-3xl font-mono font-bold">{formatTime(timeLeft)}</div>
                    <div className="text-sm mt-2">Epic rewards await the victors!</div>
                </div>

                {/* User Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold">Warrior Rank #{userRank}</h2>
                            <p className="text-purple-200">Team {userTeam} 🔥</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-400">{userPoints}</div>
                            <div className="text-sm text-purple-200">Battle Points</div>
                        </div>
                    </div>
                </div>

                {/* Team Battle Status */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">⚔️ Team War Status</h3>
                    <div className="space-y-3">
                        {teams.map((team, index) => (
                            <div key={team.name} className="relative">
                                <div className={`p-4 rounded-xl bg-gradient-to-r ${team.color} ${userTeam === team.name ? 'border-2 border-white' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{team.emoji}</span>
                                            <div>
                                                <div className="font-bold">{team.name}</div>
                                                <div className="text-sm opacity-90">{team.members} warriors</div>
                                                <div className="text-xs opacity-80">{team.motto}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold">{team.totalPoints}</div>
                                            <div className="text-sm">points</div>
                                            <div className="text-xs">#{index + 1}</div>
                                        </div>
                                    </div>
                                    {userTeam === team.name && (
                                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                            YOUR TEAM
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Challenges */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🎯 Active Battles</h3>
                    <div className="space-y-4">
                        {challenges.map(challenge => (
                            <div key={challenge.id} className="bg-white/5 rounded-xl p-4 border-l-4 border-red-500">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-bold text-lg">{challenge.title}</h4>
                                        <p className="text-red-200 text-sm">{challenge.description}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${challenge.difficulty === 'Legendary' ? 'bg-red-500' :
                                                challenge.difficulty === 'Epic' ? 'bg-purple-500' :
                                                    'bg-orange-500'
                                                }`}>
                                                {challenge.difficulty}
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-500">
                                                {challenge.timeLimit}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-yellow-400 font-bold text-sm">{challenge.prize}</div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Participants</span>
                                        <span>{challenge.currentParticipants}/{challenge.maxParticipants}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-red-400 to-orange-500 h-2 rounded-full transition-all"
                                            style={{ width: `${(challenge.currentParticipants / challenge.maxParticipants) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => joinChallenge(challenge)}
                                    disabled={challenge.status !== 'active'}
                                    className={`w-full py-3 rounded-xl font-bold transition-all transform active:scale-95 ${challenge.status === 'active'
                                        ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                                        : 'bg-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    {challenge.status === 'active' ? '⚔️ JOIN BATTLE' :
                                        challenge.status === 'starting_soon' ? '⏰ STARTING SOON' :
                                            '🔒 LOCKED'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Power-ups Store */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🚀 War Arsenal</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {powerUps.map(powerUp => (
                            <button
                                key={powerUp.name}
                                onClick={() => usePowerUp(powerUp)}
                                disabled={powerUp.available === 0 || userPoints < powerUp.cost}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="text-2xl mb-1">{powerUp.icon}</div>
                                <div className="text-sm">{powerUp.name}</div>
                                <div className="text-xs text-purple-200">{powerUp.cost} pts</div>
                                <div className="text-xs">({powerUp.available} left)</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🔴 Live Battle Feed</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                        {liveUpdates.map((update, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div>
                                    <span className="font-bold text-yellow-400">{update.user}</span>
                                    <span className="text-gray-300"> ({update.team}) </span>
                                    <span className="text-white">{update.action}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{update.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Leaderboard */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🏆 Hall of Warriors</h3>
                    <div className="space-y-3">
                        {weeklyLeaderboard.map(player => (
                            <div key={player.rank} className={`flex items-center justify-between p-3 rounded-xl ${player.isUser ? 'bg-red-500/20 border border-red-400' : 'bg-white/5'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                                        player.rank === 2 ? 'bg-gray-400 text-black' :
                                            player.rank === 3 ? 'bg-amber-600 text-black' :
                                                'bg-red-500'
                                        }`}>
                                        #{player.rank}
                                    </div>
                                    <div>
                                        <div className="font-bold">{player.user} {player.badge}</div>
                                        <div className="text-sm text-purple-200">{player.team}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-yellow-400">{player.points}</div>
                                    <div className="text-xs text-gray-400">battle pts</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium War Pass */}
                <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">⚔️ WAR PASS PREMIUM</h3>
                    <p className="mb-4">Unlimited power-ups, exclusive battles, team creation, and legendary rewards!</p>
                    <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold">
                        Activate War Pass - $8.99/month
                    </button>
                </div>
            </div>
        </div>
    );
}
