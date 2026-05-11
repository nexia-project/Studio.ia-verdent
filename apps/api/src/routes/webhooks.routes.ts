import { Router, raw } from 'express';
import { env } from '../config/env';
import { db } from '@studyai/db';
import { users } from '@studyai/db';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

// Clerk webhook
router.post('/clerk', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'user.created' || type === 'user.updated') {
      const clerkUser = data;
      
      const existingUser = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkUser.id),
      });
      
      if (existingUser) {
        // Update user
        await db.update(users).set({
          email: clerkUser.email_addresses[0]?.email_address,
          name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim(),
          avatarUrl: clerkUser.image_url,
          updatedAt: new Date(),
        }).where(eq(users.id, existingUser.id));
      } else {
        // Create user
        await db.insert(users).values({
          clerkId: clerkUser.id,
          email: clerkUser.email_addresses[0]?.email_address,
          name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim(),
          avatarUrl: clerkUser.image_url,
          role: 'student',
          plan: 'free',
        });
      }
    }
    
    if (type === 'user.deleted') {
      await db.delete(users).where(eq(users.clerkId, data.id));
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Clerk webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Stripe webhook
router.post('/stripe', raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
    
    // Handle events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Update user subscription
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // Update subscription status
        break;
      }
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

export { router as webhooksRouter };