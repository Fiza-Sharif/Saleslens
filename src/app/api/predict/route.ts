import { NextResponse } from 'next/server';
import { predictSales } from '@/lib/ml-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tv = 0, radio = 0, newspaper = 0 } = body;

    const tvNum = parseFloat(tv);
    const radioNum = parseFloat(radio);
    const newsNum = parseFloat(newspaper);

    if (isNaN(tvNum) || isNaN(radioNum) || isNaN(newsNum)) {
      return NextResponse.json(
        { error: 'Invalid input. TV, Radio, and Newspaper must be valid numbers.' },
        { status: 400 }
      );
    }

    const result = predictSales(tvNum, radioNum, newsNum);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
