import { NextResponse } from 'next/server';

// Helper function to calculate wellness statistics
function calculateWellnessStats(checkins) {
    if (!checkins || checkins.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            averageMood: 0,
            totalCheckins: 0,
            weeklyData: [],
            insights: []
        };
    }

    // Calculate current streak
    const sortedCheckins = [...checkins].sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Check if today has a check-in
    const todayCheckin = sortedCheckins.find(c => c.date === todayStr);
    if (todayCheckin) {
        currentStreak = 1;

        // Count consecutive days before today
        for (let i = 1; i < sortedCheckins.length; i++) {
            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);
            const expectedDateStr = expectedDate.toISOString().split('T')[0];

            if (sortedCheckins.find(c => c.date === expectedDateStr)) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    const allDates = sortedCheckins.map(c => c.date).sort();

    for (let i = 0; i < allDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const prevDate = new Date(allDates[i - 1]);
            const currDate = new Date(allDates[i]);
            const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate average mood
    const averageMood = checkins.reduce((sum, c) => sum + c.mood, 0) / checkins.length;

    // Calculate weekly data (last 7 days)
    const weeklyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = days[date.getDay()];

        const dayCheckin = checkins.find(c => c.date === dateStr);

        weeklyData.push({
            day: dayName,
            date: dateStr,
            mood: dayCheckin ? dayCheckin.mood : 0,
            energy: dayCheckin ? Math.min(5, dayCheckin.mood + (Math.random() - 0.5)) : 0, // Simulate energy based on mood
            hasCheckin: !!dayCheckin
        });
    }

    // Generate insights based on data patterns
    const insights = generateInsights(checkins, averageMood);

    return {
        currentStreak,
        longestStreak,
        averageMood: parseFloat(averageMood.toFixed(1)),
        totalCheckins: checkins.length,
        weeklyData,
        insights
    };
}

function generateInsights(checkins, averageMood) {
    const insights = [];

    // Mood trend insight
    if (averageMood >= 4) {
        insights.push({
            type: 'positive',
            title: 'Great Progress!',
            message: "Your mood has been consistently high. Keep up the great work!",
            icon: 'trending-up'
        });
    } else if (averageMood >= 3) {
        insights.push({
            type: 'neutral',
            title: 'Steady Progress',
            message: "Your mood is stable. Consider adding more activities that boost your happiness.",
            icon: 'activity'
        });
    } else {
        insights.push({
            type: 'suggestion',
            title: 'Focus on Self-care',
            message: "Your mood has been lower lately. Try incorporating more self-care activities.",
            icon: 'heart'
        });
    }

    // Activity patterns
    const allActivities = checkins.flatMap(c => c.activities);
    const activityCounts = {};
    allActivities.forEach(activity => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    });

    const topActivity = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0];
    if (topActivity) {
        insights.push({
            type: 'pattern',
            title: 'Activity Pattern',
            message: `You do "${topActivity[0]}" most often. Great consistency!`,
            icon: 'target'
        });
    }

    // Exercise correlation
    const exerciseCheckins = checkins.filter(c => c.activities.includes('Exercise'));
    if (exerciseCheckins.length > 0) {
        const exerciseAvgMood = exerciseCheckins.reduce((sum, c) => sum + c.mood, 0) / exerciseCheckins.length;
        const nonExerciseCheckins = checkins.filter(c => !c.activities.includes('Exercise'));
        const nonExerciseAvgMood = nonExerciseCheckins.length > 0
            ? nonExerciseCheckins.reduce((sum, c) => sum + c.mood, 0) / nonExerciseCheckins.length
            : 0;

        if (exerciseAvgMood > nonExerciseAvgMood + 0.5) {
            insights.push({
                type: 'pattern',
                title: 'Exercise Boost',
                message: "Your mood tends to be higher on days when you exercise!",
                icon: 'zap'
            });
        }
    }

    return insights;
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID is required'
            }, { status: 400 });
        }

        // Fetch check-ins for this user (in a real app, this would be a database query)
        // For now, we'll fetch from our mock data in the other endpoint
        const checkinsResponse = await fetch(`${request.nextUrl.origin}/api/wellness/checkins?userId=${userId}&limit=100`);
        const checkinsData = await checkinsResponse.json();

        if (!checkinsData.success) {
            throw new Error('Failed to fetch check-ins');
        }

        const stats = calculateWellnessStats(checkinsData.data);

        return NextResponse.json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error('Error calculating wellness stats:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to calculate wellness statistics'
        }, { status: 500 });
    }
}
