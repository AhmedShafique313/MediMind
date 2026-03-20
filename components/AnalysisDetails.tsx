'use client';

import { MedicalReport } from '@/types';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  X,
} from 'lucide-react';
import {
  formatDate,
  getRiskLevelColor,
  getCategoryColor,
  formatBytes,
} from '@/lib/utils';
import jsPDF from 'jspdf';

interface AnalysisDetailsProps {
  report: MedicalReport;
  onClose: () => void;
}

export default function AnalysisDetails({ report, onClose }: AnalysisDetailsProps) {
  const { analysis } = report;

  if (!analysis) {
    return (
      <div className="p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No analysis available for this report.</p>
      </div>
    );
  }

  const detectedConditions = analysis.detectedConditions.filter(
    (c) => c.status === 'detected'
  );
  const absentConditions = analysis.detectedConditions.filter(
    (c) => c.status === 'absent'
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Title
    doc.setFontSize(18);
    doc.text('Medical Report Analysis', 20, y);
    y += 10;

    // Report Info
    doc.setFontSize(10);
    doc.text(`File: ${report.fileName}`, 20, y);
    y += 6;
    doc.text(`Date: ${formatDate(report.uploadDate)}`, 20, y);
    y += 6;
    doc.text(`Risk Level: ${analysis.riskLevel.toUpperCase()}`, 20, y);
    y += 10;

    // Summary
    doc.setFontSize(14);
    doc.text('Summary', 20, y);
    y += 8;
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(analysis.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 6 + 10;

    // Detected Conditions
    if (detectedConditions.length > 0) {
      doc.setFontSize(14);
      doc.text('Detected Conditions', 20, y);
      y += 8;
      doc.setFontSize(10);

      detectedConditions.forEach((condition) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`• ${condition.name} (${condition.severity})`, 25, y);
        y += 6;
        const descLines = doc.splitTextToSize(condition.description, 165);
        doc.text(descLines, 28, y);
        y += descLines.length * 6 + 4;
      });
      y += 6;
    }

    // Recommendations
    if (analysis.recommendations.length > 0) {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.text('Recommendations', 20, y);
      y += 8;
      doc.setFontSize(10);

      analysis.recommendations.forEach((rec) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        const recLines = doc.splitTextToSize(`• ${rec}`, 170);
        doc.text(recLines, 20, y);
        y += recLines.length * 6 + 2;
      });
    }

    doc.save(`${report.fileName.replace('.pdf', '')}-analysis.pdf`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {report.fileName}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{formatDate(report.uploadDate)}</span>
              <span>•</span>
              <span>{formatBytes(report.fileSize)}</span>
              <span>•</span>
              <span className={`font-medium ${getRiskLevelColor(analysis.riskLevel)}`}>
                {analysis.riskLevel.toUpperCase()} RISK
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToPDF}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Export to PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Summary</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{analysis.summary}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span>Confidence: {Math.round(analysis.confidence * 100)}%</span>
            <span>•</span>
            <span>Analyzed: {formatDate(analysis.analyzedAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Detected Conditions */}
        {detectedConditions.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-danger-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Detected Conditions ({detectedConditions.length})
              </h3>
            </div>
            <div className="space-y-4">
              {detectedConditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(
                            condition.category
                          )}`}
                        >
                          {condition.category}
                        </span>
                        {condition.severity && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            {condition.severity}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Confidence</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {Math.round(condition.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                  {condition.indicators.length > 0 && (
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs font-medium text-gray-700 mb-2">
                        Indicators:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {condition.indicators.map((indicator, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white border border-gray-200 rounded"
                          >
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Abnormal Findings */}
        {analysis.abnormalFindings.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-warning-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Abnormal Findings ({analysis.abnormalFindings.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Normal Range
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analysis.abnormalFindings.map((finding, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {finding.parameter}
                      </td>
                      <td className="px-4 py-3 text-gray-900">{finding.value}</td>
                      <td className="px-4 py-3 text-gray-600">{finding.normalRange}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            finding.deviation === 'high'
                              ? 'bg-danger-50 text-danger-700'
                              : 'bg-primary-50 text-primary-700'
                          }`}
                        >
                          {finding.deviation === 'high' ? '↑ High' : '↓ Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Recommendations */}
        {analysis.recommendations.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">{rec}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Absent/Inconclusive Conditions */}
        {absentConditions.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-success-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Conditions Not Detected ({absentConditions.length})
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {absentConditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-success-50 border border-success-200 rounded-lg"
                >
                  <div className="font-medium text-sm text-success-900">
                    {condition.name}
                  </div>
                  <div className="text-xs text-success-700 mt-1">
                    {condition.category}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
