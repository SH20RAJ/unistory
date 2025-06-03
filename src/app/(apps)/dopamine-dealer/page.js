// 'use client';
// import { useState, useEffect } from 'react';
// import { useAppAccess } from '@/hooks/use-premium';
// import PremiumGate from '@/components/premium/PremiumGate';

// export default function DopamineDealer() {
//     const { hasAccess } = useAppAccess('Dopamine Dealer');
    
//     const [currentMood, setCurrentMood] = useState(5);
//     const [dailyStreak, setDailyStreak] = useState(7);
//     const [totalPoints, setTotalPoints] = useState(2847);
//     const [level, setLevel] = useState(12);
//     const [todayActivities, setTodayActivities] = useState([]);
//     const [moodHistory, setMoodHistory] = useState([
//         { time: '9:00 AM', mood: 6, activity: 'Morning coffee', points: 50 },
//         { time: '12:30 PM', mood: 8, activity: 'Lunch with friends', points: 120 },
//         { time: '3:15 PM', mood: 4, activity: 'Difficult assignment', points: 30 },
//         { time: '6:00 PM', mood: 9, activity: 'Gym workout', points: 200 },
//     ]);
//     const [showReward, setShowReward] = useState(false);
//     const [rewardType, setRewardType] = useState('');
//     const [multiplier, setMultiplier] = useState(1);
//     const [powerUps, setPowerUps] = useState({
//         moodBooster: 3,
//         streakShield: 1,
//         pointsMultiplier: 2,
//         instantHappy: 1
//     });

//     const moodEmojis = ['😭', '😢', '😔', '😐', '🙂', '😊', '😄', '🤩', '🥳', '🚀'];
//     const activities = [
//         { name: '5-min meditation', points: 100, moodBoost: 2, emoji: '🧘' },
//         { name: 'Text a friend', points: 80, moodBoost: 1, emoji: '💬' },
//         { name: 'Dance to favorite song', points: 120, moodBoost: 3, emoji: '💃' },
//         { name: 'Take a selfie', points: 60, moodBoost: 1, emoji: '🤳' },
//         { name: 'Write 3 gratitudes', points: 150, moodBoost: 2, emoji: '✍️' },
//         { name: 'Do 10 pushups', points: 90, moodBoost: 2, emoji: '💪' },
//         { name: 'Call someone you miss', points: 200, moodBoost: 4, emoji: '📞' },
//         { name: 'Take a nature photo', points: 110, moodBoost: 2, emoji: '📸' },
//     ];

//     const achievements = [
//         { name: 'Mood Master', desc: '7-day streak', unlocked: true, emoji: '🏆' },
//         { name: 'Happiness Hacker', desc: 'Reach mood 9+', unlocked: true, emoji: '🎯' },
//         { name: 'Social Butterfly', desc: '10 friend interactions', unlocked: false, emoji: '🦋' },
//         { name: 'Zen Master', desc: '50 meditations', unlocked: false, emoji: '☯️' },
//         { name: 'Energy Beast', desc: '100 workouts logged', unlocked: false, emoji: '⚡' },
//     ];

//     const triggerReward = (type, points) => {
//         setRewardType(type);
//         setShowReward(true);
//         setTotalPoints(prev => prev + points * multiplier);
//         setTimeout(() => setShowReward(false), 2000);
//     };

//     const logActivity = (activity) => {
//         const points = activity.points * multiplier;
//         const newMood = Math.min(10, currentMood + activity.moodBoost);
//         setCurrentMood(newMood);
//         setTodayActivities(prev => [...prev, { ...activity, time: new Date().toLocaleTimeString(), points }]);
//         triggerReward('activity', activity.points);

//         // Random bonus rewards for addiction
//         if (Math.random() < 0.3) {
//             setTimeout(() => triggerReward('bonus', 50), 1000);
//         }
//     };

//     const usePowerUp = (type) => {
//         setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));

//         switch (type) {
//             case 'moodBooster':
//                 setCurrentMood(prev => Math.min(10, prev + 3));
//                 triggerReward('powerup', 100);
//                 break;
//             case 'pointsMultiplier':
//                 setMultiplier(2);
//                 setTimeout(() => setMultiplier(1), 300000); // 5 minutes
//                 break;
//             case 'instantHappy':
//                 setCurrentMood(10);
//                 triggerReward('instant', 200);
//                 break;
//         }
//     };

//     return (
//         <div>
//             {!hasAccess && <PremiumGate appName="Dopamine Dealer" />}
//             {hasAccess && (
//         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
//             {/* Animated Background */}
//             <div className="absolute inset-0 opacity-20">
//                 <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
//                 <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
//             </div>

//             {/* Reward Popup */}
//             {showReward && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//                     <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full animate-bounce shadow-2xl">
//                         <span className="text-2xl font-bold text-white">
//                             +{rewardType === 'bonus' ? '50' : '100'} Points! 🎉
//                         </span>
//                     </div>
//                 </div>
//             )}

