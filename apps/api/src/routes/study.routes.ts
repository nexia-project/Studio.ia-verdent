import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';

const router = Router();

router.use(authMiddleware, loadUserMiddleware);

// Flashcards
router.get('/flashcards', async (req, res) => {
  res.json({ message: 'Flashcards endpoint' });
});

router.post('/flashcards', async (req, res) => {
  res.json({ message: 'Create flashcard endpoint' });
});

// Study plans
router.get('/plans', async (req, res) => {
  res.json({ message: 'Study plans endpoint' });
});

router.post('/plans', async (req, res) => {
  res.json({ message: 'Create study plan endpoint' });
});

// Simulados
router.get('/simulados', async (req, res) => {
  res.json({ message: 'Simulados endpoint' });
});

router.post('/simulados', async (req, res) => {
  res.json({ message: 'Create simulado endpoint' });
});

// Redações
router.get('/redacoes', async (req, res) => {
  res.json({ message: 'Redacoes endpoint' });
});

router.post('/redacoes', async (req, res) => {
  res.json({ message: 'Create redacao endpoint' });
});

export { router as studyRouter };