import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://studyai:studyai_dev@localhost:5432/studyai',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // Auth (Clerk)
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || '',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || '',
  
  // Payments (Stripe)
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  STRIPE_PRICE_ID_PREMIUM: process.env.STRIPE_PRICE_ID_PREMIUM || '',
  
  // AI (OpenRouter)
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // Email (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'noreply@study.ia.br',
  
  // App
  APP_URL: process.env.APP_URL || 'http://localhost:5173',
  API_URL: process.env.API_URL || 'http://localhost:3000',
} as const;