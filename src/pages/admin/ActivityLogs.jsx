import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Clock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';

export default function ActivityLogs() {
  const { logs } = usePlacement();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLogs = logs.filter(l => {
    const matchesSearch = l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.actor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || l.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Security & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          System Audit Trail & Activity Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Immutable audit record of all recruiter actions, verified profile updates, drive approvals, and offer letter rollouts.
        </p>
      </div>

      <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search action or actor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="All">All Audit Categories</option>
          <option value="Drives">Drives</option>
          <option value="Offers">Offers</option>
          <option value="Applications">Applications</option>
          <option value="Verification">Verification</option>
          <option value="Auth">Auth</option>
        </select>
      </div>

      <div className="rounded-3xl glass-panel border overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Total Logged Events: {filteredLogs.length} Records
          </span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> ISO Audit Compliant
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 sm:px-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{log.action}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Actor: <strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> • Category: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{log.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 self-end sm:self-auto shrink-0">
                {log.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
