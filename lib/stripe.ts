// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key', {
  apiVersion: '2026-05-27.dahlia',
  typescript: true,
});

export const PRO_PLAN = {
  name: 'CareerForge Pro',
  price: 1900, // $19.00 in cents
  interval: 'month' as const,
  features: [
    'Unlimited AI-powered resume rewrites',
    'All 3 premium templates',
    'PDF export with no watermark',
    'Cover letter generator',
    'ATS score optimization',
    'Priority AI processing',
    'Dashboard with resume history',
  ],
};
