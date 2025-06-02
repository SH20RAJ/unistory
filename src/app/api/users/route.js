import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/utils/idGenerator";

// GET /api/users - Get user by email or create if doesn't exist
export async function GET(request) {
  try {
    const db = getDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, error: "Email parameter required" }, { status: 400 });
    }

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request) {
  try {
    const db = getDB();
    const body = await request.json();
    const { email, name, image, username, university, major, year } = body;

    if (!email || !name) {
      return NextResponse.json({ success: false, error: "Email and name are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
    }

    // Generate unique username if not provided
    let finalUsername = username;
    if (!finalUsername) {
      const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      finalUsername = baseUsername;

      // Check if username exists and append number if needed
      let counter = 1;
      while (true) {
        const usernameCheck = await db.select().from(users).where(eq(users.username, finalUsername)).limit(1);
        if (usernameCheck.length === 0) break;
        finalUsername = `${baseUsername}${counter}`;
        counter++;
      }
    }

    const newUser = {
      id: generateId('user'),
      email,
      name,
      username: finalUsername,
      avatar: image || null,
      university: university || extractUniversityFromEmail(email) || null, // Allow null for OAuth users
      major: major || null,
      year: year || null,
      joinedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.insert(users).values(newUser).returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}

// PUT /api/users - Update user (for onboarding completion)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { email, ...updateData } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // Update the user
    const result = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.email, email))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

function extractUniversityFromEmail(email) {
  if (!email.endsWith('.edu')) return null;

  const domain = email.split('@')[1];
  const universityPart = domain.replace('.edu', '');

  // Common university mappings
  const universityMappings = {
    'stanford': 'Stanford University',
    'mit': 'Massachusetts Institute of Technology',
    'harvard': 'Harvard University',
    'berkeley': 'UC Berkeley',
    'ucla': 'UCLA',
    'usc': 'University of Southern California',
    'nyu': 'New York University',
    'columbia': 'Columbia University',
    'yale': 'Yale University',
    'princeton': 'Princeton University'
  };

  return universityMappings[universityPart] ||
    universityPart.split('.')[0].replace(/([A-Z])/g, ' $1').trim() ||
    'Unknown University';
}
