import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  Award,
  Calendar,
  User,
  Users,
  Building2,
  FileCheck,
  BarChart3,
  HelpCircle
} from 'lucide-react';

export default function MobileBottomNav({ activePage, setActivePage }) {
  const { currentUser } = usePlacement();

  if (!currentUser) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-xl border-t border-[#E8E2D6] dark:border-[#38332E] px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activePage === 'landing' ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold' : 'text-[#7A7167] dark:text-[#A3988C]'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => { setActivePage('jobs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activePage === 'jobs' ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold' : 'text-[#7A7167] dark:text-[#A3988C]'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Drives</span>
        </button>
        <button
          onClick={() => { setActivePage('stats'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activePage === 'stats' ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold' : 'text-[#7A7167] dark:text-[#A3988C]'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Stats</span>
        </button>
        <button
          onClick={() => { setActivePage('login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activePage === 'login' ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold' : 'text-[#7A7167] dark:text-[#A3988C]'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      </div>
    );
  }

  // Student bottom nav
  if (currentUser.role === 'student') {
    const tabs = [
      { id: 'student-dash', label: 'Dash', icon: LayoutDashboard },
      { id: 'student-jobs', label: 'Drives', icon: Briefcase },
      { id: 'student-apps', label: 'Apps', icon: Layers },
      { id: 'student-offers', label: 'Offers', icon: Award },
      { id: 'student-profile', label: 'Profile', icon: User }
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-xl border-t border-[#E8E2D6] dark:border-[#38332E] px-2 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActivePage(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-all cursor-pointer ${
                isActive ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold scale-105' : 'text-[#7A7167] dark:text-[#A3988C]'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#F4EDE2] dark:bg-[#2A241F] text-[#C25E38] dark:text-[#F59E0B]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Company bottom nav
  if (currentUser.role === 'company') {
    const tabs = [
      { id: 'company-dash', label: 'Overview', icon: LayoutDashboard },
      { id: 'company-drives', label: 'Drives', icon: Briefcase },
      { id: 'company-post', label: 'Post', icon: FileCheck },
      { id: 'company-applicants', label: 'Applicants', icon: Users },
      { id: 'company-interviews', label: 'Interviews', icon: Calendar }
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-xl border-t border-[#E8E2D6] dark:border-[#38332E] px-2 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActivePage(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-all cursor-pointer ${
                isActive ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold scale-105' : 'text-[#7A7167] dark:text-[#A3988C]'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#F4EDE2] dark:bg-[#2A241F] text-[#C25E38] dark:text-[#F59E0B]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Admin bottom nav
  if (currentUser.role === 'admin') {
    const tabs = [
      { id: 'admin-dash', label: 'Stats', icon: LayoutDashboard },
      { id: 'admin-students', label: 'Students', icon: Users },
      { id: 'admin-companies', label: 'Partners', icon: Building2 },
      { id: 'admin-drives', label: 'Drives', icon: Briefcase },
      { id: 'admin-reports', label: 'Reports', icon: BarChart3 }
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#141312]/95 backdrop-blur-xl border-t border-[#E8E2D6] dark:border-[#38332E] px-2 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActivePage(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-all cursor-pointer ${
                isActive ? 'text-[#C25E38] dark:text-[#F59E0B] font-bold scale-105' : 'text-[#7A7167] dark:text-[#A3988C]'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#F4EDE2] dark:bg-[#2A241F] text-[#C25E38] dark:text-[#F59E0B]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return null;
}
