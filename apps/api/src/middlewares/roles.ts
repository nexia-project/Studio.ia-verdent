import { Request, Response, NextFunction } from 'express';
import { db } from '@studyai/db';
import { eq } from 'drizzle-orm';
import { users } from '@studyai/db';
import { ROLE_PERMISSIONS, type Permission, type UserRole } from '@studyai/types';

interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
  user?: {
    id: string;
    role: UserRole;
    plan: string;
  };
}

export const loadUserMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.auth?.userId) {
      return next();
    }

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, req.auth.userId),
    });

    if (user) {
      req.user = {
        id: user.id,
        role: user.role,
        plan: user.plan,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};

export const requirePermission = (...requiredPermissions: Permission[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role];
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};