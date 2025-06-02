import { getDB } from '@/db';
import { clubs, users, clubMemberships } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { generateSimpleId } from '@/utils/idGenerator';

export async function GET() {
    try {
        const db = getDB();
        // Fetch clubs with member counts
        const clubsWithDetails = await db
            .select({
                id: clubs.id,
                name: clubs.name,
                description: clubs.description,
                image: clubs.image,
                category: clubs.category,
                president: clubs.president,
                founded: clubs.founded,
                location: clubs.location,
                memberCount: clubs.memberCount,
                rating: clubs.rating,
                website: clubs.website,
                email: clubs.email,
                instagram: clubs.instagram,
                twitter: clubs.twitter,
                achievements: clubs.achievements,
                tags: clubs.tags,
                nextEvent: clubs.nextEvent,
                nextEventDate: clubs.nextEventDate,
                nextEventLocation: clubs.nextEventLocation,
                status: clubs.status,
                createdAt: clubs.createdAt
            })
            .from(clubs)
            .where(eq(clubs.status, 'active'))
            .orderBy(desc(clubs.createdAt));

        return Response.json({
            success: true,
            data: clubsWithDetails
        });
    } catch (error) {
        console.error('Error fetching clubs:', error);
        return Response.json(
            { success: false, error: 'Failed to fetch clubs' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { name, description, category, imageUrl, location, meetingTime, creatorId } = body;

        if (!name || !creatorId) {
            return Response.json(
                { success: false, error: 'Name and creatorId are required' },
                { status: 400 }
            );
        }

        const newClub = await db.insert(clubs).values({
            id: generateSimpleId('club'),
            name,
            description,
            category,
            imageUrl,
            location,
            meetingTime,
            isActive: true,
            creatorId,
            createdAt: new Date()
        }).returning();

        // Automatically add creator as a member with admin role
        await db.insert(clubMemberships).values({
            id: generateSimpleId('clubmember'),
            userId: creatorId,
            clubId: newClub[0].id,
            role: 'admin',
            joinedAt: new Date(),
            isActive: true
        });

        return Response.json({
            success: true,
            data: newClub[0]
        });
    } catch (error) {
        console.error('Error creating club:', error);
        return Response.json(
            { success: false, error: 'Failed to create club' },
            { status: 500 }
        );
    }
}
