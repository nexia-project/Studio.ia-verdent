import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { rateLimitMiddleware } from './middlewares/rate-limit';
import { errorHandler } from './middlewares/error-handler';
import { router } from './routes';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env.APP_URL,
  credentials: true,
}));

// Logging
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
app.use(rateLimitMiddleware());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/v1', router);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});