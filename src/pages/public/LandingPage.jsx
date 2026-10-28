import React from 'react';
import { motion } from 'framer-motion';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Building2,
  Users,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Calendar,
  Briefcase,
  Layers,
  ChevronRight,
  Quote
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function LandingPage({ setActivePage }) {
  const { switchRole, drives, companies, students } = usePlacement();

  const liveStats = [
    { label: 'Overall Placement Rate', value: '98.4%', trend: '+3.2% YoY', icon: Award, color: 'text-[#2D5A43] dark:text-emerald-400' },
    { label: 'Highest CTC Offered', value: '₹48.2 LPA', trend: 'Tier-1 Tech', icon: TrendingUp, color: 'text-[#C25E38] dark:text-[#E07A55]' },
    { label: 'Recruiter Partners', value: '240+', trend: 'Global Brands', icon: Building2, color: 'text-[#D97706] dark:text-amber-400' },
    { label: 'Offers Rolled Out', value: '1,420+', trend: '2025-26 Season', icon: Briefcase, color: 'text-[#2D5A43] dark:text-emerald-400' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Profile & Document Verification',
      desc: 'Students create rich verified profiles with automated 10th/12th/CGPA calculation and backlog auditing.',
      badge: 'Step 1'
    },
    {
      step: '02',
      title: 'Drive Release & Eligibility Match',
      desc: 'Companies publish job drives with branch, minimum CGPA, and package criteria. Students get instant eligibility indicators.',
      badge: 'Step 2'
    },
    {
      step: '03',
      title: 'Multi-Round Assessments & Interviews',
      desc: 'Integrated scheduling for HackerRank coding tests, video technical interviews, and management rounds.',
      badge: 'Step 3'
    },
    {
      step: '04',
      title: 'Digital Offers & Instant Acceptance',
      desc: 'Automated release of verified campus offer letters with salary breakdown and one-click student acceptance.',
      badge: 'Step 4'
    }
  ];

  const sampleChartData = [
    { branch: 'CSE', placed: 98, avgLPA: 19.4 },
    { branch: 'IT', placed: 96, avgLPA: 17.8 },
    { branch: 'ECE', placed: 92, avgLPA: 14.2 },
    { branch: 'EE', placed: 86, avgLPA: 11.5 },
    { branch: 'Mech', placed: 84, avgLPA: 9.8 },
    { branch: 'Civil', placed: 80, avgLPA: 8.5 }
  ];

  const testimonials = [
    {
      name: 'Rudra Nagar',
      role: 'Placed at Google (42 LPA)',
      branch: 'B.Tech CSE 2026',
      quote: 'Ascend made the entire Google drive effortless. From instant eligibility alerts to interview slot booking and receiving the final offer letter with full salary transparency!',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Priya Patel',
      role: 'Placed at Microsoft Azure (44.5 LPA)',
      branch: 'B.Tech IT 2026',
      quote: 'The placement prep hub question bank and the automated resume builder gave me an edge during Microsoft Azure technical rounds.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. K. S. Verma',
      role: 'Head, Training & Placement Cell',
      branch: 'University Administration',
      quote: 'Admin analytics, real-time unplaced student tracking, and automated company accreditation saved hundreds of administrative hours this season.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Organic Warm Glow Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-[#C25E38]/20 via-[#D97706]/15 to-[#2D5A43]/15 rounded-full glow-blob-warm -z-10" />
      <div className="absolute top-96 -left-32 w-80 h-80 bg-[#C25E38]/12 rounded-full glow-blob-warm -z-10" />
      <div className="absolute top-[800px] -right-32 w-96 h-96 bg-[#D97706]/10 rounded-full glow-blob-warm -z-10" />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-14 pb-16">
        {/* Ribbon badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5DACB] dark:border-stone-800 bg-[#FAF7F2]/80 dark:bg-stone-900/80 backdrop-blur-md shadow-xs mb-6 cursor-pointer hover:border-[#C25E38]/50 transition-colors"
          onClick={() => setActivePage('jobs')}
        >
          <span className="flex h-2 w-2 rounded-full bg-[#2D5A43] animate-pulse" />
          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
            Campus Placement Season 2025-26 Live
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C25E38]" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#24201D] dark:text-stone-100 max-w-4xl mx-auto leading-[1.12]"
        >
          Empowering Ambition.{' '}
          <span className="bg-gradient-to-r from-[#C25E38] via-[#D97706] to-[#2D5A43] bg-clip-text text-transparent">
            Unlocking World-Class
          </span>{' '}
          Careers.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed"
        >
          A unified, high-performance platform connecting high-achieving university engineering talent, top-tier global recruiters, and the campus placement administration.
        </motion.p>

        {/* CTAs & One-Click Role Launchers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => { switchRole('student'); setActivePage('student-dash'); }}
            className="px-6 py-3.5 rounded-2xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-semibold text-sm shadow-lg shadow-[#C25E38]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Launch Student Portal</span>
          </button>

          <button
            onClick={() => { switchRole('company'); setActivePage('company-dash'); }}
            className="px-6 py-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 font-semibold text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Building2 className="w-4 h-4 text-[#C25E38]" />
            <span>Recruiter Console</span>
          </button>

          <button
            onClick={() => { switchRole('admin'); setActivePage('admin-dash'); }}
            className="px-5 py-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
            <span>Admin Overview</span>
          </button>
        </motion.div>

        {/* Floating preview cards banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 sm:mt-16 relative mx-auto max-w-5xl rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#C25E38]/15 via-[#D97706]/5 to-transparent border border-[#E5DACB]/80 dark:border-stone-800 shadow-2xl backdrop-blur-md"
        >
          <div className="rounded-2xl bg-[#FAF7F2]/90 dark:bg-stone-900/90 p-4 sm:p-8 border border-[#E5DACB]/60 dark:border-stone-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-stone-600 dark:text-stone-400">ascend-placement-os // live dashboard</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#2D5A43]/15 text-[#2D5A43] dark:text-emerald-300">
                ● 12 Active Campus Drives
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 bg-white/70 dark:bg-stone-950/40">
                <div className="text-xs text-stone-500">Student Profile Match</div>
                <div className="text-lg font-bold text-stone-900 dark:text-white mt-1">Rudra Nagar (9.1 CGPA)</div>
                <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">Roll: 0251csds289 • CSE Sem 8</div>
                <div className="text-xs text-[#2D5A43] dark:text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eligible for 100% of Tier-1 Drives
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 bg-white/70 dark:bg-stone-950/40">
                <div className="text-xs text-stone-500">Highest Offer This Week</div>
                <div className="text-lg font-bold text-[#C25E38] dark:text-[#E07A55] mt-1">₹44.5 LPA • Microsoft</div>
                <div className="text-xs text-stone-500 mt-2">Azure & Copilot Engineering Cohort</div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 bg-white/70 dark:bg-stone-950/40">
                <div className="text-xs text-stone-500">Upcoming Campus Test</div>
                <div className="text-lg font-bold text-stone-900 dark:text-white mt-1">Google HackerEarth OA</div>
                <div className="text-xs text-[#D97706] dark:text-amber-400 mt-2">Nov 02 • 14:00 IST (Online)</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. LIVE STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {liveStats.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl glass-panel text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{st.label}</span>
                  <Icon className={`w-5 h-5 ${st.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {st.value}
                </div>
                <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {st.trend}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. RECRUITER MARQUEE */}
      <section className="py-12 border-y border-slate-200/70 dark:border-slate-800/70 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Trusted by 240+ Global Industry Leaders for University Hiring
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee gap-8 sm:gap-12 items-center py-2">
            {[...companies, ...companies].map((comp, idx) => (
              <div
                key={`${comp.id}-${idx}`}
                onClick={() => setActivePage('recruiters')}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 shadow-2xs hover:border-[#C25E38]/50 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <img src={comp.logo} alt={comp.name} className="w-5 h-5 object-contain" />
                <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{comp.name}</span>
                <span className="text-[10px] text-[#C25E38] dark:text-[#E07A55] font-semibold bg-[#C25E38]/10 px-2 py-0.5 rounded-full">
                  {comp.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (PINNED / STEPPED FLOW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A55]">
          Streamlined Lifecycle
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#24201D] dark:text-stone-100">
          How Campus Placements Flow on Ascend
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          Four automated milestones engineered to eliminate manual spreadsheets, delays, and eligibility mismatches.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {workflowSteps.map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 rounded-2xl glass-panel relative group hover:border-[#C25E38]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-[#C25E38] dark:text-[#E07A55] font-mono">
                    {ws.step}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#C25E38]/10 text-[#C25E38] dark:text-[#E07A55]">
                    {ws.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                  {ws.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {ws.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/70 dark:border-stone-800 flex items-center text-xs font-semibold text-[#C25E38] dark:text-[#E07A55] group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PLACEMENT ANALYTICS PREVIEW CHART */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A55]">
                Data Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24201D] dark:text-stone-100 mt-1">
                Branch-Wise Placement Performance
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Real-time placement percentages and average package across disciplines for the current graduating batch.
              </p>
            </div>
            <button
              onClick={() => setActivePage('stats')}
              className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-[#C25E38]/10 text-[#C25E38] dark:text-[#E07A55] hover:bg-[#C25E38]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore In-Depth Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="branch" stroke="#8C827A" fontSize={12} tickLine={false} />
                <YAxis stroke="#8C827A" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(36, 32, 29, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid rgba(194, 94, 56, 0.3)',
                    color: '#FAF7F2',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [name === 'placed' ? `${value}%` : `₹${value} LPA`, name === 'placed' ? 'Placed %' : 'Avg CTC']}
                />
                <Bar dataKey="placed" fill="#C25E38" radius={[6, 6, 0, 0]} name="placed" />
                <Bar dataKey="avgLPA" fill="#D97706" radius={[6, 6, 0, 0]} name="avgLPA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#C25E38]" />
              <span>Placement Rate (%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#D97706]" />
              <span>Average Package (₹ LPA)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A55]">
          Success Stories
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#24201D] dark:text-stone-100">
          Loved by Students, Admins & Recruiters
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#C25E38]/30 mb-3" />
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/70 dark:border-stone-800 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C25E38]/30" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">{t.name}</h4>
                  <div className="text-[11px] font-medium text-[#C25E38] dark:text-[#E07A55]">{t.role}</div>
                  <div className="text-[10px] text-stone-500">{t.branch}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#24201D] via-[#352D26] to-[#1C1917] text-white p-8 sm:p-14 text-center shadow-2xl border border-[#C25E38]/30">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready for Campus Recruitment Season 2025-26?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
              Whether you are a student striving for your dream offer, or a tech recruiter building an elite engineering pipeline, Ascend coordinates every step seamlessly.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => { switchRole('student'); setActivePage('student-jobs'); }}
                className="px-6 py-3 rounded-xl bg-[#C25E38] text-white font-bold text-sm hover:bg-[#A94E2C] transition-colors shadow-md cursor-pointer"
              >
                Browse Active Drives
              </button>
              <button
                onClick={() => { switchRole('company'); setActivePage('company-post'); }}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/20 shadow-md cursor-pointer backdrop-blur-md"
              >
                Post a Campus Drive
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
