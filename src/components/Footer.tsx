import Link from 'next/link';
import { Logo } from './Logo';
import { Cpu, BarChart3, Database, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              SalesLens is a production-grade Polynomial Regression sales forecasting platform designed to model non-linear advertising impacts across TV, Radio, and Newspaper channels.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                Degree-2 Polynomial Regression
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                R² Score: 0.953
              </span>
            </div>
          </div>

          {/* Column 2: Core Platform Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/prediction" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Sales Predictor
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dataset" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Advertising Dataset
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Model & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Architecture</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/model" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Model Specifications
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About SalesLens
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SalesLens Machine Learning Systems. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono">
            <span>Powered by Next.js & React</span>
            <span>•</span>
            <span>scikit-learn Polynomial Model</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
