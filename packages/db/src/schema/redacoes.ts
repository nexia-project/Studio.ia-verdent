import { pgTable, uuid, text, timestamp, integer, pgEnum, jsonb, real } from 'drizzle-orm/pg-core';
import { users } from './users';

export const redacaoStatusEnum = pgEnum('redacao_status', ['draft', 'submitted', 'corrected']);

export const redacoes = pgTable('redacoes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  prompt: text('prompt').notNull(),
  content: text('content').notNull(),
  status: redacaoStatusEnum('status').default('draft'),
  // 5 competências ENEM
  competencias: jsonb('competencias').$type<{
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    c5: number;
  }>(),
  notaFinal: real('nota_final'),
  feedback: text('feedback'),
  corrections: jsonb('corrections').$type<RedacaoCorrection[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  correctedAt: timestamp('corrected_at'),
});

export interface RedacaoCorrection {
  paragraph: number;
  type: 'grammar' | 'cohesion' | 'argumentation' | 'vocabulary' | 'structure';
  comment: string;
  suggestion?: string;
}