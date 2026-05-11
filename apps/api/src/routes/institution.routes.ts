import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();

router.use(authMiddleware, loadUserMiddleware, requireRole('institution_admin', 'admin'));

router.get('/dashboard', async (req, res) => {
  res.json({ message: 'Institution dashboard' });
});

router.get('/professores', async (req, res) => {
  res.json({ message: 'Professores endpoint' });
});

router.get('/turmas', async (req, res) => {
  res.json({ message: 'Institution turmas endpoint' });
});

router.get('/alunos', async (req, res) => {
  res.json({ message: 'Alunos endpoint' });
});

router.get('/metricas', async (req, res) => {
  res.json({ message: 'Metricas endpoint' });
});

export { router as institutionRouter };