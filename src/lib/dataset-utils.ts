import { ADVERTISING_DATA, AdvertisingRecord } from '@/data/advertising-data';

export interface DatasetStats {
  count: number;
  tv: ChannelSummary;
  radio: ChannelSummary;
  newspaper: ChannelSummary;
  sales: ChannelSummary;
}

export interface ChannelSummary {
  mean: number;
  std: number;
  min: number;
  max: number;
  median: number;
  q1: number;
  q3: number;
}

function calculateSummary(values: number[]): ChannelSummary {
  if (values.length === 0) {
    return { mean: 0, std: 0, min: 0, max: 0, median: 0, q1: 0, q3: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  const sqDiffs = sorted.map((val) => Math.pow(val - mean, 2));
  const avgSqDiff = sqDiffs.reduce((acc, val) => acc + val, 0) / count;
  const std = Math.sqrt(avgSqDiff);

  const getPercentile = (p: number) => {
    const idx = (count - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  return {
    mean: Math.round(mean * 100) / 100,
    std: Math.round(std * 100) / 100,
    min: sorted[0],
    max: sorted[count - 1],
    median: Math.round(getPercentile(0.5) * 100) / 100,
    q1: Math.round(getPercentile(0.25) * 100) / 100,
    q3: Math.round(getPercentile(0.75) * 100) / 100,
  };
}

export function getDatasetStatistics(): DatasetStats {
  const tvValues = ADVERTISING_DATA.map((d) => d.TV);
  const radioValues = ADVERTISING_DATA.map((d) => d.Radio);
  const newsValues = ADVERTISING_DATA.map((d) => d.Newspaper);
  const salesValues = ADVERTISING_DATA.map((d) => d.Sales);

  return {
    count: ADVERTISING_DATA.length,
    tv: calculateSummary(tvValues),
    radio: calculateSummary(radioValues),
    newspaper: calculateSummary(newsValues),
    sales: calculateSummary(salesValues),
  };
}

export function filterAndPaginateDataset(options: {
  searchQuery?: string;
  sortBy?: keyof AdvertisingRecord;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}) {
  const { searchQuery = '', sortBy = 'id', sortOrder = 'asc', page = 1, pageSize = 10 } = options;

  let filtered = [...ADVERTISING_DATA];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (item) =>
        item.id.toString().includes(q) ||
        item.TV.toString().includes(q) ||
        item.Radio.toString().includes(q) ||
        item.Newspaper.toString().includes(q) ||
        item.Sales.toString().includes(q)
    );
  }

  filtered.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      pageSize,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}

export function convertToCSV(data: AdvertisingRecord[]): string {
  const headers = ['ID', 'TV', 'Radio', 'Newspaper', 'Sales'];
  const rows = data.map((item) => [item.id, item.TV, item.Radio, item.Newspaper, item.Sales].join(','));
  return [headers.join(','), ...rows].join('\n');
}
