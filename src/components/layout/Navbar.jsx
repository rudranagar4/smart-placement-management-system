import React, { useState, useEffect } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  User,
  Building2,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Sparkles,
  FileText,
  Briefcase,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const {
    theme,
    toggleTheme,
    currentUser,
    switchRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = usePlacement();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadNotifs = notifications.filter(n => n.unread);

  // Navigation items based on role
  const getNavItems = () => {
    if (!currentUser) {
      return [
        { id: 'landing', label: 'Home' },
        { id: 'jobs', label: 'Explore Drives' },
        { id: 'stats', label: 'Placement Stats' },
        { id: 'recruiters', label: 'Top Recruiters' },
        { id: 'about', label: 'About T&P' },
        { id: 'contact', label: 'Contact' }
      ];
    }

    if (currentUser.role === 'student') {
      return [
        { id: 'student-dash', label: 'Dashboard' },
        { id: 'student-jobs', label: 'Browse Drives' },
        { id: 'student-apps', label: 'My Applications' },
        { id: 'student-offers', label: 'Offers' },
        { id: 'student-schedule', label: 'Schedule' },
        { id: 'student-resume', label: 'Resume Builder' },
        { id: 'student-prep', label: 'Prep Hub' },
        { id: 'student-profile', label: 'Profile' }
      ];
    }

    if (currentUser.role === 'company') {
      return [
        { id: 'company-dash', label: 'Dashboard' },
        { id: 'company-drives', label: 'My Drives' },
        { id: 'company-post', label: 'Post Drive' },
        { id: 'company-applicants', label: 'Applicants' },
        { id: 'company-interviews', label: 'Interviews' }
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        { id: 'admin-dash', label: 'Overview' },
        { id: 'admin-students', label: 'Students' },
        { id: 'admin-companies', label: 'Companies' },
        { id: 'admin-drives', label: 'Drives' },
        { id: 'admin-notices', label: 'Announcements' },
        { id: 'admin-reports', label: 'Analytics' },
        { id: 'admin-logs', label: 'Audit Logs' }
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/85 dark:bg-[#141312]/85 backdrop-blur-md border-b border-[#E8E2D6]/80 dark:border-[#38332E]/80 shadow-xs py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick(currentUser ? `${currentUser.role}-dash` : 'landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C25E38] via-[#D97706] to-[#F59E0B] p-0.5 shadow-md shadow-amber-900/15 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#FAF7F2] dark:bg-[#161413] rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#C25E38] dark:text-[#F59E0B]" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#2A2421] via-[#78350F] to-[#C25E38] dark:from-[#FAF7F2] dark:via-[#FDE68A] dark:to-[#F59E0B] bg-clip-text text-transparent">
                Ascend<span className="text-[#C25E38] dark:text-[#F59E0B]">.</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-wider uppercase text-[#786F66] dark:text-[#A89F95] bg-[#EFE9DF] dark:bg-[#25221F] px-1.5 py-0.5 rounded border border-[#E2D8CA] dark:border-[#3A342E]">
                T&P Portal
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activePage === item.id
                    ? 'text-[#C25E38] dark:text-[#F59E0B] bg-[#F4EDE2] dark:bg-[#2A241F] shadow-2xs font-bold'
                    : 'text-[#655D54] dark:text-[#B5ACA1] hover:text-[#2A2421] dark:hover:text-white hover:bg-[#F0E9DF]/70 dark:hover:bg-[#221F1C]/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Role Switcher, Notifications, Theme, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-[#DCCFBE] dark:border-[#423A31] bg-[#F5EDE1]/80 dark:bg-[#24201C]/80 text-[#8C3D1E] dark:text-[#FDBA74] hover:bg-[#EFE4D4] dark:hover:bg-[#2F2924] transition-all cursor-pointer"
                title="Switch view/role"
              >
                {currentUser?.role === 'student' && <User className="w-3.5 h-3.5" />}
                {currentUser?.role === 'company' && <Building2 className="w-3.5 h-3.5" />}
                {currentUser?.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
                {!currentUser && <Sparkles className="w-3.5 h-3.5" />}
                <span className="capitalize">{currentUser ? currentUser.role : 'Public'}</span>
                <ChevronDown className="w-3 h-3 text-[#C25E38] dark:text-[#F59E0B]" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl glass-dropdown p-2 z-50 text-left border"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => { switchRole('student'); setActivePage('student-dash'); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                      currentUser?.role === 'student' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <User className="w-4 h-4 text-indigo-500" />
                    <div>
                      <div>Student Portal</div>
                      <div className="text-[10px] text-amber-800/70 dark:text-amber-200/70">Rudra Nagar (8.9 CGPA)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { switchRole('company'); setActivePage('company-dash'); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                      currentUser?.role === 'company' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-indigo-500" />
                    <div>
                      <div>Recruiter Portal</div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400">Google / Recruiter HR</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setActivePage('admin-dash'); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                      currentUser?.role === 'admin' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    <div>
                      <div>T&P Officer (Admin)</div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400">Dr. K. S. Verma</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { switchRole(null); setActivePage('landing'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Public Landing Page</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
                )}
              </button>

              {notifDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl glass-dropdown p-4 z-50 text-left border"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-indigo-500" /> Notifications
                      {unreadNotifs.length > 0 && (
                        <span className="ml-1 text-[11px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                          {unreadNotifs.length} new
                        </span>
                      )}
                    </h4>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`py-3 px-1 transition-colors cursor-pointer rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                            notif.unread ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {notif.time}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* User Profile Avatar / Sign In */}
            {currentUser ? (
              <div
                onClick={() => handleNavClick(currentUser.role === 'student' ? 'student-profile' : `${currentUser.role}-dash`)}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 capitalize">
                    {currentUser.role}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-5 shadow-2xl z-40 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  activePage === item.id
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {activePage === item.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </button>
            ))}
          </div>

          {!currentUser && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-indigo-600 text-white cursor-pointer shadow-md"
              >
                Student / Recruiter Login
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Register for Campus Drive
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
