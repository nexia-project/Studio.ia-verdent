import { pgTable, uuid, text, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const institutions = pgTable('institutions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  phone: text('phone'),
  email: text('email'),
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const turmas = pgTable('turmas', {
  id: uuid('id').primaryKey().defaultRandom(),
  institutionId: uuid('institution_id').notNull().references(() => institutions.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  subject: text('subject').notNull(),
  grade: text('grade'),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const turmaStudents = pgTable('turma_students', {
  id: uuid('id').primaryKey().defaultRandom(),
  turmaId: uuid('turma_id').notNull().references(() => turmas.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: timestamp('joined_at').defaultNow(),
});