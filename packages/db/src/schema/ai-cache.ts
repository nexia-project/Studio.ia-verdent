import { pgTable, uuid, text, timestamp, jsonb, decimal, integer } from 'drizzle-orm/pg-core';

export const aiCache = pgTable('ai_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  hash: text('hash').notNull().unique(),
  provider: text('provider').notNull(),
  model: text('model').notNull(),
  prompt: text('prompt').notNull(),
  response: jsonb('response').notNull(),
  costUsd: decimal('cost_usd', { precision: 10, scale: 6 }),
  hitCount: integer('hit_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
});

export const knowledgeBase = pgTable('knowledge_base', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  subject: text('subject'),
  topic: text('topic'),
  tags: text('tags').array(),
  source: text('source'),
  embedding: jsonb('embedding'), // For future vector search
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});