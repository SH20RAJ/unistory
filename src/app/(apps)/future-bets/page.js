'use client';
import { useState, useEffect } from 'react';
import { FUTURE_BETS_CATEGORIES, FUTURE_BETS_DIFFICULTY } from '@/lib/constants';

export default function FutureBets() {
    const [userCredits, setUserCredits] = useState(2500);
    const [userLevel, setUserLevel] = useState(8);
    const [winStreak, setWinStreak] = useState(3);
    const [totalPredictions, setTotalPredictions] = useState(47);
    const [accuracyRate, setAccuracyRate] = useState(73);
    const [selectedCategory, setSelectedCategory] = useState('campus');
    const [showBetModal, setShowBetModal] = useState(false);
    const [selectedBet, setSelectedBet] = useState(null);
    const [betAmount, setBetAmount] = useState(100);

    const categories = FUTURE_BETS_CATEGORIES;

    const predictions = {
        campus: [
            {
                id: 1,
                question: "Will the new dining hall open before November 15th?",
                description: "Construction has been delayed twice, but administration promises completion by mid-November",
                odds: { yes: 2.3, no: 1.6 },
                totalPool: 12500,
                participants: 234,
                timeLeft: '6 days',
                trending: true,
                difficulty: 'Medium',
                category: 'Infrastructure'
            },
            {
                id: 2,
                question: "Will tuition increase by more than 5% next year?",
                description: "Board meeting scheduled for December, inflation concerns mounting",
                odds: { yes: 1.8, no: 2.1 },
                totalPool: 18700,
                participants: 412,
                timeLeft: '2 months',
                trending: false,
                difficulty: 'Hard',
                category: 'Finance'
            }
        ],
        social: [
            {
                id: 3,
                question: "Will Homecoming have more than 5000 attendees?",
                description: "Last year had 4200, new venues added this year",
                odds: { yes: 1.9, no: 1.9 },
                totalPool: 8900,
                participants: 156,
                timeLeft: '3 days',
                trending: true,
                difficulty: 'Easy',
                category: 'Events'
            },
            {
                id: 4,
                question: "Will the winter formal sell out in under 2 hours?",
                description: "Tickets go on sale Monday, venue capacity is 800",
                odds: { yes: 1.4, no: 2.8 },
                totalPool: 6400,
                participants: 89,
                timeLeft: '5 days',
                trending: false,
                difficulty: 'Medium',
                category: 'Events'
            }
        ],
        academic: [
            {
                id: 5,
                question: "Will Professor Johnson's CS101 have a curve this semester?",
                description: "Historically curves when class average is below 78%",
                odds: { yes: 2.1, no: 1.7 },
                totalPool: 4200,
                participants: 67,
                timeLeft: '1 month',
                trending: false,
                difficulty: 'Medium',
                category: 'Grades'
            }
        ],
        sports: [
            {
                id: 6,
                question: "Will our basketball team make it to regionals?",
                description: "Currently ranked 3rd in conference, need top 4 to qualify",
                odds: { yes: 1.6, no: 2.3 },
                totalPool: 15600,
                participants: 289,
                timeLeft: '2 weeks',
                trending: true,
                difficulty: 'Hard',
                category: 'Basketball'
            }
        ],
        tech: [
            {
                id: 7,
                question: "Will campus WiFi be upgraded before spring semester?",
                description: "IT department has been 'evaluating options' for 8 months",
                odds: { yes: 3.2, no: 1.3 },
                totalPool: 7800,
                participants: 134,
                timeLeft: '3 months',
                trending: false,
                difficulty: 'Hard',
                category: 'Infrastructure'
            }
        ],
        wild: [
            {
                id: 8,
                question: "Will it snow on graduation day?",
                description: "May 15th graduation, historical weather data shows 12% chance",
                odds: { yes: 7.5, no: 1.1 },
                totalPool: 3400,
                participants: 78,
                timeLeft: '6 months',
                trending: false,
                difficulty: 'Extreme',
                category: 'Weather'
            }
        ]
    };

    const [leaderboard, setLeaderboard] = useState([
        { rank: 1, user: 'CrystalBall', credits: 45230, accuracy: 89, level: 23, badge: '🔮' },
        { rank: 2, user: 'FutureSeer', credits: 38940, accuracy: 85, level: 21, badge: '👁️' },
        { rank: 3, user: 'OracleOfDelphi', credits: 32180, accuracy: 82, level: 19, badge: '⚡' },
        { rank: 4, user: 'PredictionMaster', credits: 28760, accuracy: 79, level: 17, badge: '🎯' },
        { rank: 234, user: 'You', credits: userCredits, accuracy: accuracyRate, level: userLevel, badge: '🚀', isUser: true }
    ]);

    const [recentActivity, setRecentActivity] = useState([
        { user: 'CrystalBall', action: 'won 500 credits on dining hall bet', time: '2m ago' },
        { user: 'Anonymous', action: 'placed 1000 credit bet on basketball', time: '5m ago' },
        { user: 'FutureSeer', action: 'predicted "NO" on tuition increase', time: '8m ago' },
        { user: 'OracleOfDelphi', action: 'hit 5-bet winning streak!', time: '12m ago' },
        { user: 'PredictionMaster', action: 'created new prediction market', time: '15m ago' }
    ]);

    const [powerUps, setPowerUps] = useState([
        { name: 'Insider Info', description: 'Get exclusive data on prediction', cost: 300, available: 2, icon: '🕵️' },
        { name: 'Double Down', description: '2x your bet if you win', cost: 500, available: 1, icon: '⚡' },
        { name: 'Safe Bet', description: 'Get 50% back if you lose', cost: 400, available: 1, icon: '🛡️' },
        { name: 'Time Machine', description: 'See prediction 1 hour early', cost: 800, available: 0, icon: '⏰' }
    ]);

    const difficultyColors = {
        'Easy': FUTURE_BETS_DIFFICULTY.easy,
        'Medium': FUTURE_BETS_DIFFICULTY.medium,
        'Hard': FUTURE_BETS_DIFFICULTY.hard,
        'Extreme': 'from-red-500 to-purple-500' // Custom for extreme difficulty
    };

    const placeBet = (prediction, choice, amount) => {
        if (amount <= userCredits) {
            setUserCredits(prev => prev - amount);
            setTotalPredictions(prev => prev + 1);
            setShowBetModal(false);
            setBetAmount(100);
            setSelectedBet(null);

            // Simulate winning or losing
            setTimeout(() => {
                const won = Math.random() > 0.4; // 60% win rate for engagement
                if (won) {
                    const winnings = Math.floor(amount * (choice === 'yes' ? prediction.odds.yes : prediction.odds.no));
                    setUserCredits(prev => prev + winnings);
                    setWinStreak(prev => prev + 1);
                    setAccuracyRate(prev => Math.min(95, prev + 1));
                    alert(`🎉 You won ${winnings} credits! Your prediction was correct!`);
                } else {
                    setWinStreak(0);
                    setAccuracyRate(prev => Math.max(10, prev - 2));
                    alert(`😔 You lost ${amount} credits. Better luck next time!`);
                }
            }, 2000);
        }
    };

    const openBetModal = (prediction) => {
        setSelectedBet(prediction);
        setShowBetModal(true);
    };

    const usePowerUp = (powerUp) => {
        if (powerUp.available > 0 && userCredits >= powerUp.cost) {
            setUserCredits(prev => prev - powerUp.cost);
            setPowerUps(prev => prev.map(p =>
                p.name === powerUp.name ? { ...p, available: p.available - 1 } : p
            ));
            alert(`🚀 ${powerUp.name} activated! ${powerUp.description}`);
        }
    };

    const getCurrentPredictions = () => {
        return predictions[selectedCategory] || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            {/* Bet Modal */}
            {showBetModal && selectedBet && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4">Place Your Bet 🎯</h3>
                        <p className="text-purple-200 mb-4">{selectedBet.question}</p>

                        <div className="mb-4">
                            <label className="text-sm text-purple-200 mb-2 block">Bet Amount</label>
                            <input
                                type="number"
                                value={betAmount}
                                onChange={(e) => setBetAmount(Number(e.target.value))}
                                max={userCredits}
                                min={10}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
                            />
                            <div className="text-xs text-purple-300 mt-1">Available: {userCredits} credits</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => placeBet(selectedBet, 'yes', betAmount)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl font-bold"
                            >
                                YES ({selectedBet.odds.yes}x)
                                <div className="text-sm">Win: {Math.floor(betAmount * selectedBet.odds.yes)} credits</div>
                            </button>
                            <button
                                onClick={() => placeBet(selectedBet, 'no', betAmount)}
                                className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-xl font-bold"
                            >
                                NO ({selectedBet.odds.no}x)
                                <div className="text-sm">Win: {Math.floor(betAmount * selectedBet.odds.no)} credits</div>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowBetModal(false)}
                            className="w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-xl font-bold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        FUTURE BETS 🔮
                    </h1>
                    <p className="text-blue-200">Predict the future, win big</p>

                    {/* User Stats */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div>
                                <div className="text-xl font-bold text-yellow-400">{userCredits}</div>
                                <div className="text-xs text-blue-200">Credits</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-green-400">{accuracyRate}%</div>
                                <div className="text-xs text-blue-200">Accuracy</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-purple-400">Lv.{userLevel}</div>
                                <div className="text-xs text-blue-200">Prophet Level</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-red-400">{winStreak}</div>
                                <div className="text-xs text-blue-200">Win Streak</div>
                            </div>
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
                                : 'bg-white/10 text-blue-200 hover:bg-white/20'
                                }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Predictions List */}
                <div className="space-y-4 mb-6">
                    {getCurrentPredictions().map(prediction => (
                        <div key={prediction.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 relative">
                            {/* Trending Badge */}
                            {prediction.trending && (
                                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 rounded-full text-xs font-bold">
                                    🔥 TRENDING
                                </div>
                            )}

                            {/* Difficulty Badge */}
                            <div className={`absolute top-3 ${prediction.trending ? 'right-24' : 'right-3'} bg-gradient-to-r ${difficultyColors[prediction.difficulty]} px-2 py-1 rounded-full text-xs font-bold`}>
                                {prediction.difficulty}
                            </div>

                            <div className="pr-16">
                                <h3 className="text-lg font-bold mb-2">{prediction.question}</h3>
                                <p className="text-blue-200 text-sm mb-4">{prediction.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                                    <div>
                                        <div className="text-lg font-bold text-yellow-400">{prediction.totalPool}</div>
                                        <div className="text-xs text-blue-200">Total Pool</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-green-400">{prediction.participants}</div>
                                        <div className="text-xs text-blue-200">Participants</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-purple-400">{prediction.timeLeft}</div>
                                        <div className="text-xs text-blue-200">Time Left</div>
                                    </div>
                                </div>

                                {/* Betting Options */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-green-500/20 border border-green-500 rounded-xl p-3 text-center">
                                        <div className="font-bold">YES</div>
                                        <div className="text-sm text-green-400">{prediction.odds.yes}x odds</div>
                                    </div>
                                    <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 text-center">
                                        <div className="font-bold">NO</div>
                                        <div className="text-sm text-red-400">{prediction.odds.no}x odds</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openBetModal(prediction)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 rounded-xl font-bold transition-all transform active:scale-95"
                                >
                                    🎯 Place Bet
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Power-ups */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🚀 Prophet Powers</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {powerUps.map(powerUp => (
                            <button
                                key={powerUp.name}
                                onClick={() => usePowerUp(powerUp)}
                                disabled={powerUp.available === 0 || userCredits < powerUp.cost}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="text-2xl mb-1">{powerUp.icon}</div>
                                <div className="text-sm">{powerUp.name}</div>
                                <div className="text-xs text-purple-200">{powerUp.cost} credits</div>
                                <div className="text-xs">({powerUp.available} left)</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Live Activity */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🔴 Live Prophet Activity</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div>
                                    <span className="font-bold text-yellow-400">{activity.user}</span>
                                    <span className="text-blue-200"> {activity.action}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">🏆 Prophet Leaderboard</h3>
                    <div className="space-y-3">
                        {leaderboard.map(prophet => (
                            <div key={prophet.rank} className={`flex items-center justify-between p-3 rounded-xl ${prophet.isUser ? 'bg-blue-500/20 border border-blue-400' : 'bg-white/5'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${prophet.rank === 1 ? 'bg-yellow-500 text-black' :
                                        prophet.rank === 2 ? 'bg-gray-400 text-black' :
                                            prophet.rank === 3 ? 'bg-amber-600 text-black' :
                                                'bg-blue-500'
                                        }`}>
                                        #{prophet.rank}
                                    </div>
                                    <div>
                                        <div className="font-bold">{prophet.user} {prophet.badge}</div>
                                        <div className="text-sm text-blue-200">Lv.{prophet.level} • {prophet.accuracy}% accuracy</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-yellow-400">{prophet.credits}</div>
                                    <div className="text-xs text-gray-400">credits</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Oracle */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">🔮 ORACLE PREMIUM</h3>
                    <p className="mb-4">Unlimited power-ups, exclusive predictions, insider analytics, and guaranteed daily credits!</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold">
                        Become Oracle - $7.99/month
                    </button>
                </div>
            </div>
        </div>
    );
}