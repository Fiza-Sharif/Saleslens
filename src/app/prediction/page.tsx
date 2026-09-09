'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BudgetDonutChart } from '@/components/charts/BudgetDonutChart';
import { predictSales, PredictionResult } from '@/lib/ml-engine';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { FadeIn } from '@/components/animations/FadeIn';
import { IconPop } from '@/components/animations/IconPop';
import {
  Tv,
  Radio as RadioIcon,
  Newspaper,
  TrendingUp,
  DollarSign,
  PieChart,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Award,
} from 'lucide-react';

export default function PredictionPage() {
  const [tv, setTv] = useState<number>(150);
  const [radio, setRadio] = useState<number>(25);
  const [newspaper, setNewspaper] = useState<number>(30);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Compute prediction result dynamically
  const result: PredictionResult = predictSales(tv, radio, newspaper);

  const handleReset = () => {
    setTv(150);
    setRadio(25);
    setNewspaper(30);
  };

  const handleQuickPreset = (presetTv: number, presetRadio: number, presetNews: number) => {
    setIsCalculating(true);
    setTv(presetTv);
    setRadio(presetRadio);
    setNewspaper(presetNews);
    setTimeout(() => setIsCalculating(false), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Page Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">ML Revenue Forecasting</Badge>
            <span className="text-xs text-slate-400 font-mono">Degree-2 Polynomial Model</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sales Predictor & Budget Allocator
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Adjust channel spend levels or enter custom budget amounts to compute estimated product demand and campaign ROI in real time.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset Defaults
          </Button>
        </div>
      </FadeIn>

      {/* Main Grid: Input Parameters (Left) vs Predictions & Donut Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Controls */}
        <FadeIn direction="left" className="lg:col-span-7 space-y-6">
          <Card className="space-y-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <IconPop>
                    <Sparkles className="w-4 h-4 text-brand-600" />
                  </IconPop>
                  Budget Allocation Parameters
                </CardTitle>
                <span className="text-xs font-mono text-slate-400">Total: ${result.totalBudget.toLocaleString()}k</span>
              </div>
              <CardDescription>
                Use the expanded sliders or type custom numeric values directly in $1,000s.
              </CardDescription>
            </CardHeader>

            <div className="space-y-4">
              {/* TV Slider */}
              <Slider
                label="TV Advertising Budget"
                value={tv}
                min={0}
                max={1000}
                step={1}
                badgeColor="bg-brand-600"
                onChange={(val) => setTv(val)}
                description="Primary reach & brand awareness driver (Expanded Range: $0 - $1,000k+)"
                icon={<Tv className="w-4 h-4 text-brand-600" />}
              />

              {/* Radio Slider */}
              <Slider
                label="Radio Advertising Budget"
                value={radio}
                min={0}
                max={500}
                step={1}
                badgeColor="bg-emerald-500"
                onChange={(val) => setRadio(val)}
                description="High-frequency conversion & synergy multiplier (Expanded Range: $0 - $500k+)"
                icon={<RadioIcon className="w-4 h-4 text-emerald-500" />}
              />

              {/* Newspaper Slider */}
              <Slider
                label="Newspaper Advertising Budget"
                value={newspaper}
                min={0}
                max={500}
                step={1}
                badgeColor="bg-amber-500"
                onChange={(val) => setNewspaper(val)}
                description="Print publication targeted campaigns (Expanded Range: $0 - $500k+)"
                icon={<Newspaper className="w-4 h-4 text-amber-500" />}
              />
            </div>

            {/* Strategy Preset Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Strategy Scenarios:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickPreset(200, 35, 10)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Standard Scale ($200k TV, $35k Radio)
                </button>
                <button
                  onClick={() => handleQuickPreset(500, 150, 50)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Enterprise Scale ($500k TV, $150k Radio)
                </button>
                <button
                  onClick={() => handleQuickPreset(800, 250, 100)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-600 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Mega Growth ($800k TV, $250k Radio)
                </button>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Right Column: Prediction Result Card & Donut Chart */}
        <FadeIn direction="right" className="lg:col-span-5 space-y-6">
          {/* Main Prediction Result Card */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-brand-300 uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Estimated Sales Output
                </span>
                <Badge variant="emerald" className="font-mono">
                  R² = 0.953
                </Badge>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white flex items-baseline gap-2">
                  {isCalculating ? (
                    <span className="animate-pulse text-brand-300">...</span>
                  ) : (
                    <>
                      <AnimatedCounter value={result.predictedSales} decimals={2} />
                      <span className="text-base font-normal text-slate-400">k units</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Estimated Gross Revenue:{' '}
                  <span className="font-mono text-emerald-400 font-semibold">
                    <AnimatedCounter value={result.predictedRevenue} decimals={0} prefix="$" />
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[11px]">Campaign ROI</span>
                  <p className="font-mono font-bold text-sm text-emerald-400 mt-0.5">
                    +<AnimatedCounter value={result.roiPercentage} decimals={0} suffix="%" />
                  </p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[11px]">Efficiency Score</span>
                  <p className="font-mono font-bold text-sm text-brand-300 mt-0.5">
                    <AnimatedCounter value={result.efficiencyScore} decimals={0} suffix="/100" />
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Budget Share Donut Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="w-4 h-4 text-brand-600" />
                Budget Share Distribution
              </CardTitle>
              <CardDescription>Percentage allocation across advertising channels</CardDescription>
            </CardHeader>

            <BudgetDonutChart
              tv={tv}
              radio={radio}
              newspaper={newspaper}
            />
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
