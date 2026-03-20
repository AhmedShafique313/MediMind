'use client';

import { MedicalReport } from '@/types';
import { formatDate, formatBytes, getStatusColor, getRiskLevelColor } from '@/lib/utils';
import {
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useReportStore } from '@/lib/store';

interface ReportCardProps {
  report: MedicalReport;
}

export default function ReportCard({ report }: ReportCardProps) {
  const { setSelectedReport, deleteReport, selectedReport } = useReportStore();
  const isSelected = selectedReport?.id === report.id;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this report?')) {
      deleteReport(report.id);
    }
  };

  return (
    <div
      onClick={() => setSelectedReport(report)}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-200 hover:border-primary-300 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <FileText className="h-8 w-8 text-primary-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{report.fileName}</h3>
            <p className="text-sm text-gray-500">
              {formatDate(report.uploadDate)} · {formatBytes(report.fileSize)}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-danger-600 transition-colors"
          aria-label="Delete report"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`
            inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
            ${getStatusColor(report.status)}
          `}
        >
          {report.status === 'processing' && <Loader2 className="h-3 w-3 animate-spin" />}
          {report.status === 'completed' && <CheckCircle className="h-3 w-3" />}
          {report.status === 'failed' && <AlertCircle className="h-3 w-3" />}
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>

        {report.analysis && (
          <>
            <span
              className={`
                inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                ${getRiskLevelColor(report.analysis.riskLevel)}
              `}
            >
              {report.analysis.riskLevel.charAt(0).toUpperCase() +
                report.analysis.riskLevel.slice(1)}{' '}
              Risk
            </span>

            {report.analysis.detectedConditions.filter((c) => c.status === 'detected')
              .length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {
                  report.analysis.detectedConditions.filter((c) => c.status === 'detected')
                    .length
                }{' '}
                Detected
              </span>
            )}
          </>
        )}
      </div>

      {report.error && (
        <div className="mt-2 text-xs text-danger-600">{report.error}</div>
      )}
    </div>
  );
}
