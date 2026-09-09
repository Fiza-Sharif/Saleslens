'use client';

import { useEffect, useState } from 'react';
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getActualVsPredictedDataset } from '@/lib/ml-engine';
import { useTheme } from 'next-themes';

export function ActualVsPredChart() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-80 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />;
  }

  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? '#26334D' : '#E2E8F0';
  const textColor = isDark ? '#94A3B8' : '#64748B';

  const data = getActualVsPredictedDataset();

  // Baseline ideal fit line (y = x)
  const idealLine = [
    { actualSales: 0, ideal: 0 },
    { actualSales: 30, ideal: 30 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 15, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="actualSales"
            type="number"
            name="Actual Sales"
            stroke={textColor}
            fontSize={12}
            domain={[0, 30]}
            label={{ value: 'Actual Sales ($10k units)', position: 'bottom', offset: 0, fill: textColor, fontSize: 11 }}
          />
          <YAxis
            dataKey="predictedSales"
            type="number"
            name="Predicted Sales"
            stroke={textColor}
            fontSize={12}
            domain={[0, 30]}
            label={{ value: 'Predicted Sales ($10k units)', angle: -90, position: 'left', offset: 10, fill: textColor, fontSize: 11 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0].payload;
                if (!p.id) return null;
                return (
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Sample #{p.id}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Actual: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.actualSales}k</span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Predicted: <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{p.predictedSales}k</span>
                    </p>
                    <p className="text-slate-400 font-mono text-[11px]">
                      Residual: {p.residual > 0 ? `+${p.residual}` : p.residual}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Scatter
            name="Model Predictions"
            data={data}
            fill="#10B981"
            fillOpacity={0.65}
          />
          <Line
            name="Ideal Fit Line (y = x)"
            data={idealLine}
            dataKey="ideal"
            stroke="#94A3B8"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
