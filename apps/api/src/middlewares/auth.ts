import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const authMiddleware = ClerkExpressRequireAuth({
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