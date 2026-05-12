import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';

const router = Router();

// Cast authMiddleware to any to bypass type checking
const auth = authMiddleware as any;

// Sync user from Clerk webhook or manual sync
router.post('/sync', auth, loadUserMiddleware, async (req: Request, res: Response) => {
  try {
    if (req.user) {
      return res.json({ success: true, user: req.user });
    }
    
    // User not found in DB, will be created by webhook
    res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

// Get current user
router.get('/me', auth, loadUserMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

export { router as authRouter };