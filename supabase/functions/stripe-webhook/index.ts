import Stripe from 'npm:stripe@14';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-04-10',
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

Deno.serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature', { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Use service role to bypass RLS for updates
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const artistId = session.metadata?.artist_id;
        const planType = session.metadata?.plan_type;

        if (!artistId) break;

        // Fetch the subscription to get period end
        let periodEnd: string | null = null;
        if (session.subscription) {
          const stripeSub = await stripe.subscriptions.retrieve(session.subscription as string);
          periodEnd = new Date(stripeSub.current_period_end * 1000).toISOString();
        }

        await supabase
          .from('subscriptions')
          .update({
            stripe_customer_id:     session.customer as string,
            stripe_subscription_id: session.subscription as string,
            plan_type:              planType,
            status:                 'active',
            current_period_end:     periodEnd,
            updated_at:             new Date().toISOString(),
          })
          .eq('artist_id', artistId);

        break;
      }

      case 'customer.subscription.updated': {
        const stripeSub = event.data.object as Stripe.Subscription;
        const artistId = stripeSub.metadata?.artist_id;
        if (!artistId) break;

        const status = stripeSub.status === 'active' ? 'active'
          : stripeSub.status === 'past_due' ? 'past_due'
          : stripeSub.status === 'canceled' ? 'canceled'
          : stripeSub.status;

        await supabase
          .from('subscriptions')
          .update({
            status,
            current_period_end: new Date(stripeSub.current_period_end * 1000).toISOString(),
            updated_at:         new Date().toISOString(),
          })
          .eq('stripe_subscription_id', stripeSub.id);

        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSub = event.data.object as Stripe.Subscription;

        await supabase
          .from('subscriptions')
          .update({
            status:     'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', stripeSub.id);

        break;
      }

      default:
        // Ignore other events
        break;
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return new Response(`Handler error: ${err.message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
