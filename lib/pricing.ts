import { PricingPlan } from '@/types/payment';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    interval: 'month',
    credits: 5,
    features: [
      '5 report analyses per month',
      'Basic disease detection',
      'PDF export',
      'Email support',
      'Standard processing speed',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'month',
    credits: 100,
    features: [
      '100 report analyses per month',
      'Advanced disease detection',
      'Priority processing',
      'PDF & Excel export',
      'Email support',
      'API access',
    ],
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    interval: 'month',
    credits: 500,
    features: [
      '500 report analyses per month',
      'Advanced AI analysis',
      'Highest priority processing',
      'All export formats',
      'Priority support',
      'API access',
      'Custom integrations',
      'Team collaboration',
    ],
    popular: true,
    stripePriceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    credits: 2000,
    features: [
      '2000 report analyses per month',
      'Custom AI training',
      'Dedicated infrastructure',
      'White-label option',
      '24/7 phone support',
      'Full API access',
      'Custom integrations',
      'Unlimited team members',
      'SLA guarantee',
      'HIPAA compliance support',
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
];

export const CREDIT_PACKS = [
  {
    id: 'pack-10',
    name: '10 Credits',
    credits: 10,
    price: 9,
    stripePriceId: process.env.STRIPE_PACK_10_PRICE_ID,
  },
  {
    id: 'pack-50',
    name: '50 Credits',
    credits: 50,
    price: 39,
    stripePriceId: process.env.STRIPE_PACK_50_PRICE_ID,
    popular: true,
  },
  {
    id: 'pack-100',
    name: '100 Credits',
    credits: 100,
    price: 69,
    stripePriceId: process.env.STRIPE_PACK_100_PRICE_ID,
  },
];

export function getPlanById(planId: string): PricingPlan | undefined {
  return PRICING_PLANS.find((plan) => plan.id === planId);
}

export function getCreditPackById(packId: string) {
  return CREDIT_PACKS.find((pack) => pack.id === packId);
}
