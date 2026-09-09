'use client';

import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  badgeColor?: string;
  onChange: (val: number) => void;
  description?: string;
  icon?: React.ReactNode;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '$',
  badgeColor = 'bg-brand-500',
  onChange,
  description,
  icon,
}: SliderProps) {
  // Percentage capped between 0 and 100 for slider track visual fill
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(0);
      return;
    }
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      // Allow custom values up to 100,000k non-negative
      const validValue = Math.max(0, parsed);
      onChange(validValue);
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-slate-500 dark:text-slate-400">{icon}</div>}
          <div>
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              {label}
            </label>
            {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
        </div>

        {/* Value Badge & Direct Input */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-lg shadow-xs">
          <span className="text-xs font-medium text-slate-400">{unit}</span>
          <input
            type="number"
            value={value}
            min={0}
            step={step}
            onChange={handleInputChange}
            className="w-20 text-right font-mono font-bold text-sm text-slate-900 dark:text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-brand-500 rounded"
          />
          <span className="text-xs text-slate-400 font-mono">k</span>
        </div>
      </div>

      {/* Slider Track with Custom Fill */}
      <div className="relative flex items-center">
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-full ${badgeColor} transition-all duration-75`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(max, value)}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-slate-400">
        <span>{unit}{min}k</span>
        <span>{unit}{Math.round((max + min) / 2)}k</span>
        <span>{unit}{max}k+</span>
      </div>
    </div>
  );
}
