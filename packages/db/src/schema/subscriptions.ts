import { pgTable, uuid, text, timestamp, pgEnum, decimal, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'canceled', 'past_due', 'unpaid']);

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
  status: subscriptionStatusEnum('status').default('active'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: integer('cancel_at_period_end').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const aiUsageLog = pgTable('ai_usage_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(),
  model: text('model').notNull(),
  toolName: text('tool_name'),
  promptTokens: integer('prompt_tokens').default(0),
  completionTokens: integer('completion_tokens').default(0),
  totalTokens: integer('total_tokens').default(0),
  costUsd: decimal('cost_usd', { precision: 10, scale: 6 }),
  cached: integer('cached').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});