import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_COMPANIES,
  INITIAL_DRIVES,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANNOUNCEMENTS,
  AUDIT_LOGS
} from '../data/mockData';

const PlacementContext = createContext(null);

export function PlacementProvider({ children }) {
  // Theme state with local storage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ascend_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('ascend_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // User & Auth State
  // Roles: 'guest', 'student', 'company', 'admin'
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('ascend_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    // Default logged in as student Rudra Sharma for instant rich demo experience
    return {
      role: 'student',
      id: 'std-101',
      name: 'Rudra Sharma',
      email: 'rudra.sharma@campus.edu',
      branch: 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
  });

  useEffect(() => {
    localStorage.setItem('ascend_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Persistent Domain Stores
  const loadStored = (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  };

  const [students, setStudents] = useState(() => loadStored('ascend_students', INITIAL_STUDENTS));
  const [companies, setCompanies] = useState(() => loadStored('ascend_companies', INITIAL_COMPANIES));
  const [drives, setDrives] = useState(() => loadStored('ascend_drives', INITIAL_DRIVES));
  const [applications, setApplications] = useState(() => loadStored('ascend_applications', INITIAL_APPLICATIONS));
  const [interviews, setInterviews] = useState(() => loadStored('ascend_interviews', INITIAL_INTERVIEWS));
  const [offers, setOffers] = useState(() => loadStored('ascend_offers', INITIAL_OFFERS));
  const [notifications, setNotifications] = useState(() => loadStored('ascend_notifs', INITIAL_NOTIFICATIONS));
  const [announcements, setAnnouncements] = useState(() => loadStored('ascend_announcements', INITIAL_ANNOUNCEMENTS));
  const [logs, setLogs] = useState(() => loadStored('ascend_logs', AUDIT_LOGS));

  // Sync to local storage
  useEffect(() => { localStorage.setItem('ascend_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('ascend_companies', JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem('ascend_drives', JSON.stringify(drives)); }, [drives]);
  useEffect(() => { localStorage.setItem('ascend_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('ascend_interviews', JSON.stringify(interviews)); }, [interviews]);
  useEffect(() => { localStorage.setItem('ascend_offers', JSON.stringify(offers)); }, [offers]);
  useEffect(() => { localStorage.setItem('ascend_notifs', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('ascend_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('ascend_logs', JSON.stringify(logs)); }, [logs]);

  // Auth Functions
  const login = (role, userDetails) => {
    setCurrentUser({ role, ...userDetails });
    addLog(`Logged in as ${role.toUpperCase()}: ${userDetails.name || role}`, 'Auth');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    if (role === 'student') {
      const std = students.find(s => s.id === 'std-101') || students[0];
      setCurrentUser({
        role: 'student',
        id: std.id,
        name: std.name,
        email: std.email,
        branch: std.branch,
        avatar: std.avatar
      });
    } else if (role === 'company') {
      const comp = companies.find(c => c.id === 'comp-1') || companies[0];
      setCurrentUser({
        role: 'company',
        id: comp.id,
        name: comp.name + ' Campus Recruitment',
        companyName: comp.name,
        email: comp.hrContact,
        avatar: comp.logo
      });
    } else if (role === 'admin') {
      setCurrentUser({
        role: 'admin',
        id: 'admin-1',
        name: 'Dr. K. S. Verma',
        title: 'Head, Training & Placement Cell',
        email: 'placement.head@campus.edu',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      });
    } else {
      setCurrentUser(null);
    }
  };

  const addLog = (action, category = 'General') => {
    const newLog = {
      id: `log-${Date.now()}`,
      actor: currentUser?.name || 'System User',
      action,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' }) + ' IST',
      category
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Student Actions
  const currentStudentData = students.find(s => s.id === currentUser?.id) || students[0];

  const applyToDrive = (driveId) => {
    if (!currentUser || currentUser.role !== 'student') return false;

    const drive = drives.find(d => d.id === driveId);
    if (!drive) return false;

    const existing = applications.find(a => a.driveId === driveId && a.studentId === currentUser.id);
    if (existing) return false;

    const newApp = {
      id: `app-${Date.now()}`,
      driveId,
      studentId: currentUser.id,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Applied',
      currentRound: 1,
      totalRounds: drive.selectionRounds?.length || 3,
      notes: 'Application received and in initial screening.',
      history: [
        { stage: 'Applied', date: new Date().toISOString().split('T')[0], status: 'completed' },
        { stage: drive.selectionRounds?.[0]?.name || 'Screening', date: 'Upcoming', status: 'active' }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Send in-app notification
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'student',
      recipientId: currentUser.id,
      title: `Application Submitted: ${drive.companyName}`,
      message: `You applied for ${drive.role} (${drive.packageLPA} LPA). Best of luck!`,
      type: 'drive',
      time: 'Just now',
      unread: true
    };
    setNotifications(prev => [notif, ...prev]);

    addLog(`Applied to ${drive.companyName} for ${drive.role}`, 'Applications');
    return true;
  };

  const updateStudentProfile = (studentId, updatedFields) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...updatedFields } : s));
    addLog(`Updated profile details for student ID ${studentId}`, 'Student Profile');
  };

  // Company Actions
  const postDrive = (driveData) => {
    const newDrive = {
      ...driveData,
      id: `drv-${Date.now()}`,
      companyId: currentUser?.id || 'comp-1',
      companyName: currentUser?.companyName || currentUser?.name || 'Company',
      status: 'Active',
      postedAt: new Date().toISOString().split('T')[0]
    };
    setDrives(prev => [newDrive, ...prev]);
    addLog(`Posted new campus drive: ${newDrive.role} (${newDrive.packageLPA} LPA)`, 'Drives');

    // Notify students
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'all',
      recipientId: 'all',
      title: `New Campus Drive: ${newDrive.companyName}`,
      message: `${newDrive.companyName} opened applications for ${newDrive.role} (${newDrive.packageLPA} LPA). Apply before ${newDrive.deadline}!`,
      type: 'drive',
      time: 'Just now',
      unread: true
    };
    setNotifications(prev => [notif, ...prev]);
    return newDrive;
  };

  const updateDrive = (driveId, fields) => {
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, ...fields } : d));
    addLog(`Updated drive ID ${driveId}`, 'Drives');
  };

  const updateApplicationStatus = (appId, newStatus, roundName = '', notes = '') => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const historyCopy = [...(app.history || [])];
      historyCopy.push({
        stage: roundName || newStatus,
        date: new Date().toISOString().split('T')[0],
        status: newStatus === 'Rejected' ? 'failed' : 'completed'
      });
      return {
        ...app,
        status: newStatus,
        notes: notes || app.notes,
        history: historyCopy
      };
    }));

    const app = applications.find(a => a.id === appId);
    const drive = drives.find(d => d.id === app?.driveId);

    // Notify the student
    if (app && drive) {
      const notif = {
        id: `notif-${Date.now()}`,
        recipientRole: 'student',
        recipientId: app.studentId,
        title: `Status Update: ${drive.companyName}`,
        message: `Your application status for ${drive.role} has been updated to "${newStatus}".`,
        type: newStatus === 'Offered' ? 'offer' : 'interview',
        time: 'Just now',
        unread: true
      };
      setNotifications(prev => [notif, ...prev]);
    }

    addLog(`Updated application ${appId} status to "${newStatus}"`, 'Applications');
  };

  const scheduleInterview = (interviewData) => {
    const newInt = {
      ...interviewData,
      id: `int-${Date.now()}`,
      status: 'Upcoming'
    };
    setInterviews(prev => [newInt, ...prev]);

    // Update application status to Interview Scheduled
    const app = applications.find(a => a.driveId === interviewData.driveId && a.studentId === interviewData.studentId);
    if (app) {
      updateApplicationStatus(app.id, 'Interview Scheduled', interviewData.roundName, `Interview scheduled on ${interviewData.date} at ${interviewData.time}`);
    }

    addLog(`Scheduled interview for ${interviewData.studentName} with ${interviewData.companyName}`, 'Interviews');
    return newInt;
  };

  const releaseOffer = (offerData) => {
    const newOffer = {
      ...offerData,
      id: `ofr-${Date.now()}`,
      status: 'Pending',
      offeredOn: new Date().toISOString().split('T')[0],
      letterRef: `CAMPUS/${new Date().getFullYear()}/OFFER-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setOffers(prev => [newOffer, ...prev]);

    // Mark application as Offered
    const app = applications.find(a => a.driveId === offerData.driveId && a.studentId === offerData.studentId);
    if (app) {
      updateApplicationStatus(app.id, 'Offered', 'Offer Released', 'Congratulations! Official offer letter released.');
    }

    // Mark student as placed
    setStudents(prev => prev.map(s => s.id === offerData.studentId ? { ...s, placed: true } : s));

    addLog(`Released offer letter for ${offerData.studentName} (${offerData.companyName} - ${offerData.packageLPA} LPA)`, 'Offers');
    return newOffer;
  };

  const acceptOffer = (offerId) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Accepted' } : o));
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      addLog(`Student ${offer.studentName} accepted offer from ${offer.companyName}`, 'Offers');
    }
  };

  const declineOffer = (offerId) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Declined' } : o));
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      addLog(`Student ${offer.studentName} declined offer from ${offer.companyName}`, 'Offers');
    }
  };

  // Admin Actions
  const verifyStudent = (studentId, verified = true) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, verified } : s));
    addLog(`${verified ? 'Verified' : 'Unverified'} student ID ${studentId}`, 'Verification');
  };

  const toggleBlockStudent = (studentId) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, blocked: !s.blocked } : s));
    addLog(`Toggled block status for student ID ${studentId}`, 'Admin');
  };

  const addStudent = (newStd) => {
    const student = {
      ...newStd,
      id: `std-${Date.now()}`,
      verified: true,
      placed: false,
      blocked: false
    };
    setStudents(prev => [student, ...prev]);
    addLog(`Added student ${student.name} (${student.rollNo})`, 'Admin');
  };

  const approveCompany = (companyId, approved = true) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, approved } : c));
    addLog(`${approved ? 'Approved' : 'Rejected'} recruiter partner ID ${companyId}`, 'Companies');
  };

  const createAnnouncement = (announcementData) => {
    const newAnn = {
      ...announcementData,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addLog(`Broadcasted notice: "${newAnn.title}" to ${newAnn.target}`, 'Announcements');

    // Notify all
    const notif = {
      id: `notif-${Date.now()}`,
      recipientRole: 'all',
      recipientId: 'all',
      title: `Announcement: ${newAnn.title}`,
      message: newAnn.content.slice(0, 100) + '...',
      type: 'announcement',
      time: 'Just now',
      unread: true
    };
    setNotifications(prev => [notif, ...prev]);
    return newAnn;
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, unread: false } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const resetToDefaults = () => {
    setStudents(INITIAL_STUDENTS);
    setCompanies(INITIAL_COMPANIES);
    setDrives(INITIAL_DRIVES);
    setApplications(INITIAL_APPLICATIONS);
    setInterviews(INITIAL_INTERVIEWS);
    setOffers(INITIAL_OFFERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setLogs(AUDIT_LOGS);
    localStorage.clear();
    addLog('System data reset to initial baseline demo state', 'System');
  };

  return (
    <PlacementContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        currentStudentData,
        login,
        logout,
        switchRole,
        students,
        companies,
        drives,
        applications,
        interviews,
        offers,
        notifications,
        announcements,
        logs,
        applyToDrive,
        updateStudentProfile,
        postDrive,
        updateDrive,
        updateApplicationStatus,
        scheduleInterview,
        releaseOffer,
        acceptOffer,
        declineOffer,
        verifyStudent,
        toggleBlockStudent,
        addStudent,
        approveCompany,
        createAnnouncement,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDefaults
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
}

export function usePlacement() {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
}
