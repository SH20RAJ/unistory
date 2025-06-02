import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { reports, users, posts } from "@/db/schema";
import { eq, desc, and, or, like, isNull } from "drizzle-orm";

export async function GET(request) {
    try {
        const db = getDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const category = searchParams.get('category');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search');

        // Build filter conditions
        let conditions = [];

        if (status && status !== 'all') {
            conditions.push(eq(reports.status, status));
        }

        if (priority && priority !== 'all') {
            conditions.push(eq(reports.priority, priority));
        }

        if (category && category !== 'all') {
            conditions.push(eq(reports.category, category));
        }

        if (search) {
            conditions.push(
                or(
                    like(reports.reason, `%${search}%`),
                    like(reports.description, `%${search}%`),
                    like(reports.targetId, `%${search}%`)
                )
            );
        }

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Fetch reports with user information
        const reportsData = await db
            .select({
                id: reports.id,
                reporterId: reports.reporterId,
                targetId: reports.targetId,
                targetType: reports.targetType,
                reason: reports.reason,
                category: reports.category,
                description: reports.description,
                status: reports.status,
                priority: reports.priority,
                moderatorId: reports.moderatorId,
                moderatorNotes: reports.moderatorNotes,
                action: reports.action,
                createdAt: reports.createdAt,
                reviewedAt: reports.reviewedAt,
                reporterName: users.name,
                reporterEmail: users.email,
            })
            .from(reports)
            .leftJoin(users, eq(reports.reporterId, users.id))
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(desc(reports.createdAt))
            .limit(limit)
            .offset(offset);

        // Get total count for pagination
        const totalCountResult = await db
            .select({ count: reports.id })
            .from(reports)
            .where(conditions.length > 0 ? and(...conditions) : undefined);

        const total = totalCountResult.length;

        // Format the response to match the mock data structure
        const formattedReports = reportsData.map(report => ({
            id: report.id,
            type: report.category.toLowerCase().replace(' ', '_'),
            content: report.description || report.reason,
            postId: report.targetId,
            postType: report.targetType,
            reportedBy: report.reporterName || 'Anonymous User',
            reportedAt: new Date(report.createdAt).toLocaleString(),
            status: report.status,
            priority: report.priority,
            category: report.category,
            moderatorNotes: report.moderatorNotes || '',
            originalPost: `[Content from ${report.targetType} ${report.targetId}]`,
            reportReason: report.reason
        }));

        return NextResponse.json({
            success: true,
            data: {
                reports: formattedReports,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching reports:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reports' },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { reportId, status, moderatorNotes, action, moderatorId } = body;

        if (!reportId || !status) {
            return NextResponse.json(
                { success: false, error: 'Report ID and status are required' },
                { status: 400 }
            );
        }

        // Update the report
        const updatedReport = await db
            .update(reports)
            .set({
                status,
                moderatorNotes: moderatorNotes || null,
                action: action || null,
                moderatorId: moderatorId || null,
                reviewedAt: new Date()
            })
            .where(eq(reports.id, reportId))
            .returning();

        if (updatedReport.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Report not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedReport[0]
        });

    } catch (error) {
        console.error('Error updating report:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update report' },
            { status: 500 }
        );
    }
}
