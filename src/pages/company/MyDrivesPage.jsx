import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Briefcase,
  Users,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function MyDrivesPage({ setActivePage }) {
  const { drives, currentUser, updateDrive, applications } = usePlacement();

  const myDrives = drives.filter(d =>
    d.companyId === currentUser?.id ||
    d.companyName?.toLowerCase().includes('google') ||
    d.companyName === currentUser?.name
  );

  const toggleStatus = (driveId, currentStatus) => {
    updateDrive(driveId, { status: currentStatus === 'Active' ? 'Closed' : 'Active' });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Hiring Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            My Campus Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Monitor applicant volumes, toggle drive statuses, and configure recruitment milestones.
          </p>
        </div>

        <button
          onClick={() => setActivePage('company-post')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Drive</span>
        </button>
      </div>

      {myDrives.length === 0 ? (
        <div className="mt-12 p-12 text-center rounded-3xl glass-panel border">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No active drives posted</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Create your first campus recruitment drive to accept applications from qualified graduating engineers.
          </p>
          <button
            onClick={() => setActivePage('company-post')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md cursor-pointer hover:bg-indigo-700"
          >
            Post Drive
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {myDrives.map((drive) => {
            const driveApplicants = applications.filter(a => a.driveId === drive.id);
            const shortlisted = driveApplicants.filter(a => a.status !== 'Applied' && a.status !== 'Rejected');
            const isActive = drive.status === 'Active';

            return (
              <div
                key={drive.id}
                className="p-6 sm:p-8 rounded-3xl glass-panel border shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 p-2 border border-indigo-200/50 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {drive.role}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600'
                        }`}>
                          ● {drive.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {drive.companyName} • <strong className="font-mono text-indigo-600 dark:text-indigo-400">₹{drive.packageLPA} LPA</strong> • {drive.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500">Vacancies</span>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {drive.openings} Positions
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Deadline: {drive.deadline}</div>
                  </div>
                </div>

                {/* Candidate Counts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-slate-500">Total Applicants</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                      {driveApplicants.length}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-slate-500">Shortlisted</div>
                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
                      {shortlisted.length}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-slate-500">Min Eligibility</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      CGPA {drive.eligibility?.minCgpa}+ • 0 Backlogs
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-slate-500">Selection Rounds</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      {drive.selectionRounds?.length || 3} Stages Defined
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleStatus(drive.id, drive.status)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    {isActive ? 'Mark Drive as Closed' : 'Reopen Application Window'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePage('company-applicants')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Review Applicants ({driveApplicants.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
