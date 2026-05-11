import { pgTable, uuid, text, timestamp, pgEnum, jsonb, real, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { turmas } from './turmas';

export const questionDifficultyEnum = pgEnum('question_difficulty', ['easy', 'medium', 'hard']);
export const questionTypeEnum = pgEnum('question_type', ['multiple_choice', 'open', 'essay']);

export const questoes = pgTable('questoes', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  statement: text('statement').notNull(),
  alternatives: text('alternatives').array(),
  correctAnswer: integer('correct_answer'),
  explanation: text('explanation'),
  subject: text('subject').notNull(),
  topic: text('topic'),
  difficulty: questionDifficultyEnum('difficulty').default('medium'),
  type: questionTypeEnum('type').default('multiple_choice'),
  bnccCode: text('bncc_code'),
  tags: text('tags').array(),
  isPublic: real('is_public').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const provas = pgTable('provas', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  turmaId: uuid('turma_id').references(() => turmas.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  questions: jsonb('questions').notNull().$type<string[]>(), // Array of question IDs
  timeLimit: integer('time_limit'), // minutes
  dueDate: timestamp('due_date'),
  isPublished: real('is_published').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});