'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BrainCircuit,
  Target,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  const techStack = [
    { name: 'Next.js 14/15', role: 'React Framework & API Routes', desc: 'App Router architecture with serverless route handlers.' },
    { name: 'TypeScript', role: 'Type Safety', desc: 'Strict static typing across ML model structures and data layers.' },
    { name: 'Tailwind CSS', role: 'Styling & Design System', desc: 'Custom tokens, light/dark mode variables, glassmorphism.' },
    { name: 'Recharts', role: 'Interactive Data Visualizations', desc: 'Custom tooltips, scatter plots, polynomial curves, and donut charts.' },
    { name: 'scikit-learn', role: 'Machine Learning Engine', desc: 'Degree-2 PolynomialFeatures and LinearRegression modeling.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="blue">Enterprise ML Revenue Engine</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About SalesLens
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          SalesLens bridges machine learning analytics and marketing strategy, giving decision-makers clear visibility into non-linear advertising returns.
        </p>
      </div>

      {/* Our Mission & Problem Solved */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200 dark:border-brand-800">
            <Target className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl">The Business Challenge</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Marketing teams spend millions across TV, Radio, and Newspaper channels without clear mathematical insight into channel saturation points. Simple linear models assume that every dollar spent yields the exact same output regardless of total spend—leading to overspending on saturated channels.
          </CardDescription>
        </Card>

        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl">The SalesLens Solution</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            SalesLens applies Degree-2 Polynomial Regression to model both quadratic channel saturation and cross-channel synergy. By accounting for non-linear return rates, marketing leaders can reallocate budget toward high-margin synergy opportunities.
          </CardDescription>
        </Card>
      </div>

      {/* Why Polynomial Regression? */}
      <Card className="space-y-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Why Polynomial Regression Over Simple Linear Regression?
          </CardTitle>
          <CardDescription>
            Comparing mathematical modeling capabilities:
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Traditional Linear Regression</span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                Assumes constant, infinite linear growth without plateau.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                Ignores channel interactions (treats TV and Radio as completely independent).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                Lower overall $R^2$ accuracy score (~0.89 vs 0.953).
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/40 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/60 space-y-3">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">SalesLens Polynomial Regression (Degree 2)</span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Accurately models diminishing returns via quadratic feature terms (TV²).
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Captures multi-channel boost terms (TV × Radio cross-term).
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Achieves 95.33% $R^2$ variance explanation accuracy on benchmark data.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Powered By Modern Tech Stack */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Powered by Modern Web & Machine Learning Tech
          </h2>
          <p className="text-xs text-slate-500">
            Clean component architecture built with strict TypeScript and modern Next.js conventions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => (
            <Card key={idx} hoverEffect className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{tech.name}</h3>
                <Code2 className="w-4 h-4 text-brand-600" />
              </div>
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">{tech.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{tech.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
