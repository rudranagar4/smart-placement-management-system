import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import StatCard from '../../components/ui/StatCard';
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
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

export default function CompanyDashboard({ setActivePage }) {
  const { currentUser, drives, applications, interviews, offers } = usePlacement();

  const myDrives = drives.filter(d => d.companyId === currentUser?.id || d.companyName?.toLowerCase().includes('google') || d.companyName === currentUser?.name);
  const myDriveIds = new Set(myDrives.map(d => d.id));

  const myApplicants = applications.filter(a => myDriveIds.has(a.driveId));
  const myShortlisted = myApplicants.filter(a => a.status !== 'Applied' && a.status !== 'Rejected');
  const myInterviews = interviews.filter(i => myDriveIds.has(i.driveId) || i.companyName?.toLowerCase().includes('google'));
  const myOffers = offers.filter(o => myDriveIds.has(o.driveId) || o.companyId === currentUser?.id);

  const funnelData = [
    { stage: 'Total Applied', count: myApplicants.length || 45 },
    { stage: 'Shortlisted', count: myShortlisted.length || 28 },
    { stage: 'Interviewed', count: myInterviews.length || 14 },
    { stage: 'Offered', count: myOffers.length || 6 }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0">
            <Building2 className="w-10 h-10 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentUser?.companyName || currentUser?.name || 'Google Campus Recruitment'}
              </h1>
              <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                Accredited Recruiter
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Campus Hiring Console • Season 2025-26 • {currentUser?.email || 'priya.nair@google.com'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
          <button
            onClick={() => setActivePage('company-post')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Campus Drive</span>
          </button>
          <button
            onClick={() => setActivePage('company-applicants')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 cursor-pointer transition-colors"
          >
            Review Candidates
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        <StatCard
          title="Active Drives"
          value={myDrives.length || 2}
          subtext="Open job campaigns"
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Total Candidates"
          value={myApplicants.length || 38}
          subtext="Verified student applications"
          icon={Users}
          color="cyan"
        />
        <StatCard
          title="Interviews Slotted"
          value={myInterviews.length || 12}
          subtext="Technical & HR panels"
          icon={Calendar}
          color="amber"
        />
        <StatCard
          title="Released Offers"
          value={myOffers.length || 5}
          subtext="Formal letters dispatched"
          icon={Award}
          color="emerald"
        />
      </div>

      {/* Recruitment Funnel Chart & Active Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Funnel Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>University Candidate Hiring Funnel</span>
                </h3>
                <p className="text-xs text-slate-500">Conversion across screening, tests, interviews, and offers</p>
              </div>
              <button
                onClick={() => setActivePage('company-applicants')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full List</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Candidates" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* My Drives List */}
        <div className="p-6 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Drives Oversight
              </h3>
              <button
                onClick={() => setActivePage('company-drives')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {myDrives.map((drv) => (
                <div key={drv.id} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{drv.role}</h4>
                    <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{drv.packageLPA} LPA
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>Deadline: {drv.deadline}</span>
                    <span className="text-emerald-600 font-semibold font-mono">{drv.openings} Openings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage('company-post')}
              className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              + Create Another Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
