import { NextRequest, NextResponse } from 'next/server';

// This is a simple in-memory store for demo purposes
// In production, use a database like PostgreSQL, MongoDB, etc.
const reportsStore = new Map();

export async function GET(request: NextRequest) {
  try {
    const reports = Array.from(reportsStore.values());
    return NextResponse.json({ success: true, reports });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const report = await request.json();
    reportsStore.set(report.id, report);
    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save report' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'No report ID provided' },
        { status: 400 }
      );
    }

    reportsStore.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
