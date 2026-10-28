import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Bell,
  Plus,
  Send,
  AlertCircle,
  Calendar,
  Users,
  CheckCircle2
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

export default function AnnouncementsAdmin() {
  const { announcements, createAnnouncement } = usePlacement();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Important Notice',
    priority: 'Normal',
    target: 'All 2026 Batch',
    author: 'Dr. K. S. Verma (Head, Training & Placement)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnnouncement(formData);
    setModalOpen(false);
    setFormData({
      title: '',
      content: '',
      category: 'Important Notice',
      priority: 'Normal',
      target: 'All 2026 Batch',
      author: 'Dr. K. S. Verma (Head, Training & Placement)'
    });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Campus Broadcasts
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Announcements & Notices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Publish circulars, pre-placement talk alerts, workshop invitations, and compliance deadlines to student cohorts.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice Circular</span>
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-6 rounded-3xl glass-panel border shadow-xs hover:border-indigo-400/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  ann.priority === 'High' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                }`}>
                  {ann.category}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Target: <strong className="text-slate-700 dark:text-slate-300">{ann.target}</strong>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Published: {ann.date}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
              {ann.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {ann.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Issued by: <strong className="text-slate-700 dark:text-slate-300">{ann.author}</strong></span>
              <span className="text-emerald-600 font-semibold">● Broadcasted Live</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Broadcast New Campus Announcement"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Notice Heading *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              placeholder="e.g. Schedule for Amazon Pre-Placement Talk"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <option value="Important Notice">Important Notice</option>
                <option value="Campus Drive Alert">Campus Drive Alert</option>
                <option value="Skill Workshop">Skill Workshop</option>
                <option value="Policy Update">Policy Update</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Target Audience</label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <option value="All 2026 Batch">All 2026 Batch</option>
                <option value="CSE, IT, ECE Only">CSE, IT, ECE Only</option>
                <option value="Mechanical & Civil">Mechanical & Civil</option>
                <option value="All Unplaced Students">All Unplaced Students</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Notice Content *</label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              placeholder="Complete circular text..."
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
