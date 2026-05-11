import { pgTable, uuid, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const activityTypeEnum = pgEnum('activity_type', [
  'login',
  'study_session',
  'flashcard_review',
  'simulado_completed',
  'redacao_submitted',
  'tutor_chat',
  'caderno_upload',
  'achievement_unlocked',
]);

export const activityEvents = pgTable('activity_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: activityTypeEnum('type').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const dailyMetrics = pgTable('daily_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  studyMinutes: integer('study_minutes').default(0),
  flashcardsReviewed: integer('flashcards_reviewed').default(0),
  tutorMessages: integer('tutor_messages').default(0),
  simuladosCompleted: integer('simulados_completed').default(0),
  streakDay: integer('streak_day').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon'),
  requirement: jsonb('requirement').notNull(),
  points: integer('points').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementId: uuid('achievement_id').notNull().references(() => achievements.id, { onDelete: 'cascade' }),
  unlockedAt: timestamp('unlocked_at').defaultNow(),
});