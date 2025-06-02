/**
 * Wellness Data Seeding Script
 * This script creates sample wellness check-ins, goals, and statistics for testing
 */

// Sample wellness check-ins data
const sampleCheckins = [
    {
        userId: '1',
        date: '2024-06-01',
        mood: 5,
        moodLabel: 'Great',
        activities: ['Exercise', 'Studied', 'Self-care'],
        journalEntry: 'Had an amazing day! Morning workout gave me so much energy for studying. Finished all my assignments and treated myself to a relaxing evening routine.'
    },
    {
        userId: '1',
        date: '2024-05-31',
        mood: 4,
        moodLabel: 'Good',
        activities: ['Studied', 'Socializing', 'Coffee Break'],
        journalEntry: 'Productive study session with friends at the library. Coffee breaks really help maintain focus!'
    },
    {
        userId: '1',
        date: '2024-05-30',
        mood: 3,
        moodLabel: 'Okay',
        activities: ['Studied', 'Outdoors'],
        journalEntry: 'Moderate day. Managed to get some studying done but feeling a bit overwhelmed with upcoming exams.'
    },
    {
        userId: '1',
        date: '2024-05-29',
        mood: 2,
        moodLabel: 'Low',
        activities: ['Studied'],
        journalEntry: 'Struggling with motivation today. The material is challenging and I feel behind on my goals.'
    },
    {
        userId: '1',
        date: '2024-05-28',
        mood: 4,
        moodLabel: 'Good',
        activities: ['Exercise', 'Socializing', 'Self-care'],
        journalEntry: 'Great social day! Hung out with friends after hitting the gym. Self-care Sunday was exactly what I needed.'
    },
    {
        userId: '1',
        date: '2024-05-27',
        mood: 5,
        moodLabel: 'Great',
        activities: ['Outdoors', 'Exercise', 'Socializing'],
        journalEntry: 'Perfect weekend day! Went hiking with the outdoor club. Nature really refreshes my mind and spirit.'
    },
    {
        userId: '1',
        date: '2024-05-26',
        mood: 4,
        moodLabel: 'Good',
        activities: ['Studied', 'Coffee Break', 'Self-care'],
        journalEntry: 'Balanced day of studying and self-care. Coffee study breaks are becoming a favorite routine.'
    }
];

// Sample wellness goals
const sampleGoals = [
    {
        userId: '1',
        title: 'Daily Check-in Streak',
        description: 'Complete wellness check-ins every day for 30 days',
        type: 'streak',
        target: 30,
        current: 7,
        unit: 'days',
        isActive: true
    },
    {
        userId: '1',
        title: 'Weekly Exercise Goal',
        description: 'Include exercise in activities at least 3 times per week',
        type: 'weekly',
        target: 3,
        current: 2,
        unit: 'times',
        isActive: true
    },
    {
        userId: '1',
        title: 'Mood Stability',
        description: 'Maintain an average mood rating of 4 or higher',
        type: 'average',
        target: 4,
        current: 3.9,
        unit: 'rating',
        isActive: true
    },
    {
        userId: '1',
        title: 'Social Connection',
        description: 'Engage in social activities at least twice a week',
        type: 'weekly',
        target: 2,
        current: 3,
        unit: 'times',
        isActive: true
    }
];

// Function to generate realistic wellness patterns
function generateWeeklyPattern() {
    const today = new Date();
    const weeklyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayName = days[date.getDay()];

        // Generate realistic mood patterns (weekends slightly higher, mid-week dip)
        let baseMood = 3.5;
        if (dayName === 'Sat' || dayName === 'Sun') baseMood += 0.5;
        if (dayName === 'Wed' || dayName === 'Thu') baseMood -= 0.3;

        const mood = Math.max(1, Math.min(5, baseMood + (Math.random() - 0.5) * 1.5));
        const energy = Math.max(1, Math.min(5, mood + (Math.random() - 0.5) * 0.8));

        weeklyData.push({
            day: dayName,
            date: date.toISOString().split('T')[0],
            mood: Math.round(mood * 10) / 10,
            energy: Math.round(energy * 10) / 10,
            hasCheckin: Math.random() > 0.2 // 80% chance of having a check-in
        });
    }

    return weeklyData;
}

