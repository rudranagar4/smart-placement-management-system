import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Building2,
  SlidersHorizontal,
  X
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

export default function BrowseJobs() {
  const { drives, currentStudentData, applications, applyToDrive, currentUser } = usePlacement();
  const student = currentStudentData || {};

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [minPackage, setMinPackage] = useState(0);
  const [sortBy, setSortBy] = useState('package-desc'); // 'package-desc', 'package-asc', 'deadline'
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applySuccessModal, setApplySuccessModal] = useState(null);

  // Check eligibility logic
  const checkEligibility = (drive) => {
    if (!drive.eligibility) return { eligible: true, reasons: [] };
    const reasons = [];

    if (student.cgpa < drive.eligibility.minCgpa) {
      reasons.push(`Minimum CGPA required is ${drive.eligibility.minCgpa} (Your CGPA: ${student.cgpa})`);
    }

    if (drive.eligibility.maxBacklogs < student.backlogs) {
      reasons.push(`Maximum allowed backlogs is ${drive.eligibility.maxBacklogs} (You have ${student.backlogs})`);
    }

    if (drive.eligibility.allowedBranches && !drive.eligibility.allowedBranches.includes(student.branch)) {
      reasons.push(`Drive is restricted to ${drive.eligibility.allowedBranches.join(', ')}`);
    }

    return {
      eligible: reasons.length === 0,
      reasons
    };
  };

  const myAppDriveIds = new Set(applications.filter(a => a.studentId === student.id).map(a => a.driveId));

  // Filter & sort
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (drive.skillsRequired || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBranch = selectedBranch === 'All' ||
                          (drive.eligibility?.allowedBranches || []).includes(selectedBranch);

    const matchesPackage = drive.packageLPA >= minPackage;

    return matchesSearch && matchesBranch && matchesPackage;
  }).sort((a, b) => {
    if (sortBy === 'package-desc') return b.packageLPA - a.packageLPA;
    if (sortBy === 'package-asc') return a.packageLPA - b.packageLPA;
    if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    return 0;
  });

  const handleApply = (drive) => {
    const ok = applyToDrive(drive.id);
    if (ok) {
      setApplySuccessModal(drive);
      setSelectedDrive(null);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="pb-8 border-b border-[#E5DACB]/80 dark:border-stone-800">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A55]">
          Campus Recruitment Drives
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24201D] dark:text-stone-100 mt-1">
          Explore Live Placement Drives
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-2xl">
          Apply to premier full-time software engineering, cloud, hardware, and consulting roles. Real-time eligibility checks are calculated against your academic profile.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="my-8 p-4 sm:p-6 rounded-3xl glass-panel border flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search company, job role, or required skill (e.g. Google, SDE, React)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Branch filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium cursor-pointer"
          >
            <option value="All">All Disciplines</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Information Technology">IT</option>
            <option value="Electronics & Communication">ECE</option>
            <option value="Electrical Engineering">EE</option>
            <option value="Mechanical Engineering">Mech</option>
          </select>

          {/* Min Package */}
          <select
            value={minPackage}
            onChange={(e) => setMinPackage(Number(e.target.value))}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium cursor-pointer"
          >
            <option value={0}>Any CTC Package</option>
            <option value={10}>Min ₹10 LPA</option>
            <option value={20}>Min ₹20 LPA (Dream)</option>
            <option value={30}>Min ₹30 LPA (Super Dream)</option>
            <option value={40}>Min ₹40 LPA</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium cursor-pointer"
          >
            <option value="package-desc">CTC: Highest to Lowest</option>
            <option value="package-asc">CTC: Lowest to Highest</option>
            <option value="deadline">Approaching Deadline</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrives.map((drive) => {
          const applied = myAppDriveIds.has(drive.id);
          const { eligible, reasons } = checkEligibility(drive);

          return (
            <div
              key={drive.id}
              className="p-6 rounded-3xl glass-panel border flex flex-col justify-between hover:shadow-xl hover:border-[#C25E38]/40 transition-all group relative"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#C25E38]/10 p-2 border border-[#C25E38]/20 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-[#C25E38]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#C25E38] transition-colors">
                        {drive.companyName}
                      </h3>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{drive.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-[#C25E38] dark:text-[#E07A55] font-mono bg-[#C25E38]/10 px-2.5 py-1 rounded-xl">
                    ₹{drive.packageLPA} LPA
                  </span>
                </div>

                {/* Role Title */}
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mb-2">
                  {drive.role}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {drive.description}
                </p>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(drive.skillsRequired || []).slice(0, 3).map((sk, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                      {sk}
                    </span>
                  ))}
                  {(drive.skillsRequired?.length || 0) > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 font-medium">
                      +{drive.skillsRequired.length - 3}
                    </span>
                  )}
                </div>

                {/* Eligibility Pill */}
                <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {eligible ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5A43] dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>You are Eligible to Apply</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9C3D28] dark:text-rose-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{reasons[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Ends {drive.deadline}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                  >
                    Rounds
                  </button>

                  {applied ? (
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#C25E38]/10 text-[#C25E38] text-xs font-bold">
                      Applied ✓
                    </span>
                  ) : eligible ? (
                    <button
                      onClick={() => handleApply(drive)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      1-Click Apply
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3.5 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-400 text-xs font-bold cursor-not-allowed"
                    >
                      Not Eligible
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drive Details & Selection Rounds Modal */}
      <Modal
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        title={selectedDrive ? `${selectedDrive.companyName} — Drive Details` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedDrive && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#C25E38]/10 dark:bg-[#C25E38]/20 border border-[#C25E38]/30">
              <div>
                <span className="text-xs text-[#C25E38] dark:text-[#E07A55] font-semibold">Compensation Package</span>
                <div className="text-2xl font-extrabold text-[#C25E38] dark:text-[#E07A55] font-mono">
                  ₹{selectedDrive.packageLPA} LPA
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Base: {selectedDrive.baseSalary} • Joining: {selectedDrive.joiningBonus}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500">Openings</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{selectedDrive.openings} positions</div>
                <div className="text-[11px] text-[#2D5A43] font-semibold">Full-Time Campus Drive</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Role Description</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedDrive.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Eligibility Criteria</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 bg-stone-50 dark:bg-stone-950/60 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
                <li>• Minimum CGPA: <strong>{selectedDrive.eligibility?.minCgpa}</strong></li>
                <li>• Max Active Backlogs Allowed: <strong>{selectedDrive.eligibility?.maxBacklogs}</strong></li>
                <li>• Allowed Disciplines: <strong>{selectedDrive.eligibility?.allowedBranches?.join(', ')}</strong></li>
              </ul>
            </div>

            {/* Selection Rounds Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Hiring Rounds</h4>
              <div className="space-y-3">
                {selectedDrive.selectionRounds?.map((rnd) => (
                  <div key={rnd.roundNumber} className="flex items-start gap-3 p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80">
                    <span className="w-6 h-6 rounded-full bg-[#C25E38]/10 text-[#C25E38] dark:text-[#E07A55] text-xs font-bold flex items-center justify-center shrink-0">
                      {rnd.roundNumber}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{rnd.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{rnd.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDrive(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Close
              </button>

              {!myAppDriveIds.has(selectedDrive.id) && checkEligibility(selectedDrive).eligible && (
                <button
                  onClick={() => handleApply(selectedDrive)}
                  className="px-6 py-2.5 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-bold text-xs shadow-md shadow-[#C25E38]/25 cursor-pointer"
                >
                  Submit Application Now
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Application Success Modal with Celebration Animation */}
      <Modal
        isOpen={!!applySuccessModal}
        onClose={() => setApplySuccessModal(null)}
        title="Application Submitted! 🎉"
        maxWidth="max-w-md"
      >
        {applySuccessModal && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2D5A43]/15 text-[#2D5A43] dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Successfully Applied to {applySuccessModal.companyName}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your verified resume and academic profile ({student.cgpa} CGPA) have been transmitted to the {applySuccessModal.companyName} university recruitment team for <strong>{applySuccessModal.role}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setApplySuccessModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#C25E38] text-white font-bold text-xs shadow-md cursor-pointer hover:bg-[#A94E2C] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
