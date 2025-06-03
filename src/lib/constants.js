// App Access Configuration
export const PREMIUM_APPS = [
  'Truth Bomb',
  'Dopamine Dealer', 
  'Nova AI', 
  'Time Capsule',
  'Mind Reader',
  'Social Credit'
]

// Time Capsule Constants
export const TIME_CAPSULE_FRAMES = [
  { id: 'week', name: '1 Week', icon: '📆', color: 'bg-blue-500' },
  { id: 'month', name: '1 Month', icon: '🗓️', color: 'bg-green-500' },
  { id: 'sixMonths', name: '6 Months', icon: '⏳', color: 'bg-amber-500' },
  { id: 'year', name: '1 Year', icon: '🎂', color: 'bg-purple-500' },
  { id: 'graduation', name: 'Graduation', icon: '🎓', color: 'bg-red-500' }
]

// Mind Reader Constants
export const PERSONALITY_TYPES = [
  {
    type: 'The Visionary',
    description: 'Forward-thinking and innovative, you see possibilities where others see obstacles.',
    traits: ['Creative', 'Strategic', 'Idealistic'],
    emoji: '✨',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    type: 'The Commander',
    description: 'Natural-born leader with decisive action and strategic planning skills.',
    traits: ['Confident', 'Assertive', 'Organized'],
    emoji: '👑',
    color: 'from-red-500 to-orange-500',
  },
  {
    type: 'The Diplomat',
    description: 'Empathetic and cooperative, you excel at creating harmony and building relationships.',
    traits: ['Compassionate', 'Insightful', 'Adaptable'],
    emoji: '🕊️',
    color: 'from-green-500 to-teal-500',
  },
  {
    type: 'The Analyst',
    description: 'Logical and precise, you solve complex problems with a methodical approach.',
    traits: ['Detail-oriented', 'Objective', 'Thorough'],
    emoji: '🔍',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    type: 'The Explorer',
    description: 'Adventurous and versatile, you thrive on new experiences and adapt quickly.',
    traits: ['Spontaneous', 'Flexible', 'Resourceful'],
    emoji: '🧭',
    color: 'from-yellow-500 to-amber-500',
  }
]

// Social Credit Constants
export const SOCIAL_CREDIT_ACTIONS = [
  { name: 'Post engagement', points: 5, icon: '👍' },
  { name: 'Event attendance', points: 15, icon: '🎉' },
  { name: 'Study group host', points: 25, icon: '📚' },
  { name: 'Referral bonus', points: 50, icon: '👥' },
  { name: 'Campus activity', points: 20, icon: '🏫' },
  { name: 'Profile completion', points: 10, icon: '✅' }
]

export const SOCIAL_CREDIT_LEVELS = [
  { name: 'Newcomer', threshold: 0, perks: ['Basic access'] },
  { name: 'Familiar Face', threshold: 500, perks: ['Comment visibility boost'] },
  { name: 'Campus Regular', threshold: 1500, perks: ['Event early access'] },
  { name: 'Rising Star', threshold: 3000, perks: ['Premium app access'] },
  { name: 'Campus Celebrity', threshold: 5000, perks: ['Featured profile', 'Exclusive offers'] },
  { name: 'Campus Legend', threshold: 10000, perks: ['All premium features', 'Community badge'] }
]

