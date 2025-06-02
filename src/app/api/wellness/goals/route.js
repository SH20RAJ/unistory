import { NextResponse } from 'next/server';

// Mock data for wellness goals
let mockGoals = [
    {
        id: 1,
        userId: '1',
        title: 'Check in daily for 30 days',
        description: 'Complete daily wellness check-ins for a full month',
        type: 'streak',
        target: 30,
        current: 7,
        unit: 'days',
        isActive: true,
        createdAt: '2024-01-14T00:00:00Z'
    },
    {
        id: 2,
        userId: '1',
        title: 'Exercise 3x per week',
        description: 'Include exercise in your activities 3 times this week',
        type: 'weekly',
        target: 3,
        current: 2,
        unit: 'times',
        isActive: true,
        createdAt: '2024-01-14T00:00:00Z'
    },
    {
        id: 3,
        userId: '1',
        title: 'Maintain average mood of 4+',
        description: 'Keep your weekly average mood at 4 or higher',
        type: 'average',
        target: 4,
        current: 3.8,
        unit: 'rating',
        isActive: true,
        createdAt: '2024-01-14T00:00:00Z'
    }
];

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

        // Filter goals by user
        const userGoals = mockGoals.filter(goal => goal.userId === userId && goal.isActive);

        // Calculate progress for each goal
        const goalsWithProgress = userGoals.map(goal => ({
            ...goal,
            progress: Math.min(100, (goal.current / goal.target) * 100),
            isCompleted: goal.current >= goal.target
        }));

        return NextResponse.json({
            success: true,
            data: goalsWithProgress
        });

    } catch (error) {
        console.error('Error fetching wellness goals:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch wellness goals'
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, title, description, type, target, unit } = body;

        if (!userId || !title || !type || !target) {
            return NextResponse.json({
                success: false,
                error: 'userId, title, type, and target are required'
            }, { status: 400 });
        }

        const newGoal = {
            id: Math.max(...mockGoals.map(g => g.id), 0) + 1,
            userId,
            title,
            description: description || '',
            type,
            target,
            current: 0,
            unit: unit || 'times',
            isActive: true,
            createdAt: new Date().toISOString()
        };

        mockGoals.push(newGoal);

        return NextResponse.json({
            success: true,
            data: newGoal,
            message: 'Goal created successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating wellness goal:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create wellness goal'
        }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { goalId, updates } = body;

        if (!goalId) {
            return NextResponse.json({
                success: false,
                error: 'Goal ID is required'
            }, { status: 400 });
        }

        const goalIndex = mockGoals.findIndex(goal => goal.id === goalId);

        if (goalIndex === -1) {
            return NextResponse.json({
                success: false,
                error: 'Goal not found'
            }, { status: 404 });
        }

        // Update the goal
        mockGoals[goalIndex] = {
            ...mockGoals[goalIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            data: mockGoals[goalIndex],
            message: 'Goal updated successfully'
        });

    } catch (error) {
        console.error('Error updating wellness goal:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to update wellness goal'
        }, { status: 500 });
    }
}
