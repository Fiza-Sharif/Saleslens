'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/context/UserContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Cpu, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Update User Context state
    login(email);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Successfully authenticated! Redirecting to Sales Predictor...');
      setTimeout(() => {
        window.location.href = '/prediction';
      }, 800);
    }, 600);
  };

  const handleGoogleSSO = () => {
    login('alex.morgan@saleslens.ai', 'Alex Morgan');
    alert('Google SSO authentication successful. Redirecting to Predictor...');
    window.location.href = '/prediction';
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side Feature Showcase (Desktop) */}
        <div className="hidden lg:block lg:col-span-6 space-y-6 pr-6">
          <Badge variant="blue" className="gap-1.5 py-1 px-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Polynomial Sales Forecasting</span>
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Elevate Your Advertising ROI with Real-Time ML.
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Log in to access your interactive marketing analytics workspace, degree-2 polynomial simulation tools, and real-time campaign budget allocators.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm shadow-xs">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">95.3% Polynomial Accuracy</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Non-linear curvature model tuned on 200 campaign datasets.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm shadow-xs">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Instant Budget Allocator</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Simulate TV, Radio, and Newspaper spend live in milliseconds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-6">
          <div className="text-center lg:text-left space-y-2">
            <Logo size="md" className="justify-center lg:justify-start" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in to your SalesLens account to continue.
            </p>
          </div>

          <Card className="p-6 sm:p-8 space-y-6 shadow-2xl border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="alex.morgan@saleslens.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  Remember me on this device
                </label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-sm mt-2"
                icon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-medium absolute">
                OR
              </span>
            </div>

            {/* Google SSO Button */}
            <button
              type="button"
              onClick={handleGoogleSSO}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>
          </Card>

          {/* Create Account Link */}
          <p className="text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Create Free Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
