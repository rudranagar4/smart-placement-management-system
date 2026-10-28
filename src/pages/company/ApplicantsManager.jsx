import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import {
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';

export default function ApplicantsManager({ setActivePage }) {
  const {
    applications,
    students,
    drives,
    updateApplicationStatus,
    scheduleInterview,
    releaseOffer,
    currentUser
  } = usePlacement();

  const [selectedDriveId, setSelectedDriveId] = useState('All');
  const [minCgpa, setMinCgpa] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [interviewModalApp, setInterviewModalApp] = useState(null);
  const [offerModalApp, setOfferModalApp] = useState(null);
  const [studentResumeModal, setStudentResumeModal] = useState(null);

  // Form states for modals
  const [interviewData, setInterviewData] = useState({
    roundName: 'Virtual Technical Round 1',
    date: '2026-11-04',
    time: '15:00 - 16:00 IST',
    mode: 'Google Meet',
    meetingLink: 'https://meet.google.com/xyz-demo-recruit',
    panel: 'Arun Iyer (Engineering Lead)'
  });

  const [offerData, setOfferData] = useState({
    packageLPA: 42.0,
    baseSalary: '₹24,00,000 per annum',
    joiningBonus: '₹5,00,000',
    esops: '₹13,00,000 over 4 years',
    location: 'Bengaluru, India',
    expiryDate: '2026-11-15'
  });

  // Filter applicants
  const filteredApps = applications.filter(app => {
    const student = students.find(s => s.id === app.studentId);
    const drive = drives.find(d => d.id === app.driveId);
    if (!student || !drive) return false;

    const matchesDrive = selectedDriveId === 'All' || app.driveId === selectedDriveId;
    const matchesCgpa = student.cgpa >= minCgpa;
    const matchesBranch = selectedBranch === 'All' || student.branch === selectedBranch;
    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drive.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDrive && matchesCgpa && matchesBranch && matchesStatus && matchesSearch;
  });

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Application ID,Roll Number,Student Name,Branch,CGPA,10th,12th,Backlogs,Company,Role,Status,Applied Date'];
    const rows = filteredApps.map(app => {
      const s = students.find(std => std.id === app.studentId);
      const d = drives.find(drv => drv.id === app.driveId);
      return `"${app.id}","${s?.rollNo}","${s?.name}","${s?.branch}","${s?.cgpa}","${s?.tenthMarks}","${s?.twelfthMarks}","${s?.backlogs}","${d?.companyName}","${d?.role}","${app.status}","${app.appliedAt}"`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Campus_Applicants_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!interviewModalApp) return;

    const student = students.find(s => s.id === interviewModalApp.studentId);
    const drive = drives.find(d => d.id === interviewModalApp.driveId);

    scheduleInterview({
      driveId: drive.id,
      companyName: drive.companyName,
      studentId: student.id,
      studentName: student.name,
      roundName: interviewData.roundName,
      date: interviewData.date,
      time: interviewData.time,
      mode: interviewData.mode,
      meetingLink: interviewData.meetingLink,
      panel: interviewData.panel
    });

    setInterviewModalApp(null);
    alert(`Interview slotted for ${student.name} on ${interviewData.date}`);
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerModalApp) return;

    const student = students.find(s => s.id === offerModalApp.studentId);
    const drive = drives.find(d => d.id === offerModalApp.driveId);

    releaseOffer({
      studentId: student.id,
      studentName: student.name,
      driveId: drive.id,
      companyId: drive.companyId,
      companyName: drive.companyName,
      role: drive.role,
      packageLPA: Number(offerData.packageLPA),
      baseSalary: offerData.baseSalary,
      joiningBonus: offerData.joiningBonus,
      esops: offerData.esops,
      location: offerData.location,
      expiryDate: offerData.expiryDate
    });

    setOfferModalApp(null);
    alert(`Official offer letter released to ${student.name} (${offerData.packageLPA} LPA)`);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Candidate Pipeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Applicants Management & Actions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Filter high-CGPA candidates, advance applicants through selection rounds, schedule virtual interviews, and release formal offer letters.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer shadow-xs transition-colors self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-indigo-500" />
          <span>Export Filtered CSV</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="my-8 p-6 rounded-3xl glass-panel border space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Drive Selector */}
          <select
            value={selectedDriveId}
            onChange={(e) => setSelectedDriveId(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Drives</option>
            {drives.map(d => (
              <option key={d.id} value={d.id}>{d.companyName} — {d.role}</option>
            ))}
          </select>

          {/* Min CGPA */}
          <select
            value={minCgpa}
            onChange={(e) => setMinCgpa(Number(e.target.value))}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value={0}>Any CGPA</option>
            <option value={7.5}>Min 7.5 CGPA</option>
            <option value={8.0}>Min 8.0 CGPA</option>
            <option value={8.5}>Min 8.5 CGPA</option>
            <option value={9.0}>Min 9.0 CGPA (Top Tier)</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Stages</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Test Scheduled">Test Scheduled</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="rounded-3xl glass-panel border overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Showing {filteredApps.length} Verified Candidates
          </span>
          <span className="text-xs text-slate-400">Actions update candidate portal immediately</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Branch & Academics</th>
                <th className="py-3.5 px-4">Drive Applied</th>
                <th className="py-3.5 px-4">Stage Status</th>
                <th className="py-3.5 px-4 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApps.map((app) => {
                const s = students.find(std => std.id === app.studentId);
                const d = drives.find(drv => drv.id === app.driveId);
                if (!s || !d) return null;

                return (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Candidate Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{s.name}</span>
                            {s.verified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">{s.rollNo}</div>
                          <button
                            onClick={() => setStudentResumeModal(s)}
                            className="mt-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <FileText className="w-2.5 h-2.5" />
                            <span>View Resume Profile</span>
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Branch & Academics */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{s.branch}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{s.cgpa} CGPA</strong> • 10th: {s.tenthMarks}% • 12th: {s.twelfthMarks}%
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {s.backlogs === 0 ? '0 Backlogs' : `${s.backlogs} Backlogs`}
                      </div>
                    </td>

                    {/* Drive Applied */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{d.companyName}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{d.role}</div>
                      <div className="text-[11px] font-mono font-bold text-emerald-600 mt-0.5">₹{d.packageLPA} LPA</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <Badge status={app.status}>{app.status}</Badge>
                      <div className="text-[10px] text-slate-400 mt-1">Applied: {app.appliedAt}</div>
                    </td>

                    {/* Quick Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status === 'Applied' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Shortlisted', 'Candidate Shortlisted', 'Qualified initial profile screening.')}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                          >
                            Shortlist
                          </button>
                        )}

                        {app.status !== 'Interview Scheduled' && app.status !== 'Offered' && app.status !== 'Rejected' && (
                          <button
                            onClick={() => {
                              setInterviewModalApp(app);
                              setInterviewData({
                                ...interviewData,
                                roundName: 'Technical Interview Round 1'
                              });
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-100 cursor-pointer flex items-center gap-1"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Schedule</span>
                          </button>
                        )}

                        {app.status !== 'Offered' && app.status !== 'Rejected' && (
                          <button
                            onClick={() => {
                              setOfferModalApp(app);
                              setOfferData({
                                ...offerData,
                                packageLPA: d.packageLPA,
                                baseSalary: d.baseSalary,
                                joiningBonus: d.joiningBonus,
                                esops: d.esops,
                                location: d.location
                              });
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs cursor-pointer flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            <span>Make Offer</span>
                          </button>
                        )}

                        {app.status !== 'Rejected' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Rejected', 'Application Closed', 'Thank you for your participation.')}
                            className="px-2 py-1 text-[11px] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={!!interviewModalApp}
        onClose={() => setInterviewModalApp(null)}
        title="Schedule Virtual / Campus Interview"
        maxWidth="max-w-md"
      >
        {interviewModalApp && (
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interview Round Name
              </label>
              <input
                type="text"
                required
                value={interviewData.roundName}
                onChange={(e) => setInterviewData({ ...interviewData, roundName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={interviewData.date}
                  onChange={(e) => setInterviewData({ ...interviewData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  required
                  value={interviewData.time}
                  onChange={(e) => setInterviewData({ ...interviewData, time: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interview Mode / Meeting Link
              </label>
              <input
                type="text"
                required
                value={interviewData.meetingLink}
                onChange={(e) => setInterviewData({ ...interviewData, meetingLink: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interviewer / Panel Member
              </label>
              <input
                type="text"
                value={interviewData.panel}
                onChange={(e) => setInterviewData({ ...interviewData, panel: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setInterviewModalApp(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Confirm & Notify Candidate
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Release Offer Modal */}
      <Modal
        isOpen={!!offerModalApp}
        onClose={() => setOfferModalApp(null)}
        title="Release Formal Placement Offer Letter"
        maxWidth="max-w-md"
      >
        {offerModalApp && (
          <form onSubmit={handleOfferSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Total CTC (₹ LPA) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={offerData.packageLPA}
                  onChange={(e) => setOfferData({ ...offerData, packageLPA: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={offerData.location}
                  onChange={(e) => setOfferData({ ...offerData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Base Annual Salary
              </label>
              <input
                type="text"
                value={offerData.baseSalary}
                onChange={(e) => setOfferData({ ...offerData, baseSalary: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Joining Bonus
                </label>
                <input
                  type="text"
                  value={offerData.joiningBonus}
                  onChange={(e) => setOfferData({ ...offerData, joiningBonus: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Acceptance Expiry
                </label>
                <input
                  type="date"
                  value={offerData.expiryDate}
                  onChange={(e) => setOfferData({ ...offerData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOfferModalApp(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Dispatch Offer Letter
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Student Resume Quick View Modal */}
      <Modal
        isOpen={!!studentResumeModal}
        onClose={() => setStudentResumeModal(null)}
        title={studentResumeModal ? `${studentResumeModal.name} — Student Profile` : ''}
        maxWidth="max-w-xl"
      >
        {studentResumeModal && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <img src={studentResumeModal.avatar} alt={studentResumeModal.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{studentResumeModal.name}</h4>
                <div className="text-slate-500">{studentResumeModal.rollNo} • {studentResumeModal.branch}</div>
                <div className="font-bold text-indigo-600 mt-0.5">CGPA: {studentResumeModal.cgpa} / 10.0</div>
              </div>
            </div>

            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">Verified Skills:</strong>
              <div className="flex flex-wrap gap-1">
                {studentResumeModal.skills?.map((sk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">Projects:</strong>
              <div className="space-y-2">
                {studentResumeModal.projects?.map((p, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border text-[11px]">
                    <div className="font-bold text-slate-900 dark:text-white">{p.title} ({p.tech})</div>
                    <div className="text-slate-500 mt-0.5">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">Honors & Achievements:</strong>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5 text-[11px]">
                {studentResumeModal.achievements?.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
