'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TVRegressionChart } from '@/components/charts/TVRegressionChart';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { IconPop } from '@/components/animations/IconPop';
import {
  SlidersHorizontal,
  Database,
  BrainCircuit,
  Zap,
  LineChart,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <div className="space-y-20 pb-20 relative">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 md:pt-20 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <motion.div
              className="lg:col-span-6 space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Badge variant="blue" className="gap-1.5 py-1.5 px-3.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Enterprise ML Revenue Intelligence</span>
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]"
              >
                Predict Sales.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Drive Smarter.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
              >
                SalesLens harnesses Degree-2 Polynomial Regression machine learning to accurately forecast product demand from multi-channel advertising spend across TV, Radio, and Newspaper.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/prediction">
                  <Button size="lg" icon={<SlidersHorizontal className="w-5 h-5" />}>
                    Start Prediction Engine
                  </Button>
                </Link>
                <Link href="/dataset">
                  <Button variant="secondary" size="lg" icon={<Database className="w-5 h-5" />}>
                    Explore Dataset
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Metrics Strip */}
              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4"
              >
                <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm">
                  <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">95.3%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">R² Accuracy Score</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm">
                  <p className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">0.903</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mean Abs Error</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm">
                  <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">200</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Training Samples</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Interactive Chart Card */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Live Polynomial Fit Preview
                    </h2>
                    <p className="text-xs text-slate-500">Non-linear TV Advertising vs Sales Fit</p>
                  </div>
                  <Badge variant="emerald" className="font-mono">
                    R² = 0.953
                  </Badge>
                </div>

                <TVRegressionChart />

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    Actual Market Sales
                  </span>
                  <span className="font-medium text-rose-500 flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-rose-500 inline-block" />
                    Polynomial Fit Line
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="blue">Why SalesLens</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Precision Revenue Optimization
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Standard linear models fail to capture diminishing returns and multi-channel synergy. Our polynomial engine provides true non-linear insight.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <Card hoverEffect className="space-y-4 h-full bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
              <IconPop className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                <BrainCircuit className="w-6 h-6" />
              </IconPop>
              <div>
                <CardTitle className="text-lg">Non-Linear Modeling</CardTitle>
                <CardDescription className="mt-1">
                  Degree-2 Polynomial Features capture curvature and inflection points where ad spend begins experiencing diminishing returns.
                </CardDescription>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Squared quadratic feature transformations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Cross-channel interaction terms (TV × Radio)
                </li>
              </ul>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card hoverEffect className="space-y-4 h-full bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
              <IconPop className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <Zap className="w-6 h-6" />
              </IconPop>
              <div>
                <CardTitle className="text-lg">Real-Time Allocator</CardTitle>
                <CardDescription className="mt-1">
                  Interactive parameter sliders dynamically update revenue estimates, campaign ROI percentages, and efficiency scores in milliseconds.
                </CardDescription>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Instant budget share donut breakdown
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Preset strategy scenario benchmarks
                </li>
              </ul>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card hoverEffect className="space-y-4 h-full bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
              <IconPop className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                <LineChart className="w-6 h-6" />
              </IconPop>
              <div>
                <CardTitle className="text-lg">Dataset Explorer</CardTitle>
                <CardDescription className="mt-1">
                  Inspect the full 200 historical advertising observations with interactive column sorting, statistical summaries, and instant CSV export.
                </CardDescription>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  Search & filter records on the fly
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  Full mean, min, max statistical distributions
                </li>
              </ul>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Modern Sleek CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 border border-indigo-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
              <Badge variant="blue" className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 gap-1.5 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ready to Optimize Revenue?</span>
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Simulate Your Next Campaign Budget
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test custom TV, Radio, and Newspaper allocations to maximize total sales volume and advertising ROI using real-time machine learning inference.
              </p>
            </div>

            <div className="flex-shrink-0 relative z-10">
              <Link href="/prediction">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-indigo-500/25 border border-indigo-400/30 font-bold px-8">
                  Launch Predictor
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
