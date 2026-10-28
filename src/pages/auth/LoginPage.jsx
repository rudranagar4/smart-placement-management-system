import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  User,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

export default function LoginPage({ setActivePage }) {
  const { login, switchRole, students, companies } = usePlacement();

  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'company' | 'admin'
  const [email, setEmail] = useState('rudra.sharma@campus.edu');
  const [password, setPassword] = useState('password123');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleRoleTabChange = (role) => {
    setActiveTab(role);
    if (role === 'student') {
      setEmail('rudra.sharma@campus.edu');
      setPassword('studentPass123');
    } else if (role === 'company') {
      setEmail('priya.nair@google.com');
      setPassword('recruiterPass123');
    } else if (role === 'admin') {
      setEmail('placement.head@campus.edu');
      setPassword('adminPass123');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (activeTab === 'student') {
      const std = students.find(s => s.email.toLowerCase() === email.toLowerCase()) || students[0];
      login('student', {
        id: std.id,
        name: std.name,
        email: std.email,
        branch: std.branch,
        avatar: std.avatar
      });
      setActivePage('student-dash');
    } else if (activeTab === 'company') {
      const comp = companies.find(c => c.hrContact.toLowerCase() === email.toLowerCase()) || companies[0];
      login('company', {
        id: comp.id,
        name: comp.name + ' Campus Recruitment',
        companyName: comp.name,
        email: comp.hrContact,
        avatar: comp.logo
      });
      setActivePage('company-dash');
    } else {
      login('admin', {
        id: 'admin-1',
        name: 'Dr. K. S. Verma',
        title: 'Head, Training & Placement Cell',
        email: 'placement.head@campus.edu',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      });
      setActivePage('admin-dash');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setForgotModalOpen(false);
    }, 2500);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-[90vh] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#C25E38] mx-auto flex items-center justify-center text-white shadow-lg shadow-[#C25E38]/30 mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24201D] dark:text-stone-100">
            Welcome to Ascend
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Centralized Campus Placement & Recruitment Gateway
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border shadow-2xl">
          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F5EFEB] dark:bg-stone-800 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('company')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'company'
                  ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick Demo Pre-fill banner */}
          <div className="mb-5 p-3 rounded-xl bg-[#C25E38]/10 dark:bg-[#C25E38]/20 border border-[#C25E38]/30 flex items-center justify-between text-[11px]">
            <span className="text-[#C25E38] dark:text-[#E07A55] font-medium">
              Demo account loaded for <strong className="capitalize font-bold">{activeTab}</strong>
            </span>
            <span className="text-[10px] bg-[#C25E38]/20 dark:bg-[#C25E38]/40 px-2 py-0.5 rounded text-[#C25E38] dark:text-[#F3C5B5] font-bold">
              Ready
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {activeTab === 'student' ? 'College Email ID' : activeTab === 'company' ? 'Corporate HR Email' : 'Admin Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-semibold text-[#C25E38] dark:text-[#E07A55] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#C25E38] font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-bold text-xs shadow-md shadow-[#C25E38]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to {activeTab === 'student' ? 'Student Portal' : activeTab === 'company' ? 'Recruiter Console' : 'Placement Admin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-200/80 dark:border-stone-800 text-center text-xs text-stone-500">
            <span>Don't have an account yet? </span>
            <button
              onClick={() => setActivePage('register')}
              className="font-bold text-[#C25E38] dark:text-[#E07A55] hover:underline cursor-pointer"
            >
              Register for Campus Drives
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password OTP Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Password"
        maxWidth="max-w-md"
      >
        {resetSuccess ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-base text-slate-900 dark:text-white">OTP Link Dispatched</h4>
            <p className="text-xs text-slate-500">
              A 6-digit verification code and reset link has been dispatched to <strong>{resetEmail || email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your registered college or corporate email address. We will send you an OTP link to reset your account password.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                defaultValue={email}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              Send Password Reset OTP
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
