export const env = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  APP_URL: process.env.APP_URL || 'http://localhost:5173',
} as const;