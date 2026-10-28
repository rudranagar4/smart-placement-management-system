import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import StatCard from '../../components/ui/StatCard';
import {
  Users,
  Building2,
  Briefcase,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  FileSpreadsheet,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function AdminDashboard({ setActivePage }) {
  const { students, companies, drives, applications, offers, logs, approveCompany, verifyStudent } = usePlacement();

  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.placed).length;
  const placementRate = totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(1) : '0';

  const pendingCompanies = companies.filter(c => !c.approved);
  const unverifiedStudents = students.filter(s => !s.verified);

  const highestPackage = drives.reduce((max, d) => d.packageLPA > max ? d.packageLPA : max, 0);
  const avgPackage = (drives.reduce((sum, d) => sum + d.packageLPA, 0) / (drives.length || 1)).toFixed(1);

  const branchSummary = [
    { branch: 'CSE', total: 240, placed: 236 },
    { branch: 'IT', total: 180, placed: 174 },
    { branch: 'ECE', total: 200, placed: 184 },
    { branch: 'EE', total: 120, placed: 104 },
    { branch: 'Mech', total: 140, placed: 118 }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Executive Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white border border-indigo-900/60 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Training & Placement Directorate Console
              </h1>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                ● Live 2025-26 Season
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Dr. K. S. Verma (Head, T&P) • Institutional Placement Oversight & Governance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
          <button
            onClick={() => setActivePage('admin-notices')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Bell className="w-4 h-4" />
            <span>Broadcast Notice</span>
          </button>
          <button
            onClick={() => setActivePage('admin-reports')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 cursor-pointer transition-colors"
          >
            Full Analytics Audit
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        <StatCard
          title="Placement Success Rate"
          value={Number(placementRate)}
          suffix="%"
          subtext={`${placedStudents} of ${totalStudents} graduating placed`}
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Highest CTC Package"
          value={highestPackage}
          prefix="₹"
          suffix=" LPA"
          subtext="Google / Microsoft Tier-1"
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          title="Registered Recruiters"
          value={companies.length}
          subtext="Fortune 500 corporate partners"
          icon={Building2}
          color="cyan"
        />
        <StatCard
          title="Active Drives"
          value={drives.filter(d => d.status === 'Active').length}
          subtext="Campus application pipelines"
          icon={Briefcase}
          color="amber"
        />
      </div>

      {/* Action Center: Pending Verifications & Approvals */}
      {(pendingCompanies.length > 0 || unverifiedStudents.length > 0) && (
        <div className="mt-8 p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Action Required: Pending Institutional Approvals
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCompanies.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</h4>
                  <div className="text-[11px] text-slate-500">{c.industry} • {c.hrContact}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approveCompany(c.id, true)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => approveCompany(c.id, false)}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-600 text-[11px] cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {unverifiedStudents.map(s => (
              <div key={s.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{s.name} ({s.rollNo})</h4>
                  <div className="text-[11px] text-slate-500">{s.branch} • {s.cgpa} CGPA</div>
                </div>
                <button
                  onClick={() => verifyStudent(s.id, true)}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer"
                >
                  Verify Records
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Middle Grid: Department Placement Rates + Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Department Placement Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cohort Placement Across Disciplines
                </h3>
                <p className="text-xs text-slate-500">Total registered vs placed students</p>
              </div>
              <button
                onClick={() => setActivePage('admin-reports')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchSummary} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="branch" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="total" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Enrolled" />
                  <Bar dataKey="placed" fill="#6366f1" radius={[4, 4, 0, 0]} name="Placed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Real-time Audit Logs Stream */}
        <div className="p-6 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Live Audit Activity</span>
              </h3>
              <button
                onClick={() => setActivePage('admin-logs')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800/80">
              {logs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-2.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{log.actor}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-1">
                    {log.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage('admin-students')}
              className="w-full py-2 text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Manage Student Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
