export interface MedicalReport {
  id: string;
  fileName: string;
  uploadDate: Date;
  fileSize: number;
  status: 'processing' | 'completed' | 'failed';
  extractedText?: string;
  analysis?: ReportAnalysis;
  error?: string;
}

export interface ReportAnalysis {
  summary: string;
  detectedConditions: DetectedCondition[];
  abnormalFindings: AbnormalFinding[];
  recommendations: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  confidence: number;
  analyzedAt: Date;
}

export interface DetectedCondition {
  name: string;
  category: DiseaseCategory;
  status: 'detected' | 'absent' | 'inconclusive';
  confidence: number;
  indicators: string[];
  severity?: 'mild' | 'moderate' | 'severe';
  description: string;
}

export interface AbnormalFinding {
  parameter: string;
  value: string;
  normalRange: string;
  deviation: 'high' | 'low';
  significance: 'minor' | 'moderate' | 'major';
  relatedConditions: string[];
}

export type DiseaseCategory =
  | 'cardiovascular'
  | 'metabolic'
  | 'renal'
  | 'hepatic'
  | 'hematological'
  | 'endocrine'
  | 'infectious'
  | 'autoimmune'
  | 'oncological'
  | 'nutritional'
  | 'other';

export interface AnalysisRequest {
  reportId: string;
  extractedText: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis?: ReportAnalysis;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  reportId?: string;
  fileName?: string;
  error?: string;
}

export interface DashboardStats {
  totalReports: number;
  reportsToday: number;
  detectionsToday: number;
  criticalCases: number;
}
