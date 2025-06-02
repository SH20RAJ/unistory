import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { users } from "@/db/schema";
import { ne, sql } from "drizzle-orm";

// GET /api/users/suggestions - Get suggested users to follow
export async function GET(request) {
    try {
        const db = getDB();
        const { searchParams } = new URL(request.url);
        const currentUserEmail = searchParams.get('email');
        const university = searchParams.get('university');
        const limit = parseInt(searchParams.get('limit') || '10');

        let query = db.select({
            id: users.id,
            username: users.username,
            name: users.name,
            avatar: users.avatar,
            bio: users.bio,
            major: users.major,
            year: users.year,
            university: users.university,
            isVerified: users.isVerified
        }).from(users);

        // If current user email is provided, exclude them from suggestions
        if (currentUserEmail) {
            query = query.where(ne(users.email, currentUserEmail));
        }

        // If university is provided, prioritize users from the same university
        if (university) {
            // Get users from the same university first (limit to 70% of requested users)
            const sameUniversityLimit = Math.ceil(limit * 0.7);
            const sameUniversityQuery = db.select({
                id: users.id,
                username: users.username,
                name: users.name,
                avatar: users.avatar,
                bio: users.bio,
                major: users.major,
                year: users.year,
                university: users.university,
                isVerified: users.isVerified
            })
                .from(users)
                .where(sql`${users.university} = ${university}`)
                .limit(sameUniversityLimit)
                .orderBy(sql`RANDOM()`);

            // If current user email is provided, also exclude from same university query
            if (currentUserEmail) {
                sameUniversityQuery.where(ne(users.email, currentUserEmail));
            }

            const sameUniversityUsers = await sameUniversityQuery;

            // If we have enough users from the same university, return them
            // Otherwise, supplement with users from other universities
            if (sameUniversityUsers.length >= limit * 0.5) {
                // Get remaining users from different universities
                const remainingLimit = limit - sameUniversityUsers.length;
                if (remainingLimit > 0) {
                    const otherUsersQuery = db.select({
                        id: users.id,
                        username: users.username,
                        name: users.name,
                        avatar: users.avatar,
                        bio: users.bio,
                        major: users.major,
                        year: users.year,
                        university: users.university,
                        isVerified: users.isVerified
                    })
                        .from(users)
                        .where(sql`${users.university} != ${university}`)
                        .limit(remainingLimit)
                        .orderBy(sql`RANDOM()`);

                    if (currentUserEmail) {
                        otherUsersQuery.where(ne(users.email, currentUserEmail));
                    }

                    const otherUsers = await otherUsersQuery;

                    // Return combined results
                    return NextResponse.json({
                        success: true,
                        data: [...sameUniversityUsers, ...otherUsers]
                    });
                }

                return NextResponse.json({
                    success: true,
                    data: sameUniversityUsers
                });
            }
        }

        // Default query - random users with limit
        query = query.limit(limit).orderBy(sql`RANDOM()`);

        const suggestedUsers = await query;

        return NextResponse.json({
            success: true,
            data: suggestedUsers
        });
    } catch (error) {
        console.error("Error fetching user suggestions:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch user suggestions"
        }, { status: 500 });
    }
}
