import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  Building2,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function RegisterPage({ setActivePage }) {
  const { addStudent, companies, login } = usePlacement();
  const [role, setRole] = useState('student'); // 'student' | 'company'
  const [registered, setRegistered] = useState(false);

  // Student form state
  const [stdData, setStdData] = useState({
    rollNo: '21BCE1299',
    name: 'Devika Krishnan',
    email: 'devika.k@campus.edu',
    phone: '+91 98450 12345',
    branch: 'Computer Science & Engineering',
    semester: 8,
    cgpa: 8.75,
    tenthMarks: 93.0,
    twelfthMarks: 91.5,
    backlogs: 0,
    skills: 'React, Python, SQL, C++',
    password: 'password123'
  });

  // Company form state
  const [compData, setCompData] = useState({
    name: 'Uber India',
    industry: 'Mobility & Distributed Tech',
    website: 'https://uber.com/careers',
    hrContact: 'university-india@uber.com',
    location: 'Bengaluru / Hyderabad',
    description: 'Uber mobility platform hiring for backend and distributed infrastructure roles.'
  });

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      rollNo: stdData.rollNo,
      name: stdData.name,
      email: stdData.email,
      phone: stdData.phone,
      branch: stdData.branch,
      semester: Number(stdData.semester),
      cgpa: Number(stdData.cgpa),
      tenthMarks: Number(stdData.tenthMarks),
      twelfthMarks: Number(stdData.twelfthMarks),
      backlogs: Number(stdData.backlogs),
      skills: stdData.skills.split(',').map(s => s.trim()),
      certifications: [],
      projects: [],
      internships: [],
      achievements: [],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      resumeUrl: '#',
      verified: true
    };
    addStudent(newStudent);
    setRegistered(true);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-[90vh] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#C25E38] mx-auto flex items-center justify-center text-white shadow-lg shadow-[#C25E38]/30 mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24201D] dark:text-stone-100">
            Create an Ascend Account
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Register for Campus Recruitment Season 2025-26
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl glass-panel border shadow-2xl">
          {/* Tab selector */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F5EFEB] dark:bg-stone-800 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                role === 'student'
                  ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Registration</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('company')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                role === 'company'
                  ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Recruiter Onboarding</span>
            </button>
          </div>

          {registered ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Registration Successful!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                {role === 'student'
                  ? 'Your profile has been created and verified. You may now log in to browse drives and track applications.'
                  : 'Your company profile has been submitted for placement cell accreditation. Our team will verify credentials within 24 hours.'}
              </p>
              <button
                onClick={() => setActivePage('login')}
                className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                Proceed to Sign In
              </button>
            </div>
          ) : role === 'student' ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={stdData.name}
                    onChange={(e) => setStdData({ ...stdData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    University Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    value={stdData.rollNo}
                    onChange={(e) => setStdData({ ...stdData, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={stdData.email}
                    onChange={(e) => setStdData({ ...stdData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Branch / Discipline *
                  </label>
                  <select
                    value={stdData.branch}
                    onChange={(e) => setStdData({ ...stdData, branch: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    CGPA *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={stdData.cgpa}
                    onChange={(e) => setStdData({ ...stdData, cgpa: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    12th Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={stdData.twelfthMarks}
                    onChange={(e) => setStdData({ ...stdData, twelfthMarks: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Active Backlogs
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stdData.backlogs}
                    onChange={(e) => setStdData({ ...stdData, backlogs: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={stdData.skills}
                  onChange={(e) => setStdData({ ...stdData, skills: e.target.value })}
                  placeholder="React, Python, Java, System Design"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-bold text-xs shadow-md shadow-[#C25E38]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Complete Student Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={compData.name}
                    onChange={(e) => setCompData({ ...compData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Industry Domain *
                  </label>
                  <input
                    type="text"
                    required
                    value={compData.industry}
                    onChange={(e) => setCompData({ ...compData, industry: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Careers Website
                  </label>
                  <input
                    type="url"
                    value={compData.website}
                    onChange={(e) => setCompData({ ...compData, website: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Corporate HR Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={compData.hrContact}
                    onChange={(e) => setCompData({ ...compData, hrContact: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company Overview & Roles
                </label>
                <textarea
                  rows={3}
                  value={compData.description}
                  onChange={(e) => setCompData({ ...compData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-bold text-xs shadow-md shadow-[#C25E38]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Submit Partnership Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            <span>Already registered? </span>
            <button
              onClick={() => setActivePage('login')}
              className="font-bold text-[#C25E38] dark:text-[#E07A55] hover:underline cursor-pointer"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
