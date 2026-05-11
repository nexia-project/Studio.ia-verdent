import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { env } from '../config/env';

export const authMiddleware = ClerkExpressRequireAuth({
  secretKey: env.CLERK_SECRET_KEY,
  onError: (error) => {
    console.error('Auth error:', error);
  },
});

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }
  return authMiddleware(req, res, next);
};