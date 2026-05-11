import { pgTable, uuid, text, timestamp, real, integer, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const flashcardDecks = pgTable('flashcard_decks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  subject: text('subject'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const flashcards = pgTable('flashcards', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').notNull().references(() => flashcardDecks.id, { onDelete: 'cascade' }),
  front: text('front').notNull(),
  back: text('back').notNull(),
  // SM-2 Algorithm fields
  nextReview: timestamp('next_review'),
  easeFactor: real('ease_factor').default(2.5),
  repetitions: integer('repetitions').default(0),
  interval: integer('interval').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const studyPlans = pgTable('study_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  subjects: text('subjects').array(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  dailyHours: integer('daily_hours').default(2),
  status: pgEnum('plan_status', ['active', 'paused', 'completed'])('status').default('active'),
  progress: real('progress').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});