'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { filterAndPaginateDataset, getDatasetStatistics, convertToCSV } from '@/lib/dataset-utils';
import { AdvertisingRecord, ADVERTISING_DATA } from '@/data/advertising-data';
import {
  Database,
  Search,
  Download,
  FileJson,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  BarChart2,
  Table as TableIcon,
} from 'lucide-react';

export default function DatasetPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof AdvertisingRecord>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, pagination } = filterAndPaginateDataset({
    searchQuery: search,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  const stats = getDatasetStatistics();

  const handleSort = (field: keyof AdvertisingRecord) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV(ADVERTISING_DATA);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'saleslens_advertising_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(ADVERTISING_DATA, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'saleslens_advertising_dataset.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">Dataset Repository</Badge>
            <span className="text-xs text-slate-400 font-mono">ISLR Advertising Benchmark</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Advertising Dataset Explorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Inspect the 200 historical advertising budget records used to train and validate our Polynomial Regression model.
          </p>
        </div>

        {/* Download Export Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} icon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExportJSON} icon={<FileJson className="w-4 h-4" />}>
            Export JSON
          </Button>
        </div>
      </div>

      {/* Summary Statistics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1 bg-brand-50/40 dark:bg-brand-950/20 border-brand-200/50 dark:border-brand-800/50">
          <p className="text-xs font-semibold text-slate-500">TV SPEND (MEAN)</p>
          <p className="text-xl font-bold font-mono text-brand-600 dark:text-brand-400">
            ${stats.tv.mean}k
          </p>
          <p className="text-[11px] text-slate-400 font-mono">Min: ${stats.tv.min}k | Max: ${stats.tv.max}k</p>
        </Card>

        <Card className="p-4 space-y-1 bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/50">
          <p className="text-xs font-semibold text-slate-500">RADIO SPEND (MEAN)</p>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${stats.radio.mean}k
          </p>
          <p className="text-[11px] text-slate-400 font-mono">Min: ${stats.radio.min}k | Max: ${stats.radio.max}k</p>
        </Card>

        <Card className="p-4 space-y-1 bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/50">
          <p className="text-xs font-semibold text-slate-500">NEWSPAPER (MEAN)</p>
          <p className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
            ${stats.newspaper.mean}k
          </p>
          <p className="text-[11px] text-slate-400 font-mono">Min: ${stats.newspaper.min}k | Max: ${stats.newspaper.max}k</p>
        </Card>

        <Card className="p-4 space-y-1 bg-purple-50/40 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/50">
          <p className="text-xs font-semibold text-slate-500">PRODUCT SALES (MEAN)</p>
          <p className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {stats.sales.mean}k units
          </p>
          <p className="text-[11px] text-slate-400 font-mono">Min: {stats.sales.min}k | Max: {stats.sales.max}k</p>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/40">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dataset values..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Rows per page selector */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Show:</span>
            {[10, 25, 50, 100].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setPageSize(size);
                  setPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                  pageSize === size
                    ? 'bg-brand-600 text-white font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="px-6 py-3.5 cursor-pointer hover:text-brand-600 font-mono transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('TV')}
                  className="px-6 py-3.5 cursor-pointer hover:text-brand-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>TV Budget ($1,000s)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('Radio')}
                  className="px-6 py-3.5 cursor-pointer hover:text-brand-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Radio Budget ($1,000s)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('Newspaper')}
                  className="px-6 py-3.5 cursor-pointer hover:text-brand-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Newspaper ($1,000s)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('Sales')}
                  className="px-6 py-3.5 cursor-pointer hover:text-brand-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Sales ($10,000s)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {data.length > 0 ? (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-mono"
                  >
                    <td className="px-6 py-3 text-slate-400 font-semibold">#{row.id}</td>
                    <td className="px-6 py-3 text-slate-900 dark:text-slate-100 font-bold">
                      ${row.TV}k
                    </td>
                    <td className="px-6 py-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      ${row.Radio}k
                    </td>
                    <td className="px-6 py-3 text-amber-600 dark:text-amber-400">
                      ${row.Newspaper}k
                    </td>
                    <td className="px-6 py-3 text-brand-600 dark:text-brand-400 font-extrabold">
                      {row.Sales}k units
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No matching dataset records found for "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs bg-slate-50/50 dark:bg-slate-900/40">
          <p className="text-slate-500">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{data.length}</span> of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{pagination.totalItems}</span> records
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage(page - 1)}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            <span className="font-mono text-slate-600 dark:text-slate-300">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(page + 1)}
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
