import React from 'react';
import { motion } from 'framer-motion';
import { usePlacement } from '../../context/PlacementContext';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

export default function StudentDashboard({ setActivePage }) {
  const { currentStudentData, drives, applications, offers, interviews } = usePlacement();
  const student = currentStudentData || {};

  // Stats
  const myApplications = applications.filter(a => a.studentId === student.id);
  const myOffers = offers.filter(o => o.studentId === student.id);
  const myInterviews = interviews.filter(i => i.studentId === student.id);
  const myShortlisted = myApplications.filter(a => ['Shortlisted', 'Test Scheduled', 'Interview Scheduled', 'Offered'].includes(a.status));

  // Calculate profile completeness
  const calculateCompleteness = () => {
    let score = 0;
    if (student.name) score += 10;
    if (student.rollNo) score += 10;
    if (student.email) score += 10;
    if (student.cgpa) score += 15;
    if (student.tenthMarks && student.twelfthMarks) score += 10;
    if (student.skills && student.skills.length > 0) score += 15;
    if (student.projects && student.projects.length > 0) score += 15;
    if (student.linkedin || student.github) score += 15;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  // Application stage distribution for chart
  const appStagesData = [
    { name: 'Applied', count: myApplications.filter(a => a.status === 'Applied').length || 1, color: '#A89E94' },
    { name: 'Shortlisted', count: myApplications.filter(a => a.status === 'Shortlisted').length || 1, color: '#C25E38' },
    { name: 'Interviews', count: myApplications.filter(a => a.status === 'Interview Scheduled').length || 1, color: '#D97706' },
    { name: 'Offered', count: myOffers.length || 1, color: '#2D5A43' }
  ];

  // Recommended jobs based on matching skills
  const recommendedDrives = drives.filter(d => {
    const studentSkills = student.skills || [];
    return d.skillsRequired?.some(req => studentSkills.some(s => s.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(s.toLowerCase())));
  }).slice(0, 3);

  // Check eligibility helper
  const checkEligibility = (drive) => {
    if (!drive.eligibility) return { eligible: true };
    if (student.cgpa < drive.eligibility.minCgpa) {
      return { eligible: false, reason: `Min CGPA ${drive.eligibility.minCgpa}` };
    }
    if (drive.eligibility.maxBacklogs < student.backlogs) {
      return { eligible: false, reason: 'Active backlogs' };
    }
    if (drive.eligibility.allowedBranches && !drive.eligibility.allowedBranches.includes(student.branch)) {
      return { eligible: false, reason: 'Branch not eligible' };
    }
    return { eligible: true };
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#24201D] via-[#352D26] to-[#1C1917] text-white shadow-2xl border border-[#C25E38]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <img
            src={student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
            alt={student.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#C25E38]/40 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Welcome back, {student.name?.split(' ')[0]}! 👋
              </h1>
              {student.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#2D5A43]/40 text-emerald-300 border border-[#2D5A43]/60 px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3" /> Verified Student
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {student.branch} • Sem {student.semester} • <strong className="text-[#F5EFEB] font-mono">{student.cgpa || 9.1} CGPA</strong>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#C25E38] font-mono text-[11px]">Roll: {student.rollNo || '0251csds289'}</span>
              <span className="text-stone-500">•</span>
              <span className="text-[#D97706] font-semibold">{myOffers.length} Active Offers</span>
            </div>
          </div>
        </div>

        {/* Profile Completeness Ring Widget */}
        <div
          onClick={() => setActivePage('student-profile')}
          className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointer self-stretch md:self-auto"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000"
                strokeDasharray={`${completeness}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-extrabold text-white">{completeness}%</span>
          </div>
          <div>
            <div className="text-xs font-bold text-white">Profile Readiness</div>
            <div className="text-[10px] text-indigo-200">
              {completeness === 100 ? 'All records complete' : 'Update resume & skills'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        <StatCard
          title="Applications Sent"
          value={myApplications.length}
          subtext="Active recruitment cycles"
          icon={Layers}
          color="indigo"
        />
        <StatCard
          title="Shortlisted Rounds"
          value={myShortlisted.length}
          subtext="Qualified for next stages"
          icon={CheckCircle2}
          color="cyan"
        />
        <StatCard
          title="Scheduled Interviews"
          value={myInterviews.length}
          subtext="Upcoming video & campus rounds"
          icon={Calendar}
          color="amber"
        />
        <StatCard
          title="Received Offers"
          value={myOffers.length}
          subtext="Official placement offers"
          icon={Award}
          color="emerald"
        />
      </div>

      {/* 3. Middle Section: Upcoming Drives + Application Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Upcoming Drives & Deadlines */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Upcoming Campus Drives</span>
                </h3>
                <p className="text-xs text-slate-500">Live recruitment drives matching your department</p>
              </div>
              <button
                onClick={() => setActivePage('student-jobs')}
                className="text-xs font-semibold text-[#C25E38] dark:text-[#E07A55] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({drives.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800/80">
              {drives.slice(0, 4).map((drive) => {
                const applied = myApplications.some(a => a.driveId === drive.id);
                const eligibility = checkEligibility(drive);

                return (
                  <div key={drive.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 p-1.5 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-[#C25E38]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {drive.companyName}
                          </h4>
                          <span className="text-[10px] font-bold text-[#2D5A43] dark:text-emerald-400 bg-[#2D5A43]/10 dark:bg-[#2D5A43]/25 px-2 py-0.5 rounded-full">
                            ₹{drive.packageLPA} LPA
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">{drive.role}</div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Deadline: {drive.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {eligibility.eligible ? (
                        <span className="text-[10px] font-semibold text-[#2D5A43] dark:text-emerald-400 bg-[#2D5A43]/10 dark:bg-[#2D5A43]/30 px-2 py-1 rounded-md">
                          Eligible
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-1 rounded-md">
                          {eligibility.reason}
                        </span>
                      )}

                      {applied ? (
                        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#C25E38]/10 text-[#C25E38]">
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => setActivePage('student-jobs')}
                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#C25E38] hover:bg-[#A94E2C] text-white cursor-pointer transition-colors shadow-xs"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Application Stage Overview Chart */}
        <div className="p-6 rounded-3xl glass-panel border flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Application Pipeline
            </h3>
            <p className="text-xs text-slate-500 mb-4">Stages of your active placement applications</p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appStagesData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {appStagesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
              {appStagesData.map((st, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                  <span>{st.name} ({st.count})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage('student-apps')}
              className="w-full py-2 text-center text-xs font-semibold text-[#C25E38] dark:text-[#E07A55] bg-[#C25E38]/10 rounded-xl hover:bg-[#C25E38]/20 transition-colors cursor-pointer"
            >
              Open Application Timeline Tracker
            </button>
          </div>
        </div>
      </div>

      {/* 4. Recommended Jobs Based on Skills */}
      <div className="mt-8 p-6 rounded-3xl glass-panel border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C25E38]" />
              <span>Recommended Drives Based on Your Profile Skills</span>
            </h3>
            <p className="text-xs text-slate-500">
              Matched against your verified competencies ({student.skills?.slice(0, 4).join(', ')})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedDrives.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 flex flex-col justify-between hover:border-[#C25E38]/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{d.companyName}</span>
                  <span className="text-xs font-extrabold text-[#C25E38] dark:text-[#E07A55] font-mono">
                    ₹{d.packageLPA} LPA
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">{d.role}</div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {d.skillsRequired?.slice(0, 3).map((sk, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage('student-jobs')}
                className="w-full py-2 text-center text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C25E38] hover:text-white transition-colors cursor-pointer"
              >
                View Criteria & Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
