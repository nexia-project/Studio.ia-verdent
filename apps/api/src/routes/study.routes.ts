import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';

const router = Router();
const auth = authMiddleware as any;

router.use(auth, loadUserMiddleware);

// Flashcards
router.get('/flashcards', async (req: Request, res: Response) => {
  res.json({ message: 'Flashcards endpoint' });
});

router.post('/flashcards', async (req: Request, res: Response) => {
  res.json({ message: 'Create flashcard endpoint' });
});

// Study plans
router.get('/plans', async (req: Request, res: Response) => {
  res.json({ message: 'Study plans endpoint' });
});

router.post('/plans', async (req: Request, res: Response) => {
  res.json({ message: 'Create study plan endpoint' });
});

// Simulados
router.get('/simulados', async (req: Request, res: Response) => {
  res.json({ message: 'Simulados endpoint' });
});

router.post('/simulados', async (req: Request, res: Response) => {
  res.json({ message: 'Create simulado endpoint' });
});

// Redações
router.get('/redacoes', async (req: Request, res: Response) => {
  res.json({ message: 'Redacoes endpoint' });
});

router.post('/redacoes', async (req: Request, res: Response) => {
  res.json({ message: 'Create redacao endpoint' });
});

export { router as studyRouter };
