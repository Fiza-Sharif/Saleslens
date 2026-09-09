import { NextResponse } from 'next/server';
import { MODEL_METRICS, MODEL_COEFFICIENTS, MODEL_INTERCEPT } from '@/lib/ml-engine';

export async function GET() {
  return NextResponse.json({
    success: true,
    metrics: MODEL_METRICS,
    coefficients: MODEL_COEFFICIENTS,
    intercept: MODEL_INTERCEPT,
  });
}
