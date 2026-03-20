import { create } from 'zustand';
import { MedicalReport, DashboardStats } from '@/types';

interface ReportStore {
  reports: MedicalReport[];
  selectedReport: MedicalReport | null;
  isUploading: boolean;
  addReport: (report: MedicalReport) => void;
  updateReport: (id: string, updates: Partial<MedicalReport>) => void;
  deleteReport: (id: string) => void;
  setSelectedReport: (report: MedicalReport | null) => void;
  setIsUploading: (uploading: boolean) => void;
  getStats: () => DashboardStats;
}

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: [],
  selectedReport: null,
  isUploading: false,

  addReport: (report) =>
    set((state) => ({
      reports: [report, ...state.reports],
    })),

  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      ),
      selectedReport:
        state.selectedReport?.id === id
          ? { ...state.selectedReport, ...updates }
          : state.selectedReport,
    })),

  deleteReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
      selectedReport: state.selectedReport?.id === id ? null : state.selectedReport,
    })),

  setSelectedReport: (report) =>
    set({
      selectedReport: report,
    }),

  setIsUploading: (uploading) =>
    set({
      isUploading: uploading,
    }),

  getStats: () => {
    const { reports } = get();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reportsToday = reports.filter(
      (r) => new Date(r.uploadDate) >= today
    ).length;

    const detectionsToday = reports.filter((r) => {
      const uploadedToday = new Date(r.uploadDate) >= today;
      const hasDetections =
        r.analysis?.detectedConditions.some((c) => c.status === 'detected') ?? false;
      return uploadedToday && hasDetections;
    }).length;

    const criticalCases = reports.filter(
      (r) => r.analysis?.riskLevel === 'critical' || r.analysis?.riskLevel === 'high'
    ).length;

    return {
      totalReports: reports.length,
      reportsToday,
      detectionsToday,
      criticalCases,
    };
  },
}));
