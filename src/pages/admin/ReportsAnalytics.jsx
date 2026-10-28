import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  TrendingUp,
  Award,
  Download,
  Users,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Printer,
  Mail,
  Send
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

export default function ReportsAnalytics() {
  const { students, drives, companies, offers } = usePlacement();
  const [reminderSent, setReminderSent] = useState(false);

  const unplacedStudents = students.filter(s => !s.placed);

  const branchStats = [
    { branch: 'CSE', total: 240, placed: 236, rate: 98.3, avgCTC: 19.4 },
    { branch: 'IT', total: 180, placed: 174, rate: 96.6, avgCTC: 17.8 },
    { branch: 'ECE', total: 200, placed: 184, rate: 92.0, avgCTC: 14.2 },
    { branch: 'EE', total: 120, placed: 104, rate: 86.6, avgCTC: 11.5 },
    { branch: 'Mech', total: 140, placed: 118, rate: 84.2, avgCTC: 9.8 },
    { branch: 'Civil', total: 90, placed: 72, rate: 80.0, avgCTC: 8.5 }
  ];

  const packageDistribution = [
    { name: 'Super Dream (>₹30 LPA)', count: 48, fill: '#6366f1' },
    { name: 'Dream (₹15 - ₹30 LPA)', count: 185, fill: '#06b6d4' },
    { name: 'Tier-1 (₹8 - ₹15 LPA)', count: 340, fill: '#10b981' },
    { name: 'Mass / Standard (₹4.5 - ₹8 LPA)', count: 315, fill: '#f59e0b' }
  ];

  const handleSendMentoringReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  const exportSummaryCSV = () => {
    const headers = ['Branch,Total Enrolled,Placed Count,Placement Rate (%),Average Package (LPA)'];
    const rows = branchStats.map(b => `"${b.branch}","${b.total}","${b.placed}","${b.rate}%","₹${b.avgCTC} LPA"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Institutional_Placement_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Institutional Audit & Analytics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Placement Intelligence & Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Executive institutional intelligence, package tier analytics, unplaced cohort mentoring lists, and official exports.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={exportSummaryCSV}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Export Analytics CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Summary</span>
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Gross Cohort Offers</div>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">1,420+</div>
          <div className="text-xs text-emerald-600 mt-1">Season High</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Highest Package</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹48.2 LPA</div>
          <div className="text-xs text-slate-500 mt-1">Google Super Dream</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Average CTC</div>
          <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">₹16.8 LPA</div>
          <div className="text-xs text-emerald-600 mt-1">+11.2% growth</div>
        </div>
        <div className="p-5 rounded-2xl glass-panel">
          <div className="text-xs text-slate-500">Unplaced Students</div>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{unplacedStudents.length}</div>
          <div className="text-xs text-slate-500 mt-1">Assigned to Mentors</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Department-Wise Average CTC (₹ LPA)
          </h3>
          <p className="text-xs text-slate-500 mb-6">Median and average compensation per engineering faculty</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="branch" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }} formatter={(v) => [`₹${v} LPA`, 'Average Package']} />
                <Bar dataKey="avgCTC" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Placement Tier Distribution
          </h3>
          <p className="text-xs text-slate-500 mb-6">Offers segmented by salary bracket tiers</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageDistribution}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Unplaced Students Mentoring Center */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-500" />
              <span>Unplaced Students Cohort Tracking ({unplacedStudents.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted support list for alumni mock interviews, resume refactoring, and Tier-2 drive allocations.
            </p>
          </div>

          <button
            onClick={handleSendMentoringReminder}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{reminderSent ? 'Reminders Dispatched ✓' : 'Send Prep Marathon Invite'}</span>
          </button>
        </div>

        {reminderSent && (
          <div className="my-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Special notification and mock interview booking links dispatched to all {unplacedStudents.length} unplaced students!</span>
          </div>
        )}

        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800/80">
          {unplacedStudents.map((s) => (
            <div key={s.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{s.rollNo} • {s.branch}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold font-mono text-indigo-600">{s.cgpa} CGPA</span>
                <span className={`text-[11px] font-semibold ${s.backlogs === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {s.backlogs} Backlog(s)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 text-[11px] font-bold">
                  Active Seeking
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
