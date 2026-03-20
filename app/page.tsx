'use client';

import { useState, useEffect } from 'react';
import { useReportStore } from '@/lib/store';
import FileUpload from '@/components/FileUpload';
import ReportCard from '@/components/ReportCard';
import AnalysisDetails from '@/components/AnalysisDetails';
import StatsDashboard from '@/components/StatsDashboard';
import {
  Activity,
  FileText,
  Search,
  Filter,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export default function Home() {
  const { reports, selectedReport, setSelectedReport } = useReportStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Medical Report AI
                  </h1>
                  <p className="text-sm text-gray-600">
                    Disease Detection & Analysis System
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {reports.length} Reports
                </div>
                <div className="text-xs text-gray-500">Total Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 fixed lg:relative z-20 w-80 lg:w-96
            bg-white border-r border-gray-200 transition-transform duration-300
            flex flex-col h-[calc(100vh-73px)]
          `}
        >
          <div className="p-6 space-y-6">
            {/* Upload Section */}
            <FileUpload />

            {/* Search & Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Reports</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  {searchTerm || filterStatus !== 'all'
                    ? 'No reports match your filters'
                    : 'Upload a PDF to get started'}
                </p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))
            )}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {selectedReport ? (
            <AnalysisDetails
              report={selectedReport}
              onClose={() => setSelectedReport(null)}
            />
          ) : (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Stats Dashboard */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Dashboard Overview
                  </h2>
                  <StatsDashboard />
                </div>

                {/* Welcome Section */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">
                    AI-Powered Medical Analysis
                  </h3>
                  <p className="text-primary-100 mb-6 max-w-2xl">
                    Upload your medical reports and let our advanced AI system analyze
                    lab results, detect potential diseases, and provide comprehensive
                    health insights in seconds.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold mb-1">
                        {reports.length}
                      </div>
                      <div className="text-sm text-primary-100">
                        Reports Analyzed
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold mb-1">
                        {
                          reports.filter(
                            (r) =>
                              r.analysis?.detectedConditions.some(
                                (c) => c.status === 'detected'
                              )
                          ).length
                        }
                      </div>
                      <div className="text-sm text-primary-100">
                        Conditions Detected
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold mb-1">
                        {Math.round(
                          reports.reduce(
                            (acc, r) => acc + (r.analysis?.confidence || 0),
                            0
                          ) /
                            (reports.length || 1) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-sm text-primary-100">
                        Average Confidence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'PDF Parsing',
                        description:
                          'Advanced OCR technology extracts text from any medical PDF',
                        icon: FileText,
                      },
                      {
                        title: 'AI Analysis',
                        description:
                          'GPT-4/Claude analyzes lab values and detects conditions',
                        icon: Activity,
                      },
                      {
                        title: 'Disease Detection',
                        description:
                          'Identifies diabetes, anemia, thyroid issues, and more',
                        icon: Search,
                      },
                      {
                        title: 'Risk Assessment',
                        description:
                          'Categorizes findings by severity and provides risk levels',
                        icon: Filter,
                      },
                      {
                        title: 'Export Reports',
                        description:
                          'Download comprehensive analysis as PDF documents',
                        icon: ChevronRight,
                      },
                      {
                        title: 'Real-time Results',
                        description:
                          'Get instant analysis results within seconds',
                        icon: Activity,
                      },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <feature.icon className="h-8 w-8 text-primary-600 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
