import { getDB } from '@/db';
import { events, users, clubs } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { generateSimpleId } from '@/utils/idGenerator';

export async function GET() {
    try {
        const db = getDB();
        const eventsData = await db
            .select()
            .from(events)
            .orderBy(desc(events.date));

        return Response.json({
            success: true,
            data: eventsData
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return Response.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const {
            title,
            description,
            category,
            date,
            time,
            endTime,
            location,
            organizer,
            organizerId,
            clubId,
            capacity,
            price = "Free",
            isPublic = true,
            requiresRegistration = false,
            image,
            tags
        } = body;

        if (!title || !description || !category || !date || !location || !organizer) {
            return Response.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newEvent = await db.insert(events).values({
            id: eventId,
            title,
            description,
            category,
            date,
            time,
            endTime,
            location,
            organizer,
            organizerId,
            clubId,
            capacity,
            price,
            isPublic,
            requiresRegistration,
            image,
            tags: tags ? JSON.stringify(tags) : null,
            attendees: 0,
            interested: 0,
            isFeatured: false,
            status: 'upcoming'
        }).returning();

        return Response.json({
            success: true,
            data: newEvent[0]
        });
    } catch (error) {
        console.error('Error creating event:', error);
        return Response.json(
            { success: false, error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
