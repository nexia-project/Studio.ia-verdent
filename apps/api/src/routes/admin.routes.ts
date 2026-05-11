import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();

router.use(authMiddleware, loadUserMiddleware, requireRole('admin'));

router.get('/dashboard', async (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

router.get('/usuarios', async (req, res) => {
  res.json({ message: 'Users management endpoint' });
});

router.patch('/usuarios/:id/role', async (req, res) => {
  res.json({ message: 'Update user role endpoint' });
});

router.patch('/usuarios/:id/subscription', async (req, res) => {
  res.json({ message: 'Override subscription endpoint' });
});

export { router as adminRouter };