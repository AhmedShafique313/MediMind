import Groq from 'groq-sdk';
import { ReportAnalysis } from '@/types';

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const MEDICAL_ANALYSIS_PROMPT = `You are an expert medical AI system specialized in analyzing laboratory and diagnostic test reports. Your role is to:

1. Identify all test parameters and their values
2. Compare values against standard reference ranges
3. Detect potential diseases, conditions, or health concerns
4. Assess severity and risk levels
5. Provide evidence-based recommendations

Analyze the following medical report and provide a comprehensive assessment in JSON format.

IMPORTANT: Return ONLY valid JSON with this exact structure:
{
  "summary": "Brief 2-3 sentence overview of the report findings",
  "detectedConditions": [
    {
      "name": "Condition name",
      "category": "cardiovascular|metabolic|renal|hepatic|hematological|endocrine|infectious|autoimmune|oncological|nutritional|other",
      "status": "detected|absent|inconclusive",
      "confidence": 0.0-1.0,
      "indicators": ["Test parameter that indicates this condition"],
      "severity": "mild|moderate|severe",
      "description": "Detailed explanation of the condition and supporting evidence"
    }
  ],
  "abnormalFindings": [
    {
      "parameter": "Parameter name",
      "value": "Measured value",
      "normalRange": "Normal range",
      "deviation": "high|low",
      "significance": "minor|moderate|major",
      "relatedConditions": ["Possible related conditions"]
    }
  ],
  "recommendations": ["Specific actionable recommendations"],
  "riskLevel": "low|moderate|high|critical",
  "confidence": 0.0-1.0
}

Common conditions to check for based on lab values:
- Diabetes (HbA1c >6.5%, Glucose >126 mg/dL)
- Prediabetes (HbA1c 5.7-6.4%, Glucose 100-125 mg/dL)
- Anemia (Low Hemoglobin: <13.5 g/dL men, <12 g/dL women)
- Hypothyroidism (High TSH >4.5 mIU/L, Low Free T4)
- Hyperthyroidism (Low TSH <0.4 mIU/L, High Free T4)
- Kidney Disease (High Creatinine >1.2 mg/dL, Low eGFR <60)
- Liver Disease (Elevated ALT/AST >40 U/L, High Bilirubin)
- Hyperlipidemia (Total Cholesterol >240 mg/dL, LDL >160 mg/dL)
- Vitamin D Deficiency (<20 ng/mL)
- Iron Deficiency (Low Ferritin <30 ng/mL, Low Iron)
- Urinary Tract Infection (Positive Leukocytes/Nitrites, High WBC in urine)
- Electrolyte Imbalances (Na, K, Cl, Ca outside normal ranges)

Medical Report to Analyze:
---
`;

export async function analyzeMedicalReport(
  extractedText: string
): Promise<ReportAnalysis> {
  if (!extractedText || extractedText.trim().length < 50) {
    throw new Error('Insufficient text extracted from the report');
  }

  if (!groq) {
    throw new Error('Groq API key not configured. Please set GROQ_API_KEY in .env.local');
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert medical AI that analyzes laboratory and diagnostic reports. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: MEDICAL_ANALYSIS_PROMPT + extractedText,
        },
      ],
      temperature: 0.3,
      max_tokens: 8000,
      response_format: { type: 'json_object' },
    });

    const analysisText = completion.choices[0]?.message?.content || '';

    // Parse JSON response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate and structure the response
    const analysis: ReportAnalysis = {
      summary: parsed.summary || 'Analysis completed',
      detectedConditions: (parsed.detectedConditions || []).map((c: any) => ({
        name: c.name || 'Unknown Condition',
        category: c.category || 'other',
        status: c.status || 'inconclusive',
        confidence: Math.min(Math.max(c.confidence || 0.5, 0), 1),
        indicators: Array.isArray(c.indicators) ? c.indicators : [],
        severity: c.severity,
        description: c.description || '',
      })),
      abnormalFindings: (parsed.abnormalFindings || []).map((f: any) => ({
        parameter: f.parameter || '',
        value: f.value || '',
        normalRange: f.normalRange || '',
        deviation: f.deviation || 'high',
        significance: f.significance || 'minor',
        relatedConditions: Array.isArray(f.relatedConditions) ? f.relatedConditions : [],
      })),
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : [],
      riskLevel: parsed.riskLevel || 'low',
      confidence: Math.min(Math.max(parsed.confidence || 0.7, 0), 1),
      analyzedAt: new Date(),
    };

    return analysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error(
      `Failed to analyze report: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function validateAnalysis(analysis: any): boolean {
  return (
    analysis &&
    typeof analysis.summary === 'string' &&
    Array.isArray(analysis.detectedConditions) &&
    Array.isArray(analysis.abnormalFindings) &&
    Array.isArray(analysis.recommendations) &&
    ['low', 'moderate', 'high', 'critical'].includes(analysis.riskLevel)
  );
}
