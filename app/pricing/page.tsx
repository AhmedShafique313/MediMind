'use client';

import { PRICING_PLANS, CREDIT_PACKS } from '@/lib/pricing';
import PricingCard from '@/components/PricingCard';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a free trial, then scale as you grow. All plans include full
            access to our AI-powered medical report analysis.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Credit Packs */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" />
              One-Time Purchase
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Need Extra Credits?
            </h2>
            <p className="text-gray-600">
              Top up your account with one-time credit packs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREDIT_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`
                  border-2 rounded-xl p-6 text-center transition-all
                  ${
                    pack.popular
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }
                `}
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {pack.credits}
                </div>
                <div className="text-sm text-gray-600 mb-4">Credits</div>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  ${pack.price}
                </div>
                <button
                  className={`
                    w-full py-3 px-6 rounded-lg font-semibold transition-all
                    ${
                      pack.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }
                  `}
                >
                  Buy Credits
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Advanced AI disease detection',
              '20+ condition analysis',
              'Abnormal findings detection',
              'Risk level assessment',
              'PDF report generation',
              'Export to multiple formats',
              'Secure data encryption',
              'HIPAA compliance ready',
              'Regular model updates',
              'Mobile-responsive interface',
              'API access',
              'Email notifications',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            {[
              {
                q: 'What is a credit?',
                a: 'One credit equals one medical report analysis. Each analysis includes full disease detection, risk assessment, and recommendations.',
              },
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! You can change your plan at any time. Changes take effect at the start of your next billing period.',
              },
              {
                q: 'What happens if I run out of credits?',
                a: "You can purchase additional credit packs or upgrade your plan. Your account won't be charged unless you initiate a purchase.",
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. All data is encrypted in transit and at rest. We follow HIPAA guidelines and never share your data with third parties.',
              },
              {
                q: 'Do credits roll over?',
                a: 'Subscription credits reset monthly. One-time credit pack purchases never expire.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
