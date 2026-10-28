import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { PlacementProvider, usePlacement } from './context/PlacementContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';

// Public pages
import LandingPage from './pages/public/LandingPage';
import PlacementStatsPage from './pages/public/PlacementStatsPage';
import RecruitersPage from './pages/public/RecruitersPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ResumeBuilder from './pages/student/ResumeBuilder';
import BrowseJobs from './pages/student/BrowseJobs';
import ApplicationsTracker from './pages/student/ApplicationsTracker';
import StudentSchedule from './pages/student/StudentSchedule';
import OffersCenter from './pages/student/OffersCenter';
import PlacementPrepHub from './pages/student/PlacementPrepHub';

// Company pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostDrivePage from './pages/company/PostDrivePage';
import MyDrivesPage from './pages/company/MyDrivesPage';
import ApplicantsManager from './pages/company/ApplicantsManager';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageCompanies from './pages/admin/ManageCompanies';
import ManageDrives from './pages/admin/ManageDrives';
import AnnouncementsAdmin from './pages/admin/AnnouncementsAdmin';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';
import ActivityLogs from './pages/admin/ActivityLogs';

function AppContent() {
  const { currentUser } = usePlacement();
  // Default to student dashboard if logged in as student, or landing if public
  const [activePage, setActivePage] = useState(() => {
    return currentUser ? `${currentUser.role}-dash` : 'landing';
  });

  // Keep active page in sync if role is switched from navbar
  useEffect(() => {
    if (currentUser && (activePage === 'landing' || activePage === 'login' || activePage === 'register')) {
      setActivePage(`${currentUser.role}-dash`);
    } else if (!currentUser && (activePage.startsWith('student-') || activePage.startsWith('company-') || activePage.startsWith('admin-'))) {
      setActivePage('landing');
    }
  }, [currentUser]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const renderCurrentPage = () => {
    switch (activePage) {
      // Public
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'jobs':
        return <BrowseJobs setActivePage={setActivePage} />;
      case 'stats':
        return <PlacementStatsPage setActivePage={setActivePage} />;
      case 'recruiters':
        return <RecruitersPage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'contact':
        return <ContactPage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;

      // Student
      case 'student-dash':
        return <StudentDashboard setActivePage={setActivePage} />;
      case 'student-jobs':
        return <BrowseJobs setActivePage={setActivePage} />;
      case 'student-profile':
        return <StudentProfile setActivePage={setActivePage} />;
      case 'student-resume':
        return <ResumeBuilder setActivePage={setActivePage} />;
      case 'student-apps':
        return <ApplicationsTracker setActivePage={setActivePage} />;
      case 'student-schedule':
        return <StudentSchedule setActivePage={setActivePage} />;
      case 'student-offers':
        return <OffersCenter setActivePage={setActivePage} />;
      case 'student-prep':
        return <PlacementPrepHub setActivePage={setActivePage} />;

      // Company
      case 'company-dash':
        return <CompanyDashboard setActivePage={setActivePage} />;
      case 'company-drives':
        return <MyDrivesPage setActivePage={setActivePage} />;
      case 'company-post':
        return <PostDrivePage setActivePage={setActivePage} />;
      case 'company-applicants':
        return <ApplicantsManager setActivePage={setActivePage} />;
      case 'company-interviews':
        return <StudentSchedule setActivePage={setActivePage} />;

      // Admin
      case 'admin-dash':
        return <AdminDashboard setActivePage={setActivePage} />;
      case 'admin-students':
        return <ManageStudents setActivePage={setActivePage} />;
      case 'admin-companies':
        return <ManageCompanies setActivePage={setActivePage} />;
      case 'admin-drives':
        return <ManageDrives setActivePage={setActivePage} />;
      case 'admin-notices':
        return <AnnouncementsAdmin setActivePage={setActivePage} />;
      case 'admin-reports':
        return <ReportsAnalytics setActivePage={setActivePage} />;
      case 'admin-logs':
        return <ActivityLogs setActivePage={setActivePage} />;

      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-400">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      <Footer setActivePage={setActivePage} />
      <MobileBottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <PlacementProvider>
      <AppContent />
    </PlacementProvider>
  );
}