// Function to generate insights based on data
function generateInsights(checkins) {
    const insights = [];

    // Exercise correlation insight
    const exerciseCheckins = checkins.filter(c => c.activities.includes('Exercise'));
    if (exerciseCheckins.length > 0) {
        const exerciseAvgMood = exerciseCheckins.reduce((sum, c) => sum + c.mood, 0) / exerciseCheckins.length;
        const nonExerciseCheckins = checkins.filter(c => !c.activities.includes('Exercise'));
        const nonExerciseAvgMood = nonExerciseCheckins.length > 0
            ? nonExerciseCheckins.reduce((sum, c) => sum + c.mood, 0) / nonExerciseCheckins.length
            : 0;

        if (exerciseAvgMood > nonExerciseAvgMood + 0.3) {
            insights.push({
                type: 'pattern',
                title: 'Exercise Boost',
                message: 'Your mood tends to be higher on days when you exercise! Keep up the great work.',
                icon: 'zap'
            });
        }
    }

    // Social activity insight
    const socialCheckins = checkins.filter(c => c.activities.includes('Socializing'));
    if (socialCheckins.length >= 2) {
        insights.push({
            type: 'positive',
            title: 'Social Connection',
            message: 'You\'ve been great at maintaining social connections. This is fantastic for your wellbeing!',
            icon: 'users'
        });
    }

    // Self-care consistency
    const selfCareCheckins = checkins.filter(c => c.activities.includes('Self-care'));
    if (selfCareCheckins.length >= 3) {
        insights.push({
            type: 'positive',
            title: 'Self-care Champion',
            message: 'You\'ve been consistent with self-care activities. This is building great habits!',
            icon: 'heart'
        });
    }

    // Study balance suggestion
    const studyCheckins = checkins.filter(c => c.activities.includes('Studied'));
    if (studyCheckins.length >= 5 && exerciseCheckins.length < 2) {
        insights.push({
            type: 'suggestion',
            title: 'Balance Your Routine',
            message: 'You\'ve been studying hard! Consider adding more physical activities for better balance.',
            icon: 'target'
        });
    }

    return insights;
}

/**
 * Main seeding function
 * This would integrate with your database when ready
 */
async function seedWellnessData() {
    try {
        console.log('🌱 Starting wellness data seeding...');

        // In a real implementation, you would:
        // 1. Clear existing wellness data (optional)
        // 2. Insert sample check-ins
        // 3. Insert sample goals
        // 4. Generate and cache statistics

        console.log('📝 Sample Check-ins:', sampleCheckins.length);
        console.log('🎯 Sample Goals:', sampleGoals.length);

        // Generate weekly pattern
        const weeklyData = generateWeeklyPattern();
        console.log('📊 Weekly Pattern:', weeklyData);

        // Generate insights
        const insights = generateInsights(sampleCheckins);
        console.log('💡 Generated Insights:', insights);

        // Calculate statistics
        const stats = {
            currentStreak: 7,
            longestStreak: 12,
            averageMood: sampleCheckins.reduce((sum, c) => sum + c.mood, 0) / sampleCheckins.length,
            totalCheckins: sampleCheckins.length,
            weeklyData,
            insights
        };

        console.log('📈 Wellness Statistics:', stats);
        console.log('✅ Wellness data seeding completed successfully!');

        return {
            checkins: sampleCheckins,
            goals: sampleGoals,
            stats
        };

    } catch (error) {
        console.error('❌ Error seeding wellness data:', error);
        throw error;
    }
}

// Export for use in other files
export { sampleCheckins, sampleGoals, generateWeeklyPattern, generateInsights, seedWellnessData };

// Run seeding if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    seedWellnessData()
        .then(data => {
            console.log('Seeding completed:', data);
            process.exit(0);
        })
        .catch(error => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}
