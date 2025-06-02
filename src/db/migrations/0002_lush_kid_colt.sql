CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`toUserId` text NOT NULL,
	`fromUserId` text,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`isRead` integer DEFAULT false,
	`priority` text DEFAULT 'medium',
	`actionUrl` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	FOREIGN KEY (`toUserId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`fromUserId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
