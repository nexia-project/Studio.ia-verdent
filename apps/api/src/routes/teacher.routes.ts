import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware, requireRole } from '../middlewares/roles';

const router = Router();

router.use(authMiddleware, loadUserMiddleware, requireRole('teacher', 'institution_admin', 'admin'));

// Turmas
router.get('/turmas', async (req, res) => {
  res.json({ message: 'Turmas endpoint' });
});

// Questões
router.get('/questoes', async (req, res) => {
  res.json({ message: 'Questoes endpoint' });
});

router.post('/questoes', async (req, res) => {
  res.json({ message: 'Create questao endpoint' });
});

// Provas
router.get('/provas', async (req, res) => {
  res.json({ message: 'Provas endpoint' });
});

router.post('/provas', async (req, res) => {
  res.json({ message: 'Create prova endpoint' });
});

// Planos de aula
router.get('/planos-aula', async (req, res) => {
  res.json({ message: 'Planos de aula endpoint' });
});

router.post('/planos-aula', async (req, res) => {
  res.json({ message: 'Create plano de aula endpoint' });
});

export { router as teacherRouter };