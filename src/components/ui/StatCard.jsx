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
    terracotta: 'from-[#C25E38]/12 via-[#D97706]/5 to-transparent text-[#C25E38] border-[#C25E38]/25',
    indigo: 'from-[#C25E38]/12 via-[#D97706]/5 to-transparent text-[#C25E38] border-[#C25E38]/25',
    emerald: 'from-[#2D5A43]/12 via-[#2D5A43]/5 to-transparent text-[#2D5A43] dark:text-emerald-400 border-[#2D5A43]/25',
    sage: 'from-[#2D5A43]/12 via-[#2D5A43]/5 to-transparent text-[#2D5A43] dark:text-emerald-400 border-[#2D5A43]/25',
    amber: 'from-[#D97706]/12 via-[#C25E38]/5 to-transparent text-[#D97706] border-[#D97706]/25',
    rose: 'from-[#9C3D28]/12 via-[#C25E38]/5 to-transparent text-[#9C3D28] dark:text-rose-400 border-[#9C3D28]/25',
    cyan: 'from-[#4A6B82]/12 via-[#C25E38]/5 to-transparent text-[#4A6B82] dark:text-sky-400 border-[#4A6B82]/25',
  };

  const iconBg = {
    terracotta: 'bg-[#C25E38]/10 text-[#C25E38]',
    indigo: 'bg-[#C25E38]/10 text-[#C25E38]',
    emerald: 'bg-[#2D5A43]/10 text-[#2D5A43] dark:text-emerald-400',
    sage: 'bg-[#2D5A43]/10 text-[#2D5A43] dark:text-emerald-400',
    amber: 'bg-[#D97706]/10 text-[#D97706]',
    rose: 'bg-[#9C3D28]/10 text-[#9C3D28] dark:text-rose-400',
    cyan: 'bg-[#4A6B82]/10 text-[#4A6B82] dark:text-sky-400',
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
