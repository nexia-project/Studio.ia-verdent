import { Router } from 'express';
import { authRouter } from './auth.routes';
import { webhooksRouter } from './webhooks.routes';
import { tutorRouter } from './tutor.routes';
import { studyRouter } from './study.routes';
import { teacherRouter } from './teacher.routes';
import { institutionRouter } from './institution.routes';
import { governmentRouter } from './government.routes';
import { adminRouter } from './admin.routes';
import { subscriptionsRouter } from './subscriptions.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
router.use('/auth', authRouter);
router.use('/webhooks', webhooksRouter);
router.use('/tutor', tutorRouter);
router.use('/study', studyRouter);
router.use('/teacher', teacherRouter);
router.use('/institution', institutionRouter);
router.use('/government', governmentRouter);
router.use('/admin', adminRouter);
router.use('/subscriptions', subscriptionsRouter);

export { router };