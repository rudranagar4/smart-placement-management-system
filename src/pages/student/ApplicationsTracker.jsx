import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import Badge from '../../components/ui/Badge';
import {
  Layers,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  Building2,
  ChevronRight
} from 'lucide-react';

export default function ApplicationsTracker({ setActivePage }) {
  const { applications, drives, currentStudentData } = usePlacement();
  const student = currentStudentData || {};

  const myApplications = applications.filter(a => a.studentId === student.id);

  // Standard pipeline milestones
  const stages = ['Applied', 'Shortlisted', 'Test Scheduled', 'Interview Scheduled', 'Offered'];

  const getStageIndex = (status) => {
    if (status === 'Applied') return 0;
    if (status === 'Shortlisted') return 1;
    if (status === 'Test Scheduled') return 2;
    if (status === 'Interview Scheduled') return 3;
    if (status === 'Offered') return 4;
    return 1;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Recruitment Journey
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          My Applications Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Track stage progression, review feedback, and monitor test/interview schedules in real time.
        </p>
      </div>

      {myApplications.length === 0 ? (
        <div className="mt-12 p-12 text-center rounded-3xl glass-panel border">
          <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No active applications yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You haven't applied to any campus drives yet. Check the catalog for eligible openings.
          </p>
          <button
            onClick={() => setActivePage('student-jobs')}
            className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md cursor-pointer hover:bg-indigo-700 transition-colors"
          >
            Explore Active Drives
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {myApplications.map((app) => {
            const drive = drives.find(d => d.id === app.driveId);
            if (!drive) return null;

            const currentIndex = getStageIndex(app.status);
            const isRejected = app.status === 'Rejected';

            return (
              <div
                key={app.id}
                className="p-6 sm:p-8 rounded-3xl glass-panel border shadow-xs hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 p-2 border border-indigo-200/50 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {drive.companyName}
                        </h3>
                        <Badge status={app.status}>{app.status}</Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {drive.role} • <strong className="font-mono text-indigo-600 dark:text-indigo-400">₹{drive.packageLPA} LPA</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-500">
                    <div>Applied On: <span className="font-medium text-slate-800 dark:text-slate-200">{app.appliedAt}</span></div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Ref: {app.id}</div>
                  </div>
                </div>

                {/* Visual Pipeline Progress */}
                <div className="my-6">
                  <div className="relative flex items-center justify-between">
                    {/* Background line */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />

                    {stages.map((stg, idx) => {
                      const isCompleted = idx <= currentIndex && !isRejected;
                      const isCurrent = idx === currentIndex && !isRejected;

                      return (
                        <div key={stg} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCompleted
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950'
                                : isCurrent
                                ? 'bg-indigo-600 text-white animate-pulse ring-4 ring-indigo-200'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <span className={`text-[10px] sm:text-xs mt-2 font-semibold text-center whitespace-nowrap ${
                            isCompleted ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400'
                          }`}>
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes and History Trail */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Current Stage Notes:
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{app.notes}"
                  </p>

                  {/* Stage history */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap gap-2 text-[11px]">
                    <span className="font-semibold text-slate-500">Milestone Log:</span>
                    {app.history?.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                        {h.stage} ({h.date})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Offer or Schedule CTA */}
                {app.status === 'Offered' && (
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <span className="font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Official Offer Letter Extended
                    </span>
                    <button
                      onClick={() => setActivePage('student-offers')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                    >
                      View & Accept Offer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
