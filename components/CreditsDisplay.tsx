'use client';

import { useUserStore } from '@/lib/user-store';
import { Zap, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreditsDisplay() {
  const { user } = useUserStore();

  if (!user) return null;

  const creditPercentage = Math.min((user.credits / 100) * 100, 100);
  const isLow = user.credits < 10;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg ${
              isLow ? 'bg-danger-100' : 'bg-primary-100'
            }`}
          >
            <Zap
              className={`h-5 w-5 ${isLow ? 'text-danger-600' : 'text-primary-600'}`}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">
              Available Credits
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.credits}</div>
          </div>
        </div>
        <Link
          href="/pricing"
          className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Buy More
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLow ? 'bg-danger-500' : 'bg-primary-600'
          }`}
          style={{ width: `${creditPercentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <span>Plan: {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</span>
        {isLow && (
          <span className="text-danger-600 font-medium">Low credits!</span>
        )}
      </div>
    </div>
  );
}
