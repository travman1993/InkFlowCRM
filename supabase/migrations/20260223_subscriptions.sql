-- Subscriptions table for InkFlowCRM billing
-- Tracks trial period and Stripe subscription status per artist

CREATE TABLE IF NOT EXISTS subscriptions (
  id                     uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id              uuid        REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id     text,
  stripe_subscription_id text,
  plan_type              text,       -- 'solo_monthly' | 'solo_yearly' | 'studio_monthly' | 'studio_yearly'
  status                 text        DEFAULT 'trialing',  -- 'trialing' | 'active' | 'past_due' | 'canceled'
  trial_start            timestamptz DEFAULT now(),
  trial_end              timestamptz DEFAULT (now() + interval '14 days'),
  current_period_end     timestamptz,
  created_at             timestamptz DEFAULT now(),
  updated_at             timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Artists can read their own subscription
CREATE POLICY "select_own_subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = artist_id);

-- Artists can insert their own subscription row (on signup)
CREATE POLICY "insert_own_subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = artist_id);

-- No UPDATE from frontend — only the webhook (service role) can update
-- (Service role bypasses RLS automatically)
