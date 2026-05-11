import { pgTable, uuid, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { turmas } from './turmas';
import { provas } from './questoes';

export const atividadeStatusEnum = pgEnum('atividade_status', ['draft', 'published', 'closed']);
export const atividadeSubmissionStatusEnum = pgEnum('atividade_submission_status', ['pending', 'submitted', 'graded']);

export const atividades = pgTable('atividades', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  turmaId: uuid('turma_id').references(() => turmas.id, { onDelete: 'set null' }),
  provaId: uuid('prova_id').references(() => provas.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  instructions: text('instructions'),
  type: text('type').notNull(), // 'exercise', 'essay', 'project', etc.
  dueDate: timestamp('due_date'),
  maxScore: integer('max_score').default(100),
  status: atividadeStatusEnum('status').default('draft'),
  attachments: jsonb('attachments'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const atividadeSubmissions = pgTable('atividade_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  atividadeId: uuid('atividade_id').notNull().references(() => atividades.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content'),
  attachments: jsonb('attachments'),
  status: atividadeSubmissionStatusEnum('status').default('pending'),
  score: integer('score'),
  feedback: text('feedback'),
  aiFeedback: text('ai_feedback'),
  submittedAt: timestamp('submitted_at'),
  gradedAt: timestamp('graded_at'),
  createdAt: timestamp('created_at').defaultNow(),
});