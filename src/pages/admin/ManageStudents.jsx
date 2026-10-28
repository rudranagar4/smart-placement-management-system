import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import Modal from '../../components/ui/Modal';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  XCircle,
  Ban,
  Unlock,
  GraduationCap,
  FileSpreadsheet
} from 'lucide-react';

export default function ManageStudents() {
  const { students, verifyStudent, toggleBlockStudent, addStudent } = usePlacement();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedVerification, setSelectedVerification] = useState('All');
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  // New student state
  const [newStd, setNewStd] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    branch: 'Computer Science & Engineering',
    semester: 8,
    cgpa: 8.5,
    tenthMarks: 90,
    twelfthMarks: 90,
    backlogs: 0,
    skills: 'Java, Python, SQL',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  });

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
    const matchesVerif = selectedVerification === 'All' ||
                         (selectedVerification === 'Verified' && s.verified) ||
                         (selectedVerification === 'Unverified' && !s.verified);
    return matchesSearch && matchesBranch && matchesVerif;
  });

  const exportStudentsCSV = () => {
    const headers = ['Roll No,Name,Email,Branch,CGPA,10th Marks,12th Marks,Backlogs,Verified,Placed,Blocked'];
    const rows = filteredStudents.map(s =>
      `"${s.rollNo}","${s.name}","${s.email}","${s.branch}","${s.cgpa}","${s.tenthMarks}","${s.twelfthMarks}","${s.backlogs}","${s.verified}","${s.placed}","${s.blocked || false}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Students_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addStudent({
      ...newStd,
      cgpa: Number(newStd.cgpa),
      semester: Number(newStd.semester),
      tenthMarks: Number(newStd.tenthMarks),
      twelfthMarks: Number(newStd.twelfthMarks),
      backlogs: Number(newStd.backlogs),
      skills: newStd.skills.split(',').map(s => s.trim()),
      certifications: [],
      projects: [],
      internships: [],
      achievements: []
    });
    setAddStudentModalOpen(false);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Student Affairs & Accreditation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Manage Student Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Verify academic transcripts, monitor backlog status, manage drive clearance, and export student cohorts.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={exportStudentsCSV}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Export Roster CSV</span>
          </button>
          <button
            onClick={() => setAddStudentModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="my-8 p-4 sm:p-6 rounded-3xl glass-panel border flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search student by name, roll no, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="All">All Disciplines</option>
          <option value="Computer Science & Engineering">CSE</option>
          <option value="Information Technology">IT</option>
          <option value="Electronics & Communication">ECE</option>
          <option value="Electrical Engineering">EE</option>
          <option value="Mechanical Engineering">Mech</option>
        </select>

        <select
          value={selectedVerification}
          onChange={(e) => setSelectedVerification(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="All">All Verification States</option>
          <option value="Verified">Verified Only</option>
          <option value="Unverified">Unverified Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-3xl glass-panel border overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Total Enrolled: {filteredStudents.length} Students
          </span>
          <span className="text-xs text-slate-400">T&P Cell Clearance System</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Branch & Semester</th>
                <th className="py-3.5 px-4">CGPA / Scores</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Placement Status</th>
                <th className="py-3.5 px-4 text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{s.rollNo}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{s.branch}</div>
                    <div className="text-[11px] text-slate-500">Semester {s.semester}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.cgpa} CGPA</div>
                    <div className="text-[10px] text-slate-500">
                      10th: {s.tenthMarks}% • 12th: {s.twelfthMarks}%
                    </div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${s.backlogs === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {s.backlogs} Backlog(s)
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {s.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                        ● Pending Check
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {s.placed ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                        Placed
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Unplaced</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => verifyStudent(s.id, !s.verified)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                          s.verified
                            ? 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {s.verified ? 'Revoke Verif' : 'Verify'}
                      </button>

                      <button
                        onClick={() => toggleBlockStudent(s.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          s.blocked
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title={s.blocked ? 'Unblock Student' : 'Block Student from Drives'}
                      >
                        {s.blocked ? <Unlock className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Student Modal */}
      <Modal
        isOpen={addStudentModalOpen}
        onClose={() => setAddStudentModalOpen(false)}
        title="Enroll New Student to T&P Records"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={newStd.name}
                onChange={(e) => setNewStd({ ...newStd, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Roll No *</label>
              <input
                type="text"
                required
                value={newStd.rollNo}
                onChange={(e) => setNewStd({ ...newStd, rollNo: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Email *</label>
              <input
                type="email"
                required
                value={newStd.email}
                onChange={(e) => setNewStd({ ...newStd, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Branch *</label>
              <select
                value={newStd.branch}
                onChange={(e) => setNewStd({ ...newStd, branch: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Information Technology">IT</option>
                <option value="Electronics & Communication">ECE</option>
                <option value="Electrical Engineering">EE</option>
                <option value="Mechanical Engineering">Mech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">CGPA *</label>
              <input
                type="number"
                step="0.01"
                required
                value={newStd.cgpa}
                onChange={(e) => setNewStd({ ...newStd, cgpa: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">12th %</label>
              <input
                type="number"
                value={newStd.twelfthMarks}
                onChange={(e) => setNewStd({ ...newStd, twelfthMarks: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Backlogs</label>
              <input
                type="number"
                min="0"
                value={newStd.backlogs}
                onChange={(e) => setNewStd({ ...newStd, backlogs: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddStudentModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Enroll Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