// Achievement Hunter Categories
export const ACHIEVEMENT_CATEGORIES = [
  { id: 'daily', name: 'Daily Quests', icon: '⏰', color: 'from-blue-500 to-cyan-500' },
  { id: 'social', name: 'Social', icon: '👥', color: 'from-pink-500 to-rose-500' },
  { id: 'academic', name: 'Academic', icon: '📚', color: 'from-green-500 to-emerald-500' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌟', color: 'from-purple-500 to-violet-500' },
  { id: 'rare', name: 'Rare', icon: '💎', color: 'from-yellow-500 to-orange-500' },
  { id: 'legendary', name: 'Legendary', icon: '🏆', color: 'from-red-500 to-pink-500' }
]

// Future Bets Difficulty Colors
export const FUTURE_BETS_DIFFICULTY = {
  easy: "from-green-500 to-emerald-500",
  medium: "from-yellow-500 to-amber-500",
  hard: "from-orange-500 to-red-500"
}

// Future Bets Categories
export const FUTURE_BETS_CATEGORIES = [
  { id: 'campus', name: 'Campus Life', icon: '🏫', color: 'from-blue-500 to-cyan-500' },
  { id: 'social', name: 'Social Events', icon: '🎉', color: 'from-pink-500 to-rose-500' },
  { id: 'academic', name: 'Academic', icon: '📚', color: 'from-green-500 to-emerald-500' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-orange-500 to-red-500' },
  { id: 'tech', name: 'Tech Trends', icon: '📱', color: 'from-purple-500 to-indigo-500' },
  { id: 'wild', name: 'Wild Cards', icon: '🎲', color: 'from-yellow-500 to-orange-500' }
]

// Battle Royale Teams
export const BATTLE_ROYALE_TEAMS = [
  {
    name: 'Phoenixes',
    color: 'from-red-500 to-orange-500',
    emoji: '🔥',
    motto: 'Rise from the ashes!'
  },
  {
    name: 'Storm Hawks',
    color: 'from-blue-500 to-cyan-500',
    emoji: '⚡',
    motto: 'Swift as lightning!'
  },
  {
    name: 'Shadow Panthers',
    color: 'from-purple-500 to-indigo-500',
    emoji: '🐾',
    motto: 'Silent but deadly!'
  },
  {
    name: 'Emerald Vipers',
    color: 'from-green-500 to-teal-500',
    emoji: '🐍',
    motto: 'Strike with precision!'
  }
]

// Time Capsule Constants
export const timeFrames = [
  {
    id: "1week",
    label: "1 Week",
    description: "Quick reflection",
    icon: "Clock",
    color: "bg-blue-500"
  },
  {
    id: "1month",
    label: "1 Month",
    description: "Short-term goals",
    icon: "Calendar",
    color: "bg-green-500"
  },
  {
    id: "3months",
    label: "3 Months",
    description: "Semester reflection",
    icon: "GraduationCap",
    color: "bg-purple-500"
  },
  {
    id: "6months",
    label: "6 Months",
    description: "Half-year milestone",
    icon: "Star",
    color: "bg-orange-500"
  },
  {
    id: "1year",
    label: "1 Year",
    description: "Annual time capsule",
    icon: "Trophy",
    color: "bg-red-500"
  },
  {
    id: "graduation",
    label: "Graduation",
    description: "College memories",
    icon: "Crown",
    color: "bg-yellow-500"
  },
  {
    id: "5years",
    label: "5 Years",
    description: "Life milestone",
    icon: "Rocket",
    color: "bg-pink-500"
  },
  {
    id: "10years",
    label: "10 Years",
    description: "Decade reflection",
    icon: "Diamond",
    color: "bg-indigo-500"
  }
];

// Mind Reader Constants
export const personalityTypes = {
  ANALYST: {
    title: "The Analytical Mind",
    description: "You're logical, objective and methodical in your approach to understanding the world.",
    strengths: ["Logical thinking", "Problem solving", "Objective analysis"],
    learningStyle: "You learn by breaking systems down and understanding their components.",
    compatibleTypes: ["CREATIVE", "LEADER"],
    idealStudyEnvironment: "Quiet, organized space with minimal distractions",
    careerStrengths: ["Research", "Data analysis", "Strategic planning"],
    icon: "Brain"
  },
  CREATIVE: {
    title: "The Creative Spirit",
    description: "You're imaginative, innovative and see possibilities where others don't.",
    strengths: ["Idea generation", "Artistic expression", "Unique perspectives"],
    learningStyle: "You learn through visualization, imagination and creative projects.",
    compatibleTypes: ["SOCIAL", "ANALYST"],
    idealStudyEnvironment: "Inspiring space with visual stimulation and freedom to move",
    careerStrengths: ["Design", "Content creation", "Innovation"],
    icon: "Sparkles"
  },
  LEADER: {
    title: "The Natural Leader",
    description: "You're decisive, influential and naturally take charge in group situations.",
    strengths: ["Decision making", "Motivation", "Strategic thinking"],
    learningStyle: "You learn through discussion, debate and practical application.",
    compatibleTypes: ["SUPPORTER", "ANALYST"],
    idealStudyEnvironment: "Collaborative space with opportunities to lead discussions",
    careerStrengths: ["Management", "Entrepreneurship", "Project leadership"],
    icon: "Trophy"
  },
  SOCIAL: {
    title: "The Social Connector",
    description: "You're empathetic, emotionally intelligent and thrive in social settings.",
    strengths: ["Communication", "Empathy", "Building relationships"],
    learningStyle: "You learn through discussion, group work and emotional connection to material.",
    compatibleTypes: ["CREATIVE", "SUPPORTER"],
    idealStudyEnvironment: "Collaborative space with opportunities for discussion",
    careerStrengths: ["Counseling", "Customer relations", "Team building"],
    icon: "Users"
  },
  SUPPORTER: {
    title: "The Supportive Anchor",
    description: "You're reliable, detail-oriented and provide stability in any situation.",
    strengths: ["Reliability", "Organization", "Attention to detail"],
    learningStyle: "You learn through structured, step-by-step approaches and consistent practice.",
    compatibleTypes: ["LEADER", "SOCIAL"],
    idealStudyEnvironment: "Consistent, organized space with clear routines",
    careerStrengths: ["Administration", "Quality assurance", "Support roles"],
    icon: "Heart"
  }
};

// Social Credit Constants 
export const socialCreditActions = [
  { 
    action: "Post liked by 10+ people", 
    points: 15, 
    category: "Engagement" 
  },
  { 
    action: "Comment that starts a discussion", 
    points: 20, 
    category: "Engagement" 
  },
  { 
    action: "Daily login streak (7 days)", 
    points: 50, 
    category: "Activity" 
  },
  { 
    action: "Helping another student", 
    points: 75, 
    category: "Community" 
  },
  { 
    action: "Organizing a study group", 
    points: 100, 
    category: "Academic" 
  },
  { 
    action: "Creating quality notes", 
    points: 60, 
    category: "Academic" 
  },
  { 
    action: "Attending campus event", 
    points: 40, 
    category: "Campus" 
  },
  { 
    action: "Reporting harmful content", 
    points: 30, 
    category: "Community" 
  }
];

export const socialCreditLevels = [
  { name: "Bronze", threshold: 0, multiplier: 1.0, benefits: ["Basic access to all features"] },
  { name: "Silver", threshold: 500, multiplier: 1.2, benefits: ["10% bonus points", "Access to Silver-only events"] },
  { name: "Gold", threshold: 1000, multiplier: 1.5, benefits: ["25% bonus points", "Priority access to events", "Gold badge on profile"] },
  { name: "Platinum", threshold: 2000, multiplier: 1.8, benefits: ["40% bonus points", "Access to all premium features", "Exclusive content"] },
  { name: "Diamond", threshold: 3500, multiplier: 2.0, benefits: ["Double points on all actions", "VIP status", "Diamond badge on profile"] },
  { name: "Legendary", threshold: 5000, multiplier: 3.0, benefits: ["Triple points on all actions", "Top-tier rewards", "Campus celebrity status"] }
];

// Achievement Hunter Constants
export const achievementCategories = [
  { id: 'academic', name: 'Academic Excellence', icon: 'GraduationCap', color: 'blue' },
  { id: 'social', name: 'Social Butterfly', icon: 'Users', color: 'pink' },
  { id: 'wellness', name: 'Mind & Body', icon: 'Heart', color: 'red' },
  { id: 'campus', name: 'Campus Life', icon: 'Building', color: 'purple' },
  { id: 'special', name: 'Special Events', icon: 'Star', color: 'yellow' }
];

// Future Bets Constants
export const difficultyColors = {
  'Easy': 'from-green-400 to-green-600',
  'Medium': 'from-yellow-400 to-orange-500',
  'Hard': 'from-orange-500 to-red-500',
  'Extreme': 'from-red-500 to-purple-500'
};