//             <div className="relative z-10 p-6 max-w-md mx-auto">
//                 {/* Header with Stats */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2">
//                         DOPAMINE DEALER
//                     </h1>
//                     <p className="text-purple-200">Your happiness, amplified ⚡</p>

//                     <div className="grid grid-cols-3 gap-4 mt-6">
//                         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
//                             <div className="text-2xl font-bold text-yellow-400">{dailyStreak}</div>
//                             <div className="text-xs text-purple-200">Day Streak 🔥</div>
//                         </div>
//                         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
//                             <div className="text-2xl font-bold text-green-400">{totalPoints}</div>
//                             <div className="text-xs text-purple-200">Total Points 💎</div>
//                         </div>
//                         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
//                             <div className="text-2xl font-bold text-blue-400">Lv.{level}</div>
//                             <div className="text-xs text-purple-200">Happiness Level ⭐</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Current Mood Display */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
//                     <h3 className="text-xl font-bold mb-4 text-center">Current Mood</h3>
//                     <div className="text-center">
//                         <div className="text-6xl mb-2">{moodEmojis[currentMood - 1]}</div>
//                         <div className="text-2xl font-bold text-yellow-400">{currentMood}/10</div>
//                         <div className="flex justify-center mt-3">
//                             {Array.from({ length: 10 }, (_, i) => (
//                                 <div
//                                     key={i}
//                                     className={`h-2 w-4 mx-1 rounded-full transition-all duration-300 ${i < currentMood ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-600'
//                                         }`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Power-ups */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
//                     <h3 className="text-xl font-bold mb-4">Power-ups 🚀</h3>
//                     <div className="grid grid-cols-2 gap-3">
//                         <button
//                             onClick={() => usePowerUp('moodBooster')}
//                             disabled={powerUps.moodBooster === 0}
//                             className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-xl text-sm font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
//                         >
//                             🚀 Mood Boost ({powerUps.moodBooster})
//                         </button>
//                         <button
//                             onClick={() => usePowerUp('pointsMultiplier')}
//                             disabled={powerUps.pointsMultiplier === 0}
//                             className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl text-sm font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
//                         >
//                             ⚡ 2x Points ({powerUps.pointsMultiplier})
//                         </button>
//                         <button
//                             onClick={() => usePowerUp('instantHappy')}
//                             disabled={powerUps.instantHappy === 0}
//                             className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl text-sm font-bold disabled:opacity-50 transform transition-all hover:scale-105 active:scale-95"
//                         >
//                             🌟 Max Happy ({powerUps.instantHappy})
//                         </button>
//                         <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl text-sm font-bold text-center">
//                             🛡️ Streak Shield ({powerUps.streakShield})
//                         </div>
//                     </div>
//                 </div>

//                 {/* Quick Happiness Activities */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
//                     <h3 className="text-xl font-bold mb-4">Instant Happiness 💊</h3>
//                     <div className="grid grid-cols-2 gap-3">
//                         {activities.map((activity, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => logActivity(activity)}
//                                 className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-sm font-bold transform transition-all hover:scale-105 active:scale-95 hover:shadow-lg"
//                             >
//                                 <div className="text-2xl mb-1">{activity.emoji}</div>
//                                 <div className="text-xs">{activity.name}</div>
//                                 <div className="text-yellow-400 text-xs">+{activity.points} pts</div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Today's History */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
//                     <h3 className="text-xl font-bold mb-4">Today's Journey 📊</h3>
//                     {moodHistory.map((entry, index) => (
//                         <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-2">
//                             <div>
//                                 <div className="font-semibold">{entry.activity}</div>
//                                 <div className="text-sm text-purple-200">{entry.time}</div>
//                             </div>
//                             <div className="text-right">
//                                 <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
//                                 <div className="text-yellow-400 text-sm">+{entry.points}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Achievements */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
//                     <h3 className="text-xl font-bold mb-4">Achievements 🏆</h3>
//                     <div className="space-y-3">
//                         {achievements.map((achievement, index) => (
//                             <div key={index} className={`flex items-center p-3 rounded-xl ${achievement.unlocked ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
//                                 <div className="text-2xl mr-3">{achievement.emoji}</div>
//                                 <div className="flex-1">
//                                     <div className="font-semibold">{achievement.name}</div>
//                                     <div className="text-sm text-purple-200">{achievement.desc}</div>
//                                 </div>
//                                 {achievement.unlocked && <div className="text-green-400">✓</div>}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Premium Upsell */}
//                 <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 mt-6 text-center">
//                     <h3 className="text-xl font-bold text-black mb-2">🚀 DOPAMINE PREMIUM</h3>
//                     <p className="text-black/80 mb-4">Unlimited power-ups, exclusive activities, and 5x point multipliers!</p>
//                     <button className="bg-black text-yellow-400 px-6 py-2 rounded-xl font-bold">
//                         Upgrade Now - $4.99/month
//                     </button>
//                 </div>
//             </div>
//             )}
//         </div>
//     );
// }


import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
