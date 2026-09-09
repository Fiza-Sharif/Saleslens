import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconDimensions =
    size === 'sm' ? { width: 28, height: 28, className: 'w-7 h-7' } :
    size === 'lg' ? { width: 44, height: 44, className: 'w-11 h-11' } :
    { width: 36, height: 36, className: 'w-9 h-9' };

  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 ${className}`}>
      {/* Official SalesLens Logo Image */}
      <div className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-xs border border-slate-200/60 dark:border-slate-800 bg-slate-900 ${iconDimensions.className}`}>
        <img
          src="/saleslens.PNG"
          alt="SalesLens Official Logo"
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textSize}`}>
          <span className="text-slate-900 dark:text-white">Sales</span>
          <span className="text-brand-600 dark:text-brand-400">Lens</span>
        </span>
      )}
    </Link>
  );
}
