import { sqliteTable, text, integer, real, blob } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Users table - Core user information
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  coverImage: text("cover_image"),
  major: text("major"),
  year: text("year"), // Freshman, Sophomore, Junior, Senior
  university: text("university"), // Made nullable for initial OAuth registration
  location: text("location"),
  joinedDate: integer("joined_date", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  status: text("status").default("active"), // active, suspended, banned
  lastActive: integer("last_active", { mode: "timestamp" }).$defaultFn(() => new Date()),

  // Privacy settings
  profileVisibility: text("profile_visibility").default("public"), // public, friends, private
  showEmail: integer("show_email", { mode: "boolean" }).default(false),
  showStats: integer("show_stats", { mode: "boolean" }).default(true),
  allowMessages: integer("allow_messages", { mode: "boolean" }).default(true),
  showMood: integer("show_mood", { mode: "boolean" }).default(true),

  // Social links
  instagram: text("instagram"),
  twitter: text("twitter"),
  github: text("github"),
  linkedin: text("linkedin"),
  website: text("website"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Posts table - All types of posts (social, confessions, study groups, events)
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  authorId: text("author_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  type: text("type").notNull(), // social, confession, study, event, crush

  // Post metadata
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).default(false),
  mood: text("mood"), // emoji for mood tracking
  category: text("category"), // Academic, Relationships, Social, etc.
  tags: text("tags"), // JSON array of tags
  location: text("location"),

  // Engagement metrics
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  views: integer("views").default(0),

  // Post settings
  audience: text("audience").default("public"), // public, friends, circle, private
  allowComments: integer("allow_comments", { mode: "boolean" }).default(true),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  isTrending: integer("is_trending", { mode: "boolean" }).default(false),

  // Circle association
  circleId: text("circle_id").references(() => circles.id, { onDelete: "set null" }),

  // Status
  status: text("status").default("active"), // active, deleted, hidden, reported

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Media attachments for posts
export const postMedia = sqliteTable("post_media", {
  id: text("id").primaryKey(),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // image, video, document, link
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  mimeType: text("mime_type"),
  size: integer("size"),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Comments on posts
export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorId: text("author_id").references(() => users.id, { onDelete: "cascade" }),
  parentId: text("parent_id").references(() => comments.id, { onDelete: "cascade" }), // For reply threads
  content: text("content").notNull(),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).default(false),
  likes: integer("likes").default(0),
  status: text("status").default("active"), // active, deleted, hidden, reported
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Circles/Groups
export const circles = sqliteTable("circles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  avatar: text("avatar"),
  coverImage: text("cover_image"),

  // Circle settings
  isPrivate: integer("is_private", { mode: "boolean" }).default(false),
  requireApproval: integer("require_approval", { mode: "boolean" }).default(false),
  category: text("category").notNull(), // Academic, Career, Hobby, Entertainment, Community, Wellness, Sports
  college: text("college").notNull(),

  // Member limits
  maxMembers: integer("max_members"),
  memberCount: integer("member_count").default(0),

  // Circle rules and info
  rules: text("rules"), // JSON array of rules
  tags: text("tags"), // JSON array of tags

  // Creator info
  createdBy: text("created_by").notNull().references(() => users.id),

  // Status
  status: text("status").default("active"), // active, archived, suspended

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Circle memberships
export const circleMemberships = sqliteTable("circle_memberships", {
  id: text("id").primaryKey(),
  circleId: text("circle_id").notNull().references(() => circles.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").default("member"), // owner, admin, moderator, member
  status: text("status").default("active"), // active, pending, banned, left
  isMuted: integer("is_muted", { mode: "boolean" }).default(false),
  joinedAt: integer("joined_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  leftAt: integer("left_at", { mode: "timestamp" }),
});

// Clubs and Organizations
export const clubs = sqliteTable("clubs", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"), // emoji or image URL
  category: text("category").notNull(), // Technology, Arts, Academic, Wellness, Entertainment, Environment, etc.

  // Club info
  president: text("president"),
  founded: text("founded"),
  location: text("location"),
  memberCount: integer("member_count").default(0),
  rating: real("rating").default(0),

  // Contact info
  website: text("website"),
  email: text("email"),
  instagram: text("instagram"),
  twitter: text("twitter"),

  // Club details
  achievements: text("achievements"), // JSON array
  tags: text("tags"), // JSON array

  // Next event info
  nextEvent: text("next_event"),
  nextEventDate: text("next_event_date"),
  nextEventLocation: text("next_event_location"),

  // Status
  status: text("status").default("active"), // active, inactive, suspended

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Club memberships
export const clubMemberships = sqliteTable("club_memberships", {
  id: text("id").primaryKey(),
  clubId: text("club_id").notNull().references(() => clubs.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").default("member"), // president, officer, member
  joinedAt: integer("joined_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Events
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),

  // Event details
  category: text("category").notNull(), // career, academic, social, wellness, sports, cultural
  date: text("date").notNull(),
  time: text("time"),
  endTime: text("end_time"),
  location: text("location").notNull(),

  // Organizer info
  organizer: text("organizer").notNull(),
  organizerAvatar: text("organizer_avatar"),
  organizerId: text("organizer_id").references(() => users.id),
  clubId: text("club_id").references(() => clubs.id),

  // Event metrics
  attendees: integer("attendees").default(0),
  interested: integer("interested").default(0),
  capacity: integer("capacity"),

  // Event settings
  price: text("price").default("Free"),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  requiresRegistration: integer("requires_registration", { mode: "boolean" }).default(false),

  // Event media
  image: text("image"),
  tags: text("tags"), // JSON array

  // Featured status
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),

  // Status
  status: text("status").default("upcoming"), // upcoming, ongoing, completed, cancelled

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Event attendance
export const eventAttendance = sqliteTable("event_attendance", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // going, interested, not_going
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// User connections/friendships
export const connections = sqliteTable("connections", {
  id: text("id").primaryKey(),
  requesterId: text("requester_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  addresseeId: text("addressee_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status").default("pending"), // pending, accepted, blocked
  type: text("type").default("friend"), // friend, bestie, study_partner
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  acceptedAt: integer("accepted_at", { mode: "timestamp" }),
});

// Follow relationships
export const follows = sqliteTable("follows", {
  id: text("id").primaryKey(),
  followerId: text("follower_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  followingId: text("following_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

// Messages/Conversations
export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // direct, group
  name: text("name"), // For group conversations
  avatar: text("avatar"), // For group conversations
  lastMessageId: text("last_message_id"),
  lastActivity: integer("last_activity", { mode: "timestamp" }).$defaultFn(() => new Date()),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Conversation participants
export const conversationParticipants = sqliteTable("conversation_participants", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").default("member"), // admin, member
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  joinedAt: integer("joined_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastRead: integer("last_read", { mode: "timestamp" }),
});

// Messages
export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  senderId: text("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  type: text("type").default("text"), // text, image, file, system
  mediaUrl: text("media_url"),
  isEdited: integer("is_edited", { mode: "boolean" }).default(false),
  editedAt: integer("edited_at", { mode: "timestamp" }),
  replyToId: text("reply_to_id").references(() => messages.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Likes (for posts, comments)
export const likes = sqliteTable("likes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetId: text("target_id").notNull(), // post_id or comment_id
  targetType: text("target_type").notNull(), // post, comment
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Bookmarks/Saves
export const bookmarks = sqliteTable("bookmarks", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Secret crushes
export const secretCrushes = sqliteTable("secret_crushes", {
  id: text("id").primaryKey(),
  senderId: text("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetId: text("target_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  isRevealed: integer("is_revealed", { mode: "boolean" }).default(false),
  isMatched: integer("is_matched", { mode: "boolean" }).default(false),
  matchedAt: integer("matched_at", { mode: "timestamp" }),
  status: text("status").default("active"), // active, expired, withdrawn
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Achievements/Badges
export const achievements = sqliteTable("achievements", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // study, social, event, content, special
  type: text("type").notNull(), // streak, milestone, activity, seasonal
  requirement: text("requirement").notNull(), // JSON object describing requirement
  points: integer("points").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// User achievements
export const userAchievements = sqliteTable("user_achievements", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  achievementId: text("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade" }),
  progress: integer("progress").default(0),
  isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// User stats tracking
export const userStats = sqliteTable("user_stats", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  // Content stats
  postsCount: integer("posts_count").default(0),
  commentsCount: integer("comments_count").default(0),
  likesReceived: integer("likes_received").default(0),
  likesGiven: integer("likes_given").default(0),

  // Social stats
  connectionsCount: integer("connections_count").default(0),
  messagesCount: integer("messages_count").default(0),

  // Study stats
  studyScore: integer("study_score").default(0),
  studyStreak: integer("study_streak").default(0),
  studyTimeThisWeek: integer("study_time_this_week").default(0), // in minutes

  // Event stats
  eventsAttended: integer("events_attended").default(0),
  eventsCreated: integer("events_created").default(0),

  // Anonymous content stats
  confessionsSent: integer("confessions_sent").default(0),
  crushesSent: integer("crushes_sent").default(0),

  // Club participation
  clubsMember: integer("clubs_member").default(0),

  // Engagement score
  engagementScore: integer("engagement_score").default(0),

  // Last updated
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Mood tracking
export const moods = sqliteTable("moods", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mood: text("mood").notNull(), // emoji
  note: text("note"),
  date: text("date").notNull(), // YYYY-MM-DD format
  streak: integer("streak").default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Study sessions
export const studySessions = sqliteTable("study_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject"),
  duration: integer("duration").notNull(), // in minutes
  notes: text("notes"),
  focusScore: integer("focus_score"), // 1-100
  sessionType: text("session_type").default("solo"), // solo, group, pomodoro
  date: text("date").notNull(), // YYYY-MM-DD format
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Reports and moderation
export const reports = sqliteTable("reports", {
  id: text("id").primaryKey(),
  reporterId: text("reporter_id").references(() => users.id, { onDelete: "set null" }),
  targetId: text("target_id").notNull(), // post_id, comment_id, user_id
  targetType: text("target_type").notNull(), // post, comment, user
  reason: text("reason").notNull(),
  category: text("category").notNull(), // spam, harassment, inappropriate, fake
  description: text("description"),
  status: text("status").default("pending"), // pending, reviewed, resolved, dismissed
  priority: text("priority").default("medium"), // low, medium, high, urgent
  moderatorId: text("moderator_id").references(() => users.id),
  moderatorNotes: text("moderator_notes"),
  action: text("action"), // warning, content_removal, account_suspension, etc.
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
});

// Admin audit log
export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  adminId: text("admin_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type"),
  targetId: text("target_id"),
  details: text("details"), // JSON object
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Keep the original notes table for existing functionality
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Notifications table - User notifications system
export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(),
  toUserId: text("toUserId").notNull().references(() => users.id, { onDelete: "cascade" }),
  fromUserId: text("fromUserId").references(() => users.id, { onDelete: "set null" }),

  // Notification content
  type: text("type").notNull(), // like, comment, match, study_room, achievement, connection, event, mood_reminder, club_update
  title: text("title").notNull(),
  message: text("message").notNull(),

  // Notification metadata  
  isRead: integer("isRead", { mode: "boolean" }).default(false),
  priority: text("priority").default("medium"), // low, medium, high
  actionUrl: text("actionUrl"),

  // Timestamps
  createdAt: text("createdAt").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updatedAt").notNull().$defaultFn(() => new Date().toISOString()),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  bookmarks: many(bookmarks),
  achievements: many(userAchievements),
  stats: many(userStats),
  moods: many(moods),
  studySessions: many(studySessions),
  sentConnections: many(connections, { relationName: "sentConnections" }),
  receivedConnections: many(connections, { relationName: "receivedConnections" }),
  followers: many(follows, { relationName: "following" }),
  following: many(follows, { relationName: "followers" }),
  sentCrushes: many(secretCrushes, { relationName: "sentCrushes" }),
  receivedCrushes: many(secretCrushes, { relationName: "receivedCrushes" }),
  notifications: many(notifications, { relationName: "receivedNotifications" }),
  sentNotifications: many(notifications, { relationName: "sentNotifications" }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  circle: one(circles, {
    fields: [posts.circleId],
    references: [circles.id],
  }),
  media: many(postMedia),
  comments: many(comments),
  likes: many(likes),
  bookmarks: many(bookmarks),
}));

export const circlesRelations = relations(circles, ({ one, many }) => ({
  creator: one(users, {
    fields: [circles.createdBy],
    references: [users.id],
  }),
  posts: many(posts),
  memberships: many(circleMemberships),
}));

export const clubsRelations = relations(clubs, ({ many }) => ({
  memberships: many(clubMemberships),
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  club: one(clubs, {
    fields: [events.clubId],
    references: [clubs.id],
  }),
  attendance: many(eventAttendance),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  toUser: one(users, {
    fields: [notifications.toUserId],
    references: [users.id],
  }),
  fromUser: one(users, {
    fields: [notifications.fromUserId],
    references: [users.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
  }),
}));