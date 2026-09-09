'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MODEL_METRICS, MODEL_COEFFICIENTS, MODEL_INTERCEPT } from '@/lib/ml-engine';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { IconPop } from '@/components/animations/IconPop';
import {
  BrainCircuit,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function ModelPage() {
  const coefficientTable = [
    { name: 'Intercept (β₀)', symbol: '1', weight: MODEL_INTERCEPT.toFixed(5), desc: 'Baseline sales output with zero ad spend' },
    { name: 'TV Linear (β₁)', symbol: 'TV', weight: MODEL_COEFFICIENTS.tv.toFixed(5), desc: 'Primary linear awareness driver' },
    { name: 'Radio Linear (β₂)', symbol: 'Radio', weight: MODEL_COEFFICIENTS.radio.toFixed(5), desc: 'Direct audio conversion driver' },
    { name: 'Newspaper Linear (β₃)', symbol: 'Newspaper', weight: MODEL_COEFFICIENTS.newspaper.toFixed(5), desc: 'Print publication reach' },
    { name: 'TV Quadratic (β₄)', symbol: 'TV²', weight: MODEL_COEFFICIENTS.tv_sq.toFixed(6), desc: 'Captures TV diminishing returns curvature' },
    { name: 'TV × Radio Synergy (β₅)', symbol: 'TV × Radio', weight: `+${MODEL_COEFFICIENTS.tv_radio.toFixed(6)}`, desc: 'Synergy multiplier between TV awareness & Radio frequency' },
    { name: 'TV × Newspaper (β₆)', symbol: 'TV × Newspaper', weight: MODEL_COEFFICIENTS.tv_news.toFixed(6), desc: 'Cross-channel print & broadcast interaction' },
    { name: 'Radio Quadratic (β₇)', symbol: 'Radio²', weight: `+${MODEL_COEFFICIENTS.radio_sq.toFixed(6)}`, desc: 'Quadratic audio frequency contribution' },
    { name: 'Radio × Newspaper (β₈)', symbol: 'Radio × Newspaper', weight: `+${MODEL_COEFFICIENTS.radio_news.toFixed(6)}`, desc: 'Audio and print local interaction' },
    { name: 'Newspaper Quadratic (β₉)', symbol: 'Newspaper²', weight: `+${MODEL_COEFFICIENTS.news_sq.toFixed(6)}`, desc: 'Print repetition effect' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <FadeIn className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">Machine Learning Architecture</Badge>
            <span className="text-xs text-slate-400 font-mono">Degree-2 Polynomial Regression</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Model Specifications & Equation
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Technical documentation of feature engineering, fitted weight coefficients, and non-linear regression mechanics.
          </p>
        </div>
      </FadeIn>

      {/* Model Overview Summary Cards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StaggerItem>
          <Card hoverEffect className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>POLYNOMIAL DEGREE</span>
              <IconPop>
                <BrainCircuit className="w-4 h-4 text-brand-600" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              Degree = 2
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Expands 3 raw features into 9 polynomial terms
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hoverEffect className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>FITTED COEFFICIENTS</span>
              <IconPop>
                <Sliders className="w-4 h-4 text-emerald-500" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              9 Parameters
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trained using Ordinary Least Squares (OLS)
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hoverEffect className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>MODEL VARIANCE (R²)</span>
              <IconPop>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </IconPop>
            </div>
            <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              R² = 0.9533
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Outperforms Linear Regression (R² = 0.897)
            </p>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Mathematical Equation Card */}
      <FadeIn>
        <Card className="bg-slate-900 text-white border-slate-800 space-y-4">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-400" />
              Degree-2 Polynomial Regression Equation
            </CardTitle>
            <CardDescription className="text-slate-400">
              Mathematical formula executed by the prediction engine
            </CardDescription>
          </CardHeader>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-brand-300 overflow-x-auto leading-relaxed">
            <p>
              Sales = 5.1509 + 0.07622(TV) - 0.03198(Radio) - 0.00192(News)
            </p>
            <p className="pl-8 text-rose-400">
              - 0.000106(TV²) + 0.000419(TV × Radio) - 0.000026(TV × News)
            </p>
            <p className="pl-8 text-emerald-400">
              + 0.001448(Radio²) + 0.000165(Radio × News) + 0.000085(News²)
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Coefficients Table */}
      <FadeIn>
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle className="text-lg">Fitted Weight Matrix (Coefficients)</CardTitle>
            <CardDescription>
              Weights assigned to each feature after training on the advertising dataset
            </CardDescription>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                  <th className="py-3 px-4">Feature Name</th>
                  <th className="py-3 px-4 font-mono">Term Symbol</th>
                  <th className="py-3 px-4 font-mono">Fitted Weight</th>
                  <th className="py-3 px-4">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {coefficientTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="py-3 px-4 font-mono text-brand-600 dark:text-brand-400 font-bold">{row.symbol}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{row.weight}</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
