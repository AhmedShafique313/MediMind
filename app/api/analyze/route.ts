import { NextRequest, NextResponse } from 'next/server';
import { analyzeMedicalReport } from '@/lib/ai-service';

export const maxDuration = 60; // 60 seconds timeout for AI analysis

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { extractedText, reportId } = body;

    if (!extractedText) {
      return NextResponse.json(
        { success: false, error: 'No extracted text provided' },
        { status: 400 }
      );
    }

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: 'No report ID provided' },
        { status: 400 }
      );
    }

    // Perform AI analysis
    const analysis = await analyzeMedicalReport(extractedText);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze report',
      },
      { status: 500 }
    );
  }
}
