import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { notes } from "@/db/schema";
import { getDB } from "@/db";

// GET single note
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const db = getDB();
        const note = await db.select().from(notes).where(eq(notes.id, parseInt(id))).limit(1);

        if (note.length === 0) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json(note[0]);
    } catch (error) {
        console.error("Error fetching note:", error);
        return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
    }
}

// PUT update note
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const db = getDB();
        const updatedNote = await db
            .update(notes)
            .set({
                title,
                content,
                updatedAt: new Date(),
            })
            .where(eq(notes.id, parseInt(id)))
            .returning();

        if (updatedNote.length === 0) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json(updatedNote[0]);
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
    }
}

// DELETE note
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const db = getDB();

        const deletedNote = await db
            .delete(notes)
            .where(eq(notes.id, parseInt(id)))
            .returning();

        if (deletedNote.length === 0) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
    }
}
