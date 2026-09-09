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
import { ADVERTISING_DATA } from '@/data/advertising-data';
import { getTVRegressionCurvePoints } from '@/lib/ml-engine';
import { useTheme } from 'next-themes';

export function TVRegressionChart() {
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

  const scatterPoints = ADVERTISING_DATA.map((item) => ({
    tv: item.TV,
    sales: item.Sales,
  }));

  const curvePoints = getTVRegressionCurvePoints();

  // Combine datasets for ComposedChart
  // Curve points have `curveSales`, Scatter points have `actualSales`
  const combinedData = [
    ...scatterPoints.map((p) => ({ tv: p.tv, actualSales: p.sales, curveSales: null })),
    ...curvePoints.map((c) => ({ tv: c.tv, actualSales: null, curveSales: c.predictedSales })),
  ].sort((a, b) => a.tv - b.tv);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={combinedData} margin={{ top: 15, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="tv"
            type="number"
            name="TV Budget"
            unit="k"
            stroke={textColor}
            fontSize={12}
            domain={[0, 300]}
            label={{ value: 'TV Advertising Budget ($1,000s)', position: 'bottom', offset: 0, fill: textColor, fontSize: 11 }}
          />
          <YAxis
            dataKey="actualSales"
            type="number"
            name="Sales"
            unit="k"
            stroke={textColor}
            fontSize={12}
            domain={[0, 30]}
            label={{ value: 'Sales ($10,000s)', angle: -90, position: 'left', offset: 10, fill: textColor, fontSize: 11 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      TV Budget: ${data.tv}k
                    </p>
                    {data.actualSales !== null && (
                      <p className="text-brand-600 dark:text-brand-400 font-medium">
                        Actual Sales: {data.actualSales}k units
                      </p>
                    )}
                    {data.curveSales !== null && (
                      <p className="text-rose-500 font-medium">
                        Polynomial Fit: {data.curveSales}k units
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Scatter
            name="Actual Sales Data"
            dataKey="actualSales"
            fill="#0066FF"
            fillOpacity={0.6}
          />
          <Line
            name="Polynomial Regression Curve (Degree 2)"
            dataKey="curveSales"
            stroke="#EF4444"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
