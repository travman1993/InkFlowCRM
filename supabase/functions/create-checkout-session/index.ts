import Stripe from 'npm:stripe@14';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-04-10',
});

const PRICE_IDS: Record<string, string> = {
  solo_monthly:   Deno.env.get('STRIPE_SOLO_MONTHLY_PRICE_ID')   ?? '',
  solo_yearly:    Deno.env.get('STRIPE_SOLO_YEARLY_PRICE_ID')    ?? '',
  studio_monthly: Deno.env.get('STRIPE_STUDIO_MONTHLY_PRICE_ID') ?? '',
  studio_yearly:  Deno.env.get('STRIPE_STUDIO_YEARLY_PRICE_ID')  ?? '',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify the request is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Init Supabase client to verify the JWT
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { plan_type, email } = await req.json();

    if (!plan_type || !PRICE_IDS[plan_type]) {
      return new Response(JSON.stringify({ error: 'Invalid plan type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use service role to read/write subscriptions
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Look up existing Stripe customer ID
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('artist_id', user.id)
      .single();

    let customerId = sub?.stripe_customer_id;

    // Create Stripe customer if not yet created
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: email || user.email,
        metadata: { artist_id: user.id },
      });
      customerId = customer.id;

      // Save customer ID
      await supabaseAdmin
        .from('subscriptions')
        .update({ stripe_customer_id: customerId })
        .eq('artist_id', user.id);
    }

    const origin = req.headers.get('origin') ?? 'https://inkflowcrm.com';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: PRICE_IDS[plan_type], quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: { artist_id: user.id, plan_type },
      subscription_data: {
        metadata: { artist_id: user.id, plan_type },
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('create-checkout-session error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
