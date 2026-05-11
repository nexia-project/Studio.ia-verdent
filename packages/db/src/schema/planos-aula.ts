import { pgTable, uuid, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { turmas } from './turmas';

export const planoVersaoEnum = pgEnum('plano_versao', ['padrao', 'dificil', 'avancada', 'inclusiva', 'remota', 'hibrida']);

export const planosAula = pgTable('planos_aula', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  subject: text('subject').notNull(),
  topic: text('topic').notNull(),
  grade: text('grade'),
  duration: integer('duration').notNull(), // minutes
  objectives: text('objectives').array(),
  bnccCodes: text('bncc_codes').array(),
  content: jsonb('content').notNull(), // Structured lesson plan content
  version: planoVersaoEnum('version').default('padrao'),
  isTemplate: integer('is_template').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});