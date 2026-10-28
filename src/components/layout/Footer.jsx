import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  RotateCcw,
  Shield,
  Heart
} from 'lucide-react';

export default function Footer({ setActivePage }) {
  const { resetToDefaults } = usePlacement();

  const handleReset = () => {
    if (window.confirm('Reset all demo placement data, drives, and student records back to defaults?')) {
      resetToDefaults();
      alert('Demo data restored to initial state.');
    }
  };

  return (
    <footer className="mt-20 border-t border-[#E5DACB]/80 dark:border-stone-800 bg-[#FAF7F2]/90 dark:bg-[#141312]/90 backdrop-blur-md text-stone-600 dark:text-stone-400 transition-colors pb-16 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C25E38] flex items-center justify-center text-white shadow-md shadow-[#C25E38]/25">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#24201D] dark:text-stone-100">
                Ascend<span className="text-[#C25E38]">.</span>
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              The premier centralized campus placement and career management system. Bridging high-achieving university engineering talent with global fortune 500 tech and consulting leaders.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A43] dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
              <span>Campus Recruitment Season 2025-26 Live</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24201D] dark:text-stone-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActivePage('jobs'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Job Drives Catalog
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('stats'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Placement Statistics
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('recruiters'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Recruiter Partners
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  T&P Cell Leadership
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24201D] dark:text-stone-200 mb-4">
              Access Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActivePage('login'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Student Sign In
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('login'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Recruiter Portal
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('login'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Placement Officer Login
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer">
                  Student Grievance Cell
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24201D] dark:text-stone-200 mb-4">
              T&P Secretariat
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C25E38] shrink-0" />
                <span>Level 3, Administrative Block, Main University Campus</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C25E38] shrink-0" />
                <span>placements@campus.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C25E38] shrink-0" />
                <span>+91 (011) 2894-0012</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#E5DACB]/80 dark:border-stone-800">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#C25E38] dark:hover:text-[#E07A55] transition-colors cursor-pointer"
                title="Reset mock demo data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E5DACB]/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Ascend Campus Placement Management System. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-[#C25E38] fill-[#C25E38] inline" /> for University Talent
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#2D5A43]" /> ISO 9001:2015 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
