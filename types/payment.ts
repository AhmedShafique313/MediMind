export type PlanType = 'free' | 'starter' | 'professional' | 'enterprise';

export interface PricingPlan {
  id: PlanType;
  name: string;
  price: number;
  interval: 'month' | 'year';
  credits: number;
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
}

export interface UserSubscription {
  userId: string;
  plan: PlanType;
  credits: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  amount: number;
  credits: number;
  type: 'subscription' | 'one-time';
  status: 'succeeded' | 'pending' | 'failed';
  stripePaymentId?: string;
  createdAt: Date;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}
