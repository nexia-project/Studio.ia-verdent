import { pgTable, uuid, text, timestamp, integer, pgEnum, jsonb, real } from 'drizzle-orm/pg-core';
import { users } from './users';

export const simuladoAreaEnum = pgEnum('simulado_area', ['linguagens', 'humanas', 'natureza', 'matematica', 'geral']);
export const simuladoStatusEnum = pgEnum('simulado_status', ['not_started', 'in_progress', 'completed']);

export const simulados = pgTable('simulados', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  area: simuladoAreaEnum('area').notNull(),
  questions: jsonb('questions').notNull().$type<Question[]>(),
  timeLimit: integer('time_limit').notNull(), // minutes
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  score: real('score'),
  status: simuladoStatusEnum('status').default('not_started'),
  answers: jsonb('answers').$type<Record<string, number>>(),
  createdAt: timestamp('created_at').defaultNow(),
});

export interface Question {
  id: string;
  statement: string;
  alternatives: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}