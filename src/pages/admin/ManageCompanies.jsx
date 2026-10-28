import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Building2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Users,
  Search,
  Plus,
  ShieldCheck
} from 'lucide-react';

export default function ManageCompanies() {
  const { companies, approveCompany } = usePlacement();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Corporate Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Recruiter Partners & Accreditations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Approve corporate recruiters, audit tier classification, and manage verified campus recruiting authorizations.
          </p>
        </div>
      </div>

      <div className="my-8 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Filter companies by name or industry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl glass-panel border flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 object-contain p-1 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h3>
                    <div className="text-[11px] text-slate-500">{c.industry}</div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.approved ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {c.approved ? '● Approved' : '● Pending'}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500">
                <div>Tier: <strong className="text-slate-900 dark:text-white">{c.tier}</strong></div>
                <div>HR Liaison: <strong className="text-indigo-600 dark:text-indigo-400">{c.hrContact}</strong></div>
                <div>Total Hired: <strong className="text-slate-900 dark:text-white">{c.totalHired} students</strong></div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1.5">
                {c.approved ? (
                  <button
                    onClick={() => approveCompany(c.id, false)}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    Revoke
                  </button>
                ) : (
                  <button
                    onClick={() => approveCompany(c.id, true)}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
