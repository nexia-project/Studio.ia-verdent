import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();

router.use(authMiddleware, loadUserMiddleware, requireRole('government', 'admin'));

router.get('/dashboard', async (req, res) => {
  res.json({ message: 'Government dashboard' });
});

router.get('/redes', async (req, res) => {
  res.json({ message: 'Redes endpoint' });
});

router.get('/relatorios', async (req, res) => {
  res.json({ message: 'Relatorios endpoint' });
});

export { router as governmentRouter };