import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtext, icon: Icon, trend, color = 'indigo', prefix = '', suffix = '' }) {
  const [displayVal, setDisplayVal] = useState(0);

  // Animate count-up if value is numeric
  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1200; // ms
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayVal(end);
          clearInterval(timer);
        } else {
          setDisplayVal(Number(start.toFixed(1)));
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setDisplayVal(value);
    }
  }, [value]);

  const colorStyles = {
    terracotta: 'from-orange-500/15 via-orange-500/5 to-transparent text-orange-600 dark:text-orange-400 border-orange-200/90 dark:border-orange-500/30',
    indigo: 'from-indigo-500/15 via-indigo-500/5 to-transparent text-indigo-600 dark:text-indigo-400 border-indigo-200/90 dark:border-indigo-500/30',
    emerald: 'from-emerald-500/15 via-emerald-500/5 to-transparent text-emerald-600 dark:text-emerald-400 border-emerald-200/90 dark:border-emerald-500/30',
    sage: 'from-emerald-500/15 via-teal-500/5 to-transparent text-emerald-600 dark:text-emerald-400 border-emerald-200/90 dark:border-emerald-500/30',
    amber: 'from-amber-500/15 via-amber-500/5 to-transparent text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-500/30',
    rose: 'from-rose-500/15 via-rose-500/5 to-transparent text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-500/30',
    cyan: 'from-cyan-500/15 via-sky-500/5 to-transparent text-cyan-600 dark:text-cyan-400 border-cyan-200/90 dark:border-cyan-500/30',
    purple: 'from-purple-500/15 via-purple-500/5 to-transparent text-purple-600 dark:text-purple-400 border-purple-200/90 dark:border-purple-500/30',
  };

  const iconBg = {
    terracotta: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/20',
    indigo: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20',
    emerald: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
    sage: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
    amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20',
    rose: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20',
    cyan: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/20',
    purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl p-5 border glass-panel transition-all ${colorStyles[color] || colorStyles.terracotta}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl backdrop-blur-md ${iconBg[color] || iconBg.terracotta}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {prefix}{typeof displayVal === 'number' ? displayVal.toLocaleString() : displayVal}{suffix}
        </h3>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
