'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useUser } from '@/context/UserContext';
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  User as UserIcon,
  SlidersHorizontal,
  LogOut,
  ChevronDown,
  Settings,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Prediction', href: '/prediction' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Dataset', href: '/dataset' },
    { name: 'Model', href: '/model' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/60 dark:bg-slate-800/40 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-semibold shadow-xs border border-slate-200/50 dark:border-slate-700/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & User Avatar / Auth */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            {user.isLoggedIn ? (
              /* Logged In User Avatar Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-500/30">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Content Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 text-xs space-y-1">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                    >
                      <Settings className="w-4 h-4 text-brand-600" />
                      Profile & Avatar Settings
                    </Link>

                    <Link
                      href="/prediction"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                      Sales Predictor Engine
                    </Link>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Buttons */
              <>
                <Link
                  href="/login"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    pathname === '/login'
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800'
                      : 'text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow-sm shadow-brand-500/20 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2">
          {user.isLoggedIn && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 mb-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-slate-500 font-mono">{user.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold border border-brand-200/60 dark:border-brand-800/60'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {user.isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
                >
                  <Settings className="w-4 h-4" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg text-rose-600 bg-rose-50 dark:bg-rose-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg text-white bg-brand-600"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
