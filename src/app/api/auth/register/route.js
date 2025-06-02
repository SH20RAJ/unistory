import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, userStats } from '@/db/schema';
import { generateReferralCode } from '@/lib/referral';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { fullName, email, password, university, major, graduationYear, referralCode } = await request.json();

        // Validate required fields
        if (!fullName || !email || !password || !university || !major || !graduationYear) {
            return NextResponse.json({ 
                success: false, 
                error: 'All fields are required' 
            }, { status: 400 });
        }

        // Validate email format
        if (!email.endsWith('.edu') && !email.includes('@university.')) {
            return NextResponse.json({ 
                success: false, 
                error: 'Please use a valid .edu email address' 
            }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
        if (existingUser) {
            return NextResponse.json({ 
                success: false, 
                error: 'User already exists with this email' 
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate unique referral code for the new user
        const userReferralCode = generateReferralCode();

        // Create user
        const newUser = await db.insert(users).values({
            id: Date.now().toString(), // Simple ID generation - use proper UUID in production
            fullName,
            email,
            password: hashedPassword,
            university,
            major,
            graduationYear: parseInt(graduationYear),
            referralCode: userReferralCode,
            referredBy: referralCode || null,
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();

        // Create user stats
        await db.insert(userStats).values({
            userId: newUser[0].id,
            totalReferrals: 0,
            successfulReferrals: 0,
            totalRewards: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json({ 
            success: true, 
            userId: newUser[0].id,
            message: 'Account created successfully' 
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'An error occurred during registration' 
        }, { status: 500 });
    }
}
