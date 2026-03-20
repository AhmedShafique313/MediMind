'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { PricingPlan } from '@/types/payment';
import { useUserStore } from '@/lib/user-store';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const handleSubscribe = async () => {
    if (!plan.stripePriceId) {
      alert('This plan is not available for purchase yet');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          userId: user?.userId || 'demo-user',
          mode: 'subscription',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = user?.plan === plan.id;

  return (
    <div
      className={`
        relative rounded-2xl border-2 p-8 transition-all duration-200
        ${
          plan.popular
            ? 'border-primary-500 bg-primary-50 shadow-xl scale-105'
            : 'border-gray-200 hover:border-primary-300 hover:shadow-lg'
        }
      `}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-600">/{plan.interval}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{plan.credits} reports per month</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading || isCurrentPlan || plan.id === 'free'}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold transition-all
          ${
            plan.popular
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }
          ${
            (loading || isCurrentPlan || plan.id === 'free') &&
            'opacity-50 cursor-not-allowed'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : plan.id === 'free' ? (
          'Default Plan'
        ) : (
          'Subscribe Now'
        )}
      </button>

      {isCurrentPlan && (
        <p className="text-center text-sm text-gray-600 mt-3">
          Your current plan
        </p>
      )}
    </div>
  );
}
