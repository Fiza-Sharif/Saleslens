'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TVRegressionChart } from '@/components/charts/TVRegressionChart';
import { ActualVsPredChart } from '@/components/charts/ActualVsPredChart';
import { ChannelImpactChart } from '@/components/charts/ChannelImpactChart';
import { MODEL_METRICS } from '@/lib/ml-engine';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { IconPop } from '@/components/animations/IconPop';
import {
  BarChart3,
  TrendingUp,
  Target,
  Activity,
  CheckCircle2,
  BrainCircuit,
  Zap,
  Info,
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <FadeIn className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">Model Performance & Analytics</Badge>
            <span className="text-xs text-slate-400 font-mono">Dataset: 200 Samples</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Performance Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Comprehensive evaluation of the Polynomial Regression model fit, residual distribution, and channel efficiency metrics.
          </p>
        </div>
      </FadeIn>

      {/* Model Performance Metrics Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StaggerItem>
          <Card hoverEffect className="border-l-4 border-l-brand-600 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>R² SCORE (ACCURACY)</span>
              <IconPop>
                <Target className="w-4 h-4 text-brand-600" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {MODEL_METRICS.r2}
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              95.33% Variance Explained
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hoverEffect className="border-l-4 border-l-emerald-500 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>MEAN ABS ERROR (MAE)</span>
              <IconPop>
                <Activity className="w-4 h-4 text-emerald-500" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {MODEL_METRICS.mae}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Avg Error: ±903 units
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hoverEffect className="border-l-4 border-l-amber-500 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>MEAN SQ ERROR (MSE)</span>
              <IconPop>
                <BarChart3 className="w-4 h-4 text-amber-500" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {MODEL_METRICS.mse}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Variance of Residuals
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hoverEffect className="border-l-4 border-l-purple-500 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>ROOT MSE (RMSE)</span>
              <IconPop>
                <BrainCircuit className="w-4 h-4 text-purple-500" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {MODEL_METRICS.rmse}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Std Error: 1.201 units
            </p>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Main Charts Row 1: TV Regression Curve vs Actual vs Predicted */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TV Regression Curve Chart */}
        <FadeIn direction="left" className="lg:col-span-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                  TV Spend vs. Sales Fit Curve
                </CardTitle>
                <Badge variant="blue" className="font-mono text-[11px]">Degree 2 Fit</Badge>
              </div>
              <CardDescription>
                Visualizing non-linear diminishing returns curve over historical TV advertising observations.
              </CardDescription>
            </CardHeader>

            <TVRegressionChart />
          </Card>
        </FadeIn>

        {/* Actual vs Predicted Scatter */}
        <FadeIn direction="right" className="lg:col-span-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Actual vs. Predicted Sales Scatter
                </CardTitle>
                <Badge variant="emerald" className="font-mono text-[11px]">Residual Evaluation</Badge>
              </div>
              <CardDescription>
                Comparison of actual ground truth sales values against model estimates along the ideal fit line (y = x).
              </CardDescription>
            </CardHeader>

            <ActualVsPredChart />
          </Card>
        </FadeIn>
      </div>

      {/* Main Charts Row 2: Channel Efficiency Bar Chart & Insight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <FadeIn direction="up" className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Channel Efficiency Comparison
              </CardTitle>
              <CardDescription>
                Average sales contribution per $1,000 invested by media channel
              </CardDescription>
            </CardHeader>

            <ChannelImpactChart />
          </Card>
        </FadeIn>

        {/* Analytical Key Insights */}
        <FadeIn direction="up" delay={0.1} className="lg:col-span-5 space-y-4">
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Synergy Multiplier</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Combining TV and Radio advertising yields a statistically significant positive cross-term coefficient (+0.000418).
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Diminishing TV Returns</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The negative quadratic coefficient (-0.000106) confirms diminishing marginal returns when TV spend exceeds $220,000.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
