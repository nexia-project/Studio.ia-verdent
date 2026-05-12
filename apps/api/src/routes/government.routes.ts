import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();
const auth = authMiddleware as any;

router.use(auth, loadUserMiddleware, requireRole('government', 'admin'));

router.get('/dashboard', async (req: Request, res: Response) => {
  res.json({ message: 'Government dashboard' });
});

router.get('/redes', async (req: Request, res: Response) => {
  res.json({ message: 'Redes endpoint' });
});

router.get('/relatorios', async (req: Request, res: Response) => {
  res.json({ message: 'Relatorios endpoint' });
});

export { router as governmentRouter };
