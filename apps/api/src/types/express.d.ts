import type { UserRole } from '@studyai/types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        plan: string;
      };
    }
  }
}

export {};
