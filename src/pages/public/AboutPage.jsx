import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileCheck,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  const leadership = [
    {
      name: 'Dr. K. S. Verma',
      designation: 'Professor & Head, Training & Placement',
      dept: 'Ph.D. Computer Systems (IIT Delhi)',
      email: 'head.placement@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Prof. Shalini Roy',
      designation: 'Associate Dean (Corporate Relations)',
      dept: 'Ex-Director Talent, Intel India',
      email: 'shalini.roy@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Mr. Arvind Swaminathan',
      designation: 'Senior Placement Officer',
      dept: 'Industry Liaison & Alumni Affairs',
      email: 'arvind.s@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const policies = [
    {
      title: 'One Student, One Dream Offer Policy',
      desc: 'To ensure democratic placement access across the student cohort, a student securing a Tier-1 Dream offer (>₹15 LPA) is excused from further drives unless eligible for a designated Super Dream tier (>₹30 LPA).'
    },
    {
      title: 'Mandatory Minimum 85% Attendance in Training',
      desc: 'Eligibility for campus placement registration is strictly linked with participation in soft skill workshops, aptitude marathons, and technical bootcamps.'
    },
    {
      title: 'Zero Tolerance on Offer Renege',
      desc: 'Acceptance of an offer letter binds the student to join the employer upon graduation to uphold university institutional credibility with premier recruiters.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Training & Placement Cell
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-1">
          Bridging Classroom Rigor with Global Industry
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          The Training and Placement Cell functions as the primary bridge between our academic faculties and global corporate leaders, facilitating holistic career coaching and competitive recruitment drives.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="p-8 rounded-3xl glass-panel border relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To emerge as the premier university placement ecosystem that empowers every graduating engineer with competitive problem-solving acumen, leadership ethos, and multi-disciplinary tech careers that define the next decade of technology.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel border relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Continuous industry partnership, personalized mentoring for non-placed students, intensive coding and system design preparation, and zero-defect corporate interview coordination powered by the Ascend platform.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div className="my-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Governing Council
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Placement Cell Directorate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((l, i) => (
            <div key={i} className="p-6 rounded-2xl glass-panel border text-center">
              <img
                src={l.avatar}
                alt={l.name}
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-indigo-500/20 mb-4"
              />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{l.name}</h3>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{l.designation}</div>
              <div className="text-[11px] text-slate-500 mt-1">{l.dept}</div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{l.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Policies */}
      <div className="my-12 p-8 rounded-3xl glass-panel border">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>Core Placement Guidelines & Code of Conduct</span>
        </h2>

        <div className="space-y-4">
          {policies.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                {p.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
