import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { notes } from "@/db/schema";
import { getDB } from "@/db";

// GET all notes
export async function GET() {
    try {
        const db = getDB();
        const allNotes = await db.select().from(notes).orderBy(desc(notes.createdAt));
        return NextResponse.json(allNotes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}

// POST new note
export async function POST(request) {
    try {
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const db = getDB();
        const newNote = await db.insert(notes).values({
            title,
            content,
        }).returning();

        return NextResponse.json(newNote[0], { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
    }
}