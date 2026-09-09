'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BudgetDonutChartProps {
  tv: number;
  radio: number;
  newspaper: number;
}

export function BudgetDonutChart({ tv, radio, newspaper }: BudgetDonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />;
  }

  const data = [
    { name: 'TV Ads', value: Math.max(0, tv), color: '#0066FF' },
    { name: 'Radio Ads', value: Math.max(0, radio), color: '#10B981' },
    { name: 'Newspaper Ads', value: Math.max(0, newspaper), color: '#F59E0B' },
  ].filter((item) => item.value > 0);

  const total = tv + radio + newspaper;

  return (
    <div className="w-full h-64 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.length > 0 ? data : [{ name: 'Empty', value: 1, color: '#E2E8F0' }]}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0];
                const pct = total > 0 ? Math.round(((p.value as number) / total) * 100) : 0;
                return (
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="font-mono font-bold" style={{ color: p.payload.color }}>
                      ${p.value}k ({pct}%)
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Total Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-xs text-slate-400 font-medium">Total Budget</span>
        <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
          ${total}k
        </span>
      </div>
    </div>
  );
}
