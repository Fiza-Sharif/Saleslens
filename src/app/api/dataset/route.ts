import { NextResponse } from 'next/server';
import { filterAndPaginateDataset, getDatasetStatistics } from '@/lib/dataset-utils';
import { AdvertisingRecord } from '@/data/advertising-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const sortBy = (searchParams.get('sortBy') as keyof AdvertisingRecord) || 'id';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const result = filterAndPaginateDataset({
    searchQuery: search,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  const stats = getDatasetStatistics();

  return NextResponse.json({
    success: true,
    ...result,
    stats,
  });
}
