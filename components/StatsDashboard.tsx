'use client';

import { useReportStore } from '@/lib/store';
import { FileText, TrendingUp, AlertCircle, Activity } from 'lucide-react';

export default function StatsDashboard() {
  const { getStats } = useReportStore();
  const stats = getStats();

  const cards = [
    {
      title: 'Total Reports',
      value: stats.totalReports,
      icon: FileText,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
    },
    {
      title: 'Reports Today',
      value: stats.reportsToday,
      icon: Activity,
      color: 'bg-success-500',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600',
    },
    {
      title: 'Detections Today',
      value: stats.detectionsToday,
      icon: TrendingUp,
      color: 'bg-warning-500',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-600',
    },
    {
      title: 'Critical Cases',
      value: stats.criticalCases,
      icon: AlertCircle,
      color: 'bg-danger-500',
      bgColor: 'bg-danger-50',
      textColor: 'text-danger-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`h-6 w-6 ${card.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
