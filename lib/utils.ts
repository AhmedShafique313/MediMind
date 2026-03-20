import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getRiskLevelColor(level: string) {
  switch (level) {
    case 'low':
      return 'text-success-600 bg-success-50';
    case 'moderate':
      return 'text-warning-600 bg-warning-50';
    case 'high':
      return 'text-danger-600 bg-danger-50';
    case 'critical':
      return 'text-danger-700 bg-danger-100';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'text-success-600 bg-success-50';
    case 'processing':
      return 'text-primary-600 bg-primary-50';
    case 'failed':
      return 'text-danger-600 bg-danger-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    cardiovascular: 'text-red-600 bg-red-50',
    metabolic: 'text-purple-600 bg-purple-50',
    renal: 'text-blue-600 bg-blue-50',
    hepatic: 'text-yellow-600 bg-yellow-50',
    hematological: 'text-pink-600 bg-pink-50',
    endocrine: 'text-indigo-600 bg-indigo-50',
    infectious: 'text-orange-600 bg-orange-50',
    autoimmune: 'text-teal-600 bg-teal-50',
    oncological: 'text-gray-600 bg-gray-50',
    nutritional: 'text-green-600 bg-green-50',
    other: 'text-slate-600 bg-slate-50',
  };
  return colors[category] || colors.other;
}
