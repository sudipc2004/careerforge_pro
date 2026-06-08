// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { upgradeUserToPro, downgradeUserToFree } from '@/lib/user-store';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as { mode?: string | null; customer?: string | null; subscription?: string | null };
        if (session.mode === 'subscription' && session.customer) {
          upgradeUserToPro(
            session.customer as string,
            session.subscription as string
          );
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.customer) {
          // Ensure access stays active on renewal
          const customer = await stripe.customers.retrieve(invoice.customer as string);
          if (!('deleted' in customer)) {
            console.log(`Invoice paid for customer: ${invoice.customer}`);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        if (subscription.customer) {
          downgradeUserToFree(subscription.customer as string);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        if (subscription.status === 'active') {
          upgradeUserToPro(
            subscription.customer as string,
            subscription.id
          );
        } else if (['canceled', 'unpaid', 'past_due'].includes(subscription.status)) {
          downgradeUserToFree(subscription.customer as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
