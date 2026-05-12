import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';
import { env } from '../config/env';
import Stripe from 'stripe';

const router = Router();
const auth = authMiddleware as any;
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

router.use(auth, loadUserMiddleware);

// Get subscription status
router.get('/status', async (req: Request, res: Response) => {
  res.json({ 
    plan: req.user?.plan || 'free',
    status: 'active'
  });
});

// Create checkout session
router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: env.STRIPE_PRICE_ID_PREMIUM,
          quantity: 1,
        },
      ],
      success_url: `${env.APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.APP_URL}/subscription/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Customer portal
router.post('/portal', async (req: Request, res: Response) => {
  try {
    // Get customer ID from user
    const session = await stripe.billingPortal.sessions.create({
      customer: 'cus_example', // Get from DB
      return_url: `${env.APP_URL}/settings/billing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

export { router as subscriptionsRouter };
