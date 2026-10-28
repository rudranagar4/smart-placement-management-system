import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  Award,
  Briefcase,
  FileText,
  Globe,
  Code2,
  CheckCircle2,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  Upload
} from 'lucide-react';

export default function StudentProfile() {
  const { currentStudentData, updateStudentProfile } = usePlacement();
  const student = currentStudentData || {};

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name || 'Rudra Nagar',
    rollNo: student.rollNo || '0251csds289',
    email: student.email || 'rudra.nagar@campus.edu',
    phone: student.phone || '+91 98765 43210',
    branch: student.branch || 'Computer Science & Engineering',
    semester: student.semester || 8,
    cgpa: student.cgpa || 9.1,
    tenthMarks: student.tenthMarks || 94.5,
    twelfthMarks: student.twelfthMarks || 92.8,
    backlogs: student.backlogs || 0,
    skills: (student.skills || []).join(', '),
    linkedin: student.linkedin || '',
    github: student.github || '',
    avatar: student.avatar || '/rudra-avatar.png'
  });

  const [projects, setProjects] = useState(student.projects || []);
  const [certifications, setCertifications] = useState(student.certifications || []);
  const [internships, setInternships] = useState(student.internships || []);

  // Completeness score
  const calculateCompleteness = () => {
    let score = 0;
    if (formData.name) score += 10;
    if (formData.rollNo) score += 10;
    if (formData.email) score += 10;
    if (formData.cgpa) score += 15;
    if (formData.tenthMarks && formData.twelfthMarks) score += 15;
    if (formData.skills) score += 15;
    if (projects.length > 0) score += 15;
    if (formData.linkedin || formData.github) score += 10;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      cgpa: Number(formData.cgpa),
      semester: Number(formData.semester),
      tenthMarks: Number(formData.tenthMarks),
      twelfthMarks: Number(formData.twelfthMarks),
      backlogs: Number(formData.backlogs),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      projects,
      certifications,
      internships
    };
    updateStudentProfile(student.id, updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: 'New Engineering Project', tech: 'React, Node.js', desc: 'Summary of problem statement and measurable results.' }
    ]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, idx) => idx !== index));
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Completeness Ring */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl glass-panel border mb-8">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30"
            />
            {student.verified && (
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Verified by T&P Cell">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {formData.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {formData.rollNo} • {formData.branch}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                CGPA: {formData.cgpa}
              </span>
              <span className="text-slate-400">•</span>
              <span className={`text-xs font-semibold ${formData.backlogs === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {formData.backlogs === 0 ? '0 Backlogs' : `${formData.backlogs} Backlog(s)`}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Radial Completeness Meter */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000"
                strokeDasharray={`${completeness}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-slate-900 dark:text-white font-mono">
              {completeness}%
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Profile Meter</div>
            <div className="text-[11px] text-slate-500">
              {completeness >= 90 ? 'Profile 100% Drive-Ready' : 'Complete missing fields for Super Dream eligibility'}
            </div>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Profile changes successfully updated and synchronized across all campus placement drives!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Academic & Personal Details */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>Academic & Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department / Branch
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                10th Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.tenthMarks}
                onChange={(e) => setFormData({ ...formData, tenthMarks: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                12th / Diploma Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.twelfthMarks}
                onChange={(e) => setFormData({ ...formData, twelfthMarks: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                value={formData.backlogs}
                onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Skills & Social Portfolios */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Technical Skills & Portfolios</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skills (comma-separated tags)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                placeholder="React, Node.js, Python, System Design, Docker, PostgreSQL"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <Code2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Key Technical Projects</span>
            </h2>
            <button
              type="button"
              onClick={addProject}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 relative">
                <button
                  type="button"
                  onClick={() => removeProject(idx)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx].title = e.target.value;
                      setProjects(updated);
                    }}
                    placeholder="Project Title"
                    className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={proj.tech}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx].tech = e.target.value;
                      setProjects(updated);
                    }}
                    placeholder="Tech Stack (e.g. React, Go, Docker)"
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  value={proj.desc}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[idx].desc = e.target.value;
                    setProjects(updated);
                  }}
                  placeholder="Measurable impact or architecture description..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Update Verification</span>
          </button>
        </div>
      </form>
    </div>
  );
}
