'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme } from 'next-themes';

export function ChannelImpactChart() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-72 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />;
  }

  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? '#26334D' : '#E2E8F0';
  const textColor = isDark ? '#94A3B8' : '#64748B';

  const data = [
    { channel: 'TV Advertising', returnRate: 0.076, synergyBonus: 0.042, color: '#0066FF' },
    { channel: 'Radio Advertising', returnRate: 0.145, synergyBonus: 0.085, color: '#10B981' },
    { channel: 'Newspaper Ads', returnRate: 0.012, synergyBonus: 0.005, color: '#F59E0B' },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="channel" stroke={textColor} fontSize={12} />
          <YAxis stroke={textColor} fontSize={12} label={{ value: 'Marginal Return / $ Spent', angle: -90, position: 'left', offset: 10, fill: textColor, fontSize: 11 }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{d.channel}</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Base Efficiency: <span className="font-mono font-bold text-brand-600 dark:text-brand-400">+{d.returnRate} Sales/k$</span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Multi-Channel Synergy: <span className="font-mono font-bold text-emerald-500">+{d.synergyBonus}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Bar dataKey="returnRate" name="Direct Marginal Impact" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="synergyBonus" name="Synergy Boost (Interactive)" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
