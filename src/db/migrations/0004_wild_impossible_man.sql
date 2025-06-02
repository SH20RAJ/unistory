PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`bio` text,
	`avatar` text,
	`cover_image` text,
	`major` text,
	`year` text,
	`university` text,
	`location` text,
	`joined_date` integer NOT NULL,
	`is_verified` integer DEFAULT false,
	`status` text DEFAULT 'active',
	`last_active` integer,
	`profile_visibility` text DEFAULT 'public',
	`show_email` integer DEFAULT false,
	`show_stats` integer DEFAULT true,
	`allow_messages` integer DEFAULT true,
	`show_mood` integer DEFAULT true,
	`instagram` text,
	`twitter` text,
	`github` text,
	`linkedin` text,
	`website` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "username", "name", "bio", "avatar", "cover_image", "major", "year", "university", "location", "joined_date", "is_verified", "status", "last_active", "profile_visibility", "show_email", "show_stats", "allow_messages", "show_mood", "instagram", "twitter", "github", "linkedin", "website", "created_at", "updated_at") SELECT "id", "email", "username", "name", "bio", "avatar", "cover_image", "major", "year", "university", "location", "joined_date", "is_verified", "status", "last_active", "profile_visibility", "show_email", "show_stats", "allow_messages", "show_mood", "instagram", "twitter", "github", "linkedin", "website", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);