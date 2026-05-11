import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';

const router = Router();

// All routes require authentication
router.use(authMiddleware, loadUserMiddleware);

// Get tutor conversation history
router.get('/conversations', async (req, res) => {
  res.json({ message: 'Tutor conversations endpoint' });
});

// Create new conversation
router.post('/conversations', async (req, res) => {
  res.json({ message: 'Create conversation endpoint' });
});

// Send message (streaming)
router.post('/conversations/:id/messages', async (req, res) => {
  res.json({ message: 'Send message endpoint' });
});

// Voice transcription
router.post('/voice/transcribe', async (req, res) => {
  res.json({ message: 'Voice transcription endpoint' });
});

// Voice synthesis
router.post('/voice/synthesize', async (req, res) => {
  res.json({ message: 'Voice synthesis endpoint' });
});

export { router as tutorRouter };