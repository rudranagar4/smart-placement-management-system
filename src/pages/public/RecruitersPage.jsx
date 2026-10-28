import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Building2,
  ExternalLink,
  Search,
  Star,
  Users,
  Award,
  CheckCircle,
  Briefcase,
  MapPin
} from 'lucide-react';

export default function RecruitersPage({ setActivePage }) {
  const { companies, switchRole } = usePlacement();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'All' || c.tier.includes(selectedTier);
    return matchesSearch && matchesTier;
  });

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Corporate Partnerships
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-1">
          Our Premier Hiring Partners
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
          Over 240+ Fortune 500 corporations, high-growth tech unicorns, and global financial institutions recruit from our campus cohorts annually.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { switchRole('company'); setActivePage('company-post'); }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            Register as Hiring Partner
          </button>
          <button
            onClick={() => setActivePage('contact')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Download Placement Brochure
          </button>
        </div>
      </div>

      {/* Why Recruit Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="p-6 rounded-2xl glass-panel">
          <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Top 2% National Engineering Talent
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Strict admission entrance rank filtering guarantees students with foundational mathematical depth, analytical grit, and high aptitude.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass-panel">
          <Users className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Industry-Aligned Curriculum
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on coursework covering Cloud native architecture, Distributed systems, Machine Learning, Embedded RTOS, and DevOps CI/CD.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass-panel">
          <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Zero Placement Day Friction
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our high-speed campus infrastructure features 800+ dual-boot assessment terminals, interview suites, and dedicated student volunteer escorts.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Super Dream', 'Dream', 'Tier-1', 'Tier 2'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTier === tier
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCompanies.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl glass-panel border flex flex-col justify-between hover:shadow-lg transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 object-contain p-1 rounded-xl bg-white shadow-2xs border border-slate-100" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {c.name}
                    </h3>
                    <div className="text-[11px] text-slate-500">{c.industry}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {c.tier}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.totalHired}+ campus alumni hired</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Careers Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => { setActivePage('jobs'); }}
                className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                View Drives
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
