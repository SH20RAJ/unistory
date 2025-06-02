import { NextResponse } from 'next/server';

// Mock data for wellness check-ins - will be replaced with database when ready
let mockCheckins = [
    {
        id: 1,
        userId: '1',
        date: '2024-01-20',
        mood: 5,
        moodLabel: 'Great',
        activities: ['Studied', 'Exercise', 'Self-care'],
        journalEntry: 'Had a really productive day! Finished my assignments early and went for a run.',
        createdAt: '2024-01-20T10:00:00Z'
    },
    {
        id: 2,
        userId: '1',
        date: '2024-01-19',
        mood: 4,
        moodLabel: 'Good',
        activities: ['Studied', 'Socializing'],
        journalEntry: 'Good study session with friends. Feeling prepared for the exam.',
        createdAt: '2024-01-19T18:30:00Z'
    },
    {
        id: 3,
        userId: '1',
        date: '2024-01-18',
        mood: 3,
        moodLabel: 'Okay',
        activities: ['Studied', 'Coffee Break'],
        journalEntry: 'Struggling a bit with the material but staying positive.',
        createdAt: '2024-01-18T16:15:00Z'
    },
    {
        id: 4,
        userId: '1',
        date: '2024-01-17',
        mood: 2,
        moodLabel: 'Low',
        activities: ['Studied'],
        journalEntry: 'Feeling overwhelmed with coursework. Need to better manage my time.',
        createdAt: '2024-01-17T21:00:00Z'
    },
    {
        id: 5,
        userId: '1',
        date: '2024-01-16',
        mood: 4,
        moodLabel: 'Good',
        activities: ['Exercise', 'Outdoors', 'Self-care'],
        journalEntry: 'Great day outside! Exercise really helps my mood.',
        createdAt: '2024-01-16T14:45:00Z'
    }
];

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit')) || 30;
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID is required'
            }, { status: 400 });
        }

        // Filter check-ins by user
        let filteredCheckins = mockCheckins.filter(checkin => checkin.userId === userId);

        // Filter by date range if provided
        if (startDate) {
            filteredCheckins = filteredCheckins.filter(checkin => checkin.date >= startDate);
        }
        if (endDate) {
            filteredCheckins = filteredCheckins.filter(checkin => checkin.date <= endDate);
        }

        // Sort by date descending (most recent first)
        filteredCheckins.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Apply limit
        if (limit > 0) {
            filteredCheckins = filteredCheckins.slice(0, limit);
        }

        return NextResponse.json({
            success: true,
            data: filteredCheckins
        });

    } catch (error) {
        console.error('Error fetching wellness check-ins:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch wellness check-ins'
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, mood, moodLabel, activities, journalEntry } = body;

        if (!userId || !mood || !moodLabel) {
            return NextResponse.json({
                success: false,
                error: 'userId, mood, and moodLabel are required'
            }, { status: 400 });
        }

        // Create new check-in
        const newCheckin = {
            id: Math.max(...mockCheckins.map(c => c.id), 0) + 1,
            userId,
            date: new Date().toISOString().split('T')[0], // Today's date
            mood,
            moodLabel,
            activities: activities || [],
            journalEntry: journalEntry || '',
            createdAt: new Date().toISOString()
        };

        // Check if there's already a check-in for today
        const existingTodayIndex = mockCheckins.findIndex(
            checkin => checkin.userId === userId && checkin.date === newCheckin.date
        );

        if (existingTodayIndex !== -1) {
            // Update existing check-in for today
            mockCheckins[existingTodayIndex] = { ...mockCheckins[existingTodayIndex], ...newCheckin };

            return NextResponse.json({
                success: true,
                data: mockCheckins[existingTodayIndex],
                message: "Today's check-in updated successfully"
            });
        } else {
            // Add new check-in
            mockCheckins.push(newCheckin);

            return NextResponse.json({
                success: true,
                data: newCheckin,
                message: 'Check-in submitted successfully'
            }, { status: 201 });
        }

    } catch (error) {
        console.error('Error creating wellness check-in:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create wellness check-in'
        }, { status: 500 });
    }
}
