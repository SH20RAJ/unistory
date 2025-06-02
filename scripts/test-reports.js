// Test script to create sample reports for admin page testing
import { db } from "../src/db/index.js";
import { reports, posts, users } from "../src/db/schema.js";

async function createTestReports() {
    try {
        console.log('Creating test reports...');

        // Create some test reports
        const testReports = [
            {
                id: "report_001",
                reporterId: "user_001",
                targetId: "post_001",
                targetType: "post",
                reason: "Contains inappropriate language and offensive content",
                category: "Inappropriate Content",
                description: "This post contains hate speech and discriminatory language targeting specific groups",
                status: "pending",
                priority: "high",
                moderatorNotes: null,
                action: null,
                createdAt: new Date(),
                reviewedAt: null
            },
            {
                id: "report_002",
                reporterId: "user_002",
                targetId: "post_002",
                targetType: "post",
                reason: "Spam content promoting external services",
                category: "Spam",
                description: "User posting repetitive promotional content for external tutoring services",
                status: "pending",
                priority: "medium",
                moderatorNotes: null,
                action: null,
                createdAt: new Date(),
                reviewedAt: null
            },
            {
                id: "report_003",
                reporterId: "user_003",
                targetId: "user_004",
                targetType: "user",
                reason: "Harassment and bullying behavior",
                category: "Harassment",
                description: "User engaging in targeted harassment of other students in comments",
                status: "investigating",
                priority: "high",
                moderatorNotes: "Initial review completed, gathering additional evidence",
                action: "under_review",
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                reviewedAt: new Date()
            },
            {
                id: "report_004",
                reporterId: "user_001",
                targetId: "post_003",
                targetType: "post",
                reason: "Misinformation about mental health resources",
                category: "Misinformation",
                description: "Post spreading false information about campus mental health services",
                status: "resolved",
                priority: "high",
                moderatorNotes: "Consulted with mental health professionals. Content was misleading and has been removed.",
                action: "content_removed",
                createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
                reviewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            {
                id: "report_005",
                reporterId: "user_005",
                targetId: "post_004",
                targetType: "post",
                reason: "Fake academic information",
                category: "Misinformation",
                description: "Post contains false information about course requirements and grading",
                status: "dismissed",
                priority: "low",
                moderatorNotes: "Review determined content was opinion-based, not factual misinformation",
                action: "no_action_required",
                createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
                reviewedAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
            }
        ];

        // Insert the test reports
        for (const report of testReports) {
            await db.insert(reports).values(report);
            console.log(`Created report: ${report.id}`);
        }

        console.log('Test reports created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error creating test reports:', error);
        process.exit(1);
    }
}

createTestReports();
