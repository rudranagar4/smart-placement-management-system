import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Building2,
  Users,
  CheckCircle2,
  DollarSign,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function PlacementStatsPage({ setActivePage }) {
  const branchData = [
    { branch: 'Computer Science', total: 240, placed: 236, rate: 98.3, avgCTC: 19.4 },
    { branch: 'Information Tech', total: 180, placed: 174, rate: 96.6, avgCTC: 17.8 },
    { branch: 'Electronics & Comm', total: 200, placed: 184, rate: 92.0, avgCTC: 14.2 },
    { branch: 'Electrical Eng', total: 120, placed: 104, rate: 86.6, avgCTC: 11.5 },
    { branch: 'Mechanical Eng', total: 140, placed: 118, rate: 84.2, avgCTC: 9.8 },
    { branch: 'Civil Eng', total: 90, placed: 72, rate: 80.0, avgCTC: 8.5 }
  ];

  const packageDistribution = [
    { name: '₹30+ LPA (Super Dream)', count: 48, color: '#6366f1' },
    { name: '₹15 - ₹30 LPA (Dream)', count: 185, color: '#06b6d4' },
    { name: '₹8 - ₹15 LPA (Tier-1)', count: 340, color: '#10b981' },
    { name: '₹4.5 - ₹8 LPA (Standard)', count: 315, color: '#f59e0b' }
  ];

  const yearlyTrend = [
    { year: '2022', placementRate: 91.2, avgCTC: 10.4, highestCTC: 36.0 },
    { year: '2023', placementRate: 93.8, avgCTC: 12.1, highestCTC: 40.5 },
    { year: '2024', placementRate: 95.4, avgCTC: 13.8, highestCTC: 44.0 },
    { year: '2025', placementRate: 97.1, avgCTC: 15.2, highestCTC: 46.5 },
    { year: '2026 (Live)', placementRate: 98.4, avgCTC: 16.8, highestCTC: 48.2 }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Official Audit & Reports
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Placement Statistics & Trends
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Transparent, audited campus placement records reflecting student achievement across all academic departments.
          </p>
        </div>

        <button
          onClick={() => alert('Official Placement Report 2025-26 PDF downloaded.')}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <Download className="w-4 h-4 text-indigo-500" />
          <span>Export Official PDF Report</span>
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Total Offers</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">1,420+</div>
          <div className="text-xs text-emerald-600 mt-1">+14% vs last year</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Highest Package</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹48.2 LPA</div>
          <div className="text-xs text-slate-500 mt-1">Software Engineering</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Average CTC</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">₹16.8 LPA</div>
          <div className="text-xs text-emerald-600 mt-1">+11.2% growth</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Median Package</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">₹13.5 LPA</div>
          <div className="text-xs text-slate-500 mt-1">Overall cohort</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Branch-wise breakdown */}
        <div className="p-6 rounded-3xl glass-panel border">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Department-Wise Placement Rate (%)
          </h3>
          <p className="text-xs text-slate-500 mb-6">Eligible vs successfully placed students</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} layout="vertical" margin={{ left: 20, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="branch" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Placement Rate']}
                />
                <Bar dataKey="rate" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package distribution pie */}
        <div className="p-6 rounded-3xl glass-panel border">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Salary Bracket Distribution
          </h3>
          <p className="text-xs text-slate-500 mb-6">Percentage breakdown of total campus offers</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageDistribution}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val} students`, 'Count']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5-Year YoY Trend */}
      <div className="mt-8 p-6 rounded-3xl glass-panel border">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          5-Year Historical Growth Trajectory
        </h3>
        <p className="text-xs text-slate-500 mb-6">Consistent surge in average package and hiring company participation</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearlyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="placementRate" name="Placement Rate (%)" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="avgCTC" name="Average CTC (₹ LPA)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="highestCTC" name="Highest CTC (₹ LPA)" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed branch table */}
      <div className="mt-8 rounded-3xl glass-panel border overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Comprehensive Departmental Placement Audit
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/70 dark:bg-slate-950/70 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Discipline / Branch</th>
                <th className="py-3 px-4">Enrolled</th>
                <th className="py-3 px-4">Placed</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">Avg Package</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {branchData.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{b.branch}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{b.total}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{b.placed}</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">{b.rate}%</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">₹{b.avgCTC} LPA</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Accredited
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
