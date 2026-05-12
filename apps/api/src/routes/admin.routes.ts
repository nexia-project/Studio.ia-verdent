import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();
const auth = authMiddleware as any;

router.use(auth, loadUserMiddleware, requireRole('admin'));

router.get('/dashboard', async (req: Request, res: Response) => {
  res.json({ message: 'Admin dashboard' });
});

router.get('/usuarios', async (req: Request, res: Response) => {
  res.json({ message: 'Users management endpoint' });
});

router.patch('/usuarios/:id/role', async (req: Request, res: Response) => {
  res.json({ message: 'Update user role endpoint' });
});

router.patch('/usuarios/:id/subscription', async (req: Request, res: Response) => {
  res.json({ message: 'Override subscription endpoint' });
});

export { router as adminRouter };
