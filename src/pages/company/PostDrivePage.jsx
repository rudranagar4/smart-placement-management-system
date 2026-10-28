import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Calendar,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function PostDrivePage({ setActivePage }) {
  const { postDrive, currentUser } = usePlacement();

  const [formData, setFormData] = useState({
    role: 'Cloud Native Software Engineer',
    packageLPA: 36.0,
    baseSalary: '₹22,00,000',
    joiningBonus: '₹4,00,000',
    esops: '₹10,00,000 (over 4 years)',
    location: 'Bengaluru / Hyderabad (Hybrid)',
    jobType: 'Full-Time',
    deadline: '2026-11-28',
    openings: 20,
    skills: 'Go, Kubernetes, Python, Distributed Systems, Docker',
    description: 'We are expanding our core cloud platform team. Looking for ambitious university software engineers to build next-generation distributed storage, compute orchestration, and observability microservices.',
    minCgpa: 7.5,
    maxBacklogs: 0,
    tenthMin: 75,
    twelfthMin: 75,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication']
  });

  const [rounds, setRounds] = useState([
    { roundNumber: 1, name: 'Online Algorithmic Assessment', desc: '2 coding problems + 10 CS fundamentals (90 mins)' },
    { roundNumber: 2, name: 'Technical Virtual Round 1', desc: 'Data structures, Trees, Graphs, Low level design (45 mins)' },
    { roundNumber: 3, name: 'System Design & Managerial Round', desc: 'Architecture, concurrency, and culture fit (45 mins)' }
  ]);

  const [submitted, setSubmitted] = useState(false);

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const handleBranchToggle = (branch) => {
    if (formData.allowedBranches.includes(branch)) {
      setFormData({ ...formData, allowedBranches: formData.allowedBranches.filter(b => b !== branch) });
    } else {
      setFormData({ ...formData, allowedBranches: [...formData.allowedBranches, branch] });
    }
  };

  const addRound = () => {
    setRounds([
      ...rounds,
      { roundNumber: rounds.length + 1, name: `Interview Round ${rounds.length + 1}`, desc: 'Technical evaluation' }
    ]);
  };

  const removeRound = (index) => {
    setRounds(rounds.filter((_, idx) => idx !== index).map((r, i) => ({ ...r, roundNumber: i + 1 })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const drivePayload = {
      role: formData.role,
      packageLPA: Number(formData.packageLPA),
      baseSalary: formData.baseSalary,
      joiningBonus: formData.joiningBonus,
      esops: formData.esops,
      location: formData.location,
      jobType: formData.jobType,
      deadline: formData.deadline,
      openings: Number(formData.openings),
      skillsRequired: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      eligibility: {
        minCgpa: Number(formData.minCgpa),
        maxBacklogs: Number(formData.maxBacklogs),
        tenthMin: Number(formData.tenthMin),
        twelfthMin: Number(formData.twelfthMin),
        allowedBranches: formData.allowedBranches
      },
      selectionRounds: rounds
    };

    postDrive(drivePayload);
    setSubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Recruitment Campaign
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Post a Campus Placement Drive
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Define job openings, compensation packages, eligibility filters, and assessment rounds. Published drives become instantly visible to eligible students.
        </p>
      </div>

      {submitted ? (
        <div className="mt-12 p-8 rounded-3xl glass-panel border text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Campus Drive Successfully Published!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Your drive for <strong>{formData.role} (₹{formData.packageLPA} LPA)</strong> is now live. Automated eligibility notifications have been dispatched to matching students.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('company-drives')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              View My Drives
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
            >
              Post Another Drive
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* 1. Job Role & Overview */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Job Role & Basic Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Designation / Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expected Openings (Hires) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.openings}
                  onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Required Competencies (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Job Description
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 2. Compensation Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span>Compensation Structure (CTC)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Total CTC (₹ LPA) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.packageLPA}
                  onChange={(e) => setFormData({ ...formData, packageLPA: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-extrabold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Base Salary
                </label>
                <input
                  type="text"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Joining Bonus
                </label>
                <input
                  type="text"
                  value={formData.joiningBonus}
                  onChange={(e) => setFormData({ ...formData, joiningBonus: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Stock / ESOPs
                </label>
                <input
                  type="text"
                  value={formData.esops}
                  onChange={(e) => setFormData({ ...formData, esops: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Eligibility Filters */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Student Eligibility Rules</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Minimum CGPA
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.minCgpa}
                  onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Max Active Backlogs
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxBacklogs}
                  onChange={(e) => setFormData({ ...formData, maxBacklogs: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Min 10th Marks (%)
                </label>
                <input
                  type="number"
                  value={formData.tenthMin}
                  onChange={(e) => setFormData({ ...formData, tenthMin: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Min 12th Marks (%)
                </label>
                <input
                  type="number"
                  value={formData.twelfthMin}
                  onChange={(e) => setFormData({ ...formData, twelfthMin: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Permitted Academic Disciplines
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {branches.map((b) => (
                  <label key={b} className="flex items-center gap-2 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={formData.allowedBranches.includes(b)}
                      onChange={() => handleBranchToggle(b)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-800 dark:text-slate-200">{b}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Selection Rounds Builder */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Selection Rounds Workflow</span>
              </h2>
              <button
                type="button"
                onClick={addRound}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Round</span>
              </button>
            </div>

            <div className="space-y-3">
              {rounds.map((rnd, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {rnd.roundNumber}
                  </span>
                  <input
                    type="text"
                    value={rnd.name}
                    onChange={(e) => {
                      const updated = [...rounds];
                      updated[i].name = e.target.value;
                      setRounds(updated);
                    }}
                    placeholder="Round Title"
                    className="w-1/3 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={rnd.desc}
                    onChange={(e) => {
                      const updated = [...rounds];
                      updated[i].desc = e.target.value;
                      setRounds(updated);
                    }}
                    placeholder="Brief evaluation criteria"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  {rounds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRound(i)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Publish Campus Recruitment Drive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
