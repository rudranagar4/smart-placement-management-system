import React from 'react';

export default function Badge({ children, status, size = 'sm', showDot = true }) {
  const normalized = (status || children || '').toLowerCase();

  let styles = 'glass-pill text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/60';
  let dotColor = 'bg-stone-400';

  if (normalized.includes('offer') || normalized.includes('placed') || normalized.includes('accepted')) {
    styles = 'bg-[#2D5A43]/12 text-[#2D5A43] dark:text-emerald-300 border-[#2D5A43]/30 backdrop-blur-md';
    dotColor = 'bg-[#2D5A43] dark:bg-emerald-400 animate-pulse';
  } else if (normalized.includes('shortlist') || normalized.includes('active') || normalized.includes('verified')) {
    styles = 'bg-[#C25E38]/12 text-[#C25E38] dark:text-[#E07A55] border-[#C25E38]/30 backdrop-blur-md';
    dotColor = 'bg-[#C25E38]';
  } else if (normalized.includes('interview') || normalized.includes('test') || normalized.includes('scheduled')) {
    styles = 'bg-[#D97706]/12 text-[#D97706] dark:text-amber-300 border-[#D97706]/30 backdrop-blur-md';
    dotColor = 'bg-[#D97706]';
  } else if (normalized.includes('reject') || normalized.includes('decline') || normalized.includes('blocked') || normalized.includes('ineligible')) {
    styles = 'bg-[#9C3D28]/12 text-[#9C3D28] dark:text-rose-300 border-[#9C3D28]/30 backdrop-blur-md';
    dotColor = 'bg-[#9C3D28]';
  } else if (normalized.includes('pending') || normalized.includes('review')) {
    styles = 'bg-[#7D6B58]/12 text-[#7D6B58] dark:text-stone-300 border-[#7D6B58]/30 backdrop-blur-md';
    dotColor = 'bg-[#7D6B58]';
  }

  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${styles}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children}
    </span>
  );
}
