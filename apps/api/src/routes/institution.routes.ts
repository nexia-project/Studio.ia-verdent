import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();
const auth = authMiddleware as any;

router.use(auth, loadUserMiddleware, requireRole('institution_admin', 'admin'));

router.get('/dashboard', async (req: Request, res: Response) => {
  res.json({ message: 'Institution dashboard' });
});

router.get('/professores', async (req: Request, res: Response) => {
  res.json({ message: 'Professores endpoint' });
});

router.get('/turmas', async (req: Request, res: Response) => {
  res.json({ message: 'Institution turmas endpoint' });
});

router.get('/alunos', async (req: Request, res: Response) => {
  res.json({ message: 'Alunos endpoint' });
});

router.get('/metricas', async (req: Request, res: Response) => {
  res.json({ message: 'Metricas endpoint' });
});

export { router as institutionRouter };
