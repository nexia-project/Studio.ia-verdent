import { pgTable, uuid, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['student', 'teacher', 'institution_admin', 'government', 'admin']);
export const planEnum = pgEnum('plan', ['free', 'premium', 'institution']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').notNull().default('student'),
  plan: planEnum('plan').notNull().default('free'),
  institutionId: uuid('institution_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  bio: text('bio'),
  school: text('school'),
  grade: text('grade'),
  subjects: text('subjects').array(),
  goals: text('goals').array(),
  studyHoursPerDay: integer('study_hours_per_day').default(2),
  preferredStudyTime: text('preferred_study_time').default('evening'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});