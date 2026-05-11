import { pgTable, uuid, text, timestamp, pgEnum, real, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';

export const memoryTypeEnum = pgEnum('memory_type', ['profile', 'date', 'context', 'preference', 'achievement']);

export const tiagaoMemory = pgTable('tiagao_memory', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  memoryType: memoryTypeEnum('memory_type').notNull(),
  content: jsonb('content').notNull(),
  relevanceScore: real('relevance_score').default(1.0),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
});

export const tutorConversations = pgTable('tutor_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tutorMessages = pgTable('tutor_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => tutorConversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user' | 'assistant' | 'system' | 'tool'
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  toolResults: jsonb('tool_results'),
  createdAt: timestamp('created_at').defaultNow(),
});