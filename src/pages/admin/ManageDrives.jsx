import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';

export default function ManageDrives() {
  const { drives, updateDrive, applications } = usePlacement();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrives = drives.filter(d =>
    d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDriveStatus = (driveId, currentStatus) => {
    updateDrive(driveId, { status: currentStatus === 'Active' ? 'Closed' : 'Active' });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Campus Recruitment Drives
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Active Drive Monitoring & Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Review all company postings, track total applicants, verify CTC package compliance, and close completed drives.
        </p>
      </div>

      <div className="my-8 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Filter drives by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrives.map((d) => {
          const appCount = applications.filter(a => a.driveId === d.id).length;
          const isActive = d.status === 'Active';

          return (
            <div
              key={d.id}
              className="p-6 rounded-3xl glass-panel border flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{d.companyName}</h3>
                    <div className="text-xs text-slate-500">{d.role}</div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full font-mono">
                    ₹{d.packageLPA} LPA
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 my-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span>Applications Received:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{appCount} candidates</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Openings:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{d.openings} positions</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deadline:</span>
                    <strong className="text-slate-900 dark:text-white">{d.deadline}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Min CGPA Requirement:</span>
                    <strong className="text-indigo-600 font-bold">{d.eligibility?.minCgpa || 7.0}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  ● {d.status}
                </span>

                <button
                  onClick={() => toggleDriveStatus(d.id, d.status)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isActive ? 'Close Drive' : 'Reactivate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
