import React from 'react';

export default function Badge({ children, status, size = 'sm', showDot = true }) {
  const normalized = (status || children || '').toLowerCase();

  let styles = 'glass-pill text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/60';
  let dotColor = 'bg-stone-400';

  if (normalized.includes('offer') || normalized.includes('placed') || normalized.includes('accepted')) {
    styles = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 backdrop-blur-md font-semibold';
    dotColor = 'bg-emerald-500 animate-pulse';
  } else if (normalized.includes('shortlist') || normalized.includes('verified')) {
    styles = 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/40 backdrop-blur-md font-semibold';
    dotColor = 'bg-indigo-500';
  } else if (normalized.includes('interview') || normalized.includes('test') || normalized.includes('scheduled')) {
    styles = 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40 backdrop-blur-md font-semibold';
    dotColor = 'bg-amber-500';
  } else if (normalized.includes('reject') || normalized.includes('decline') || normalized.includes('blocked') || normalized.includes('ineligible')) {
    styles = 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40 backdrop-blur-md font-semibold';
    dotColor = 'bg-rose-500';
  } else if (normalized.includes('pending') || normalized.includes('review')) {
    styles = 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/40 backdrop-blur-md font-semibold';
    dotColor = 'bg-orange-500';
  }

  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${styles}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children}
    </span>
  );
}
