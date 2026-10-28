import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    rollNo: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Can I participate in campus drives if I have an active backlog?",
      a: "Eligibility criteria regarding active backlogs is strictly set by each hiring company. While many Tier-1 product firms mandate 0 active backlogs, several IT services and consulting companies permit up to 1-2 backlogs subject to passing by graduation."
    },
    {
      q: "How does the 'One Student, One Offer' rule work on Ascend?",
      a: "Once a student accepts a campus offer, the system automatically locks future applications for that tier. However, if a Super Dream company (>₹30 LPA) visits, eligible students from lower tiers may apply subject to T&P Cell approval."
    },
    {
      q: "When will the official 6-month internship NOC be issued?",
      a: "NOC requests are submitted directly inside your Student Dashboard under the Documents tab once you receive an official verified Offer Letter on Ascend."
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto pb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Support & Communications
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Contact Placement Cell
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Have queries regarding drive eligibility, company accreditation, or placement schedules? Our placement officers are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-panel border">
            <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Physical Secretariat</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Level 3, Administrative Tower, Main University Campus, Sector 62, Delhi NCR - 201309
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border">
            <Mail className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Official Communications</h3>
            <p className="text-xs text-slate-500 mt-1">
              General: <span className="text-indigo-600 font-medium">placements@campus.edu</span><br />
              Corporate: <span className="text-indigo-600 font-medium">corporate.relations@campus.edu</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Secretariat Hours</h3>
            <p className="text-xs text-slate-500 mt-1">
              Monday – Friday: 09:00 AM – 06:00 PM IST<br />
              Saturday: 10:00 AM – 02:00 PM IST (During Drive Season)
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Submit an Inquiry or Grievance
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            All submissions generate an instant tracking ticket and are answered by placement officers within 24 hours.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                Ticket reference <span className="font-mono font-bold text-indigo-600">#TNP-2026-9812</span> has been assigned to your query. A response will be sent to your registered email address.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Rudra Nagar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="student@campus.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Student">Student (2026 Batch)</option>
                    <option value="Company">Recruiter / Employer HR</option>
                    <option value="Alumni">University Alumni</option>
                    <option value="Parent">Parent / Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 0251csds289 / Google HR"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Query regarding Google Drive CGPA Eligibility"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  placeholder="Provide complete details regarding your placement inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-16 p-8 rounded-3xl glass-panel border">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>Frequently Asked Questions</span>
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((f, i) => (
            <div key={i} className="py-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.q}</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
