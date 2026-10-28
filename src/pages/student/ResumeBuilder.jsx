import React, { useState, useRef } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  FileText,
  Download,
  Printer,
  Upload,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Globe,
  Code2,
  Mail,
  Phone,
  Eye
} from 'lucide-react';

export default function ResumeBuilder() {
  const { currentStudentData } = usePlacement();
  const student = currentStudentData || {};

  const [uploadedResumeName, setUploadedResumeName] = useState('Rudra_Nagar_Campus_Resume_2026.pdf');
  const [template, setTemplate] = useState('modern'); // 'modern' | 'minimal'

  const [resumeData, setResumeData] = useState({
    summary: 'High-achieving Computer Science undergraduate with proven experience building distributed cloud systems and high-throughput web architectures. LeetCode 2100+ rating, proficient in full-stack engineering, algorithms, and system design.',
    skills: student.skills?.join(', ') || 'React, Node.js, Java, Python, System Design, AWS, Docker, PostgreSQL',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.pdf')) {
        alert('Please upload a PDF document.');
        return;
      }
      setUploadedResumeName(file.name);
      alert(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DACB]/80 dark:border-stone-800 print:hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A55]">
            Automated Career Tools
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24201D] dark:text-stone-100 mt-1">
            Resume Builder & PDF Exporter
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Generate an ATS-friendly campus resume populated automatically from your verified academic records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Template Selector */}
          <div className="flex items-center gap-1 bg-[#F5EFEB] dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                template === 'modern' ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-2xs font-bold' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('minimal')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                template === 'minimal' ? 'bg-white dark:bg-stone-900 text-[#C25E38] dark:text-[#E07A55] shadow-2xs font-bold' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Minimal Harvard
            </button>
          </div>

          {/* Upload Button */}
          <label className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:bg-white text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors backdrop-blur-sm">
            <Upload className="w-3.5 h-3.5 text-[#C25E38]" />
            <span>Upload PDF</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Download / Print */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#C25E38] hover:bg-[#A94E2C] text-white font-semibold text-xs shadow-md shadow-[#C25E38]/25 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Uploaded File Banner */}
      <div className="my-6 p-4 rounded-2xl glass-panel border flex items-center justify-between text-xs print:hidden">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#C25E38]" />
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            Active Resume File: <strong className="font-mono text-[#C25E38] dark:text-[#E07A55]">{uploadedResumeName}</strong>
          </span>
          <span className="text-[10px] font-semibold bg-[#2D5A43]/15 text-[#2D5A43] dark:text-emerald-300 px-2 py-0.5 rounded-full">
            ● Attached to Drives
          </span>
        </div>
        <button
          onClick={() => alert(`Previewing ${uploadedResumeName}`)}
          className="text-xs font-semibold text-[#C25E38] dark:text-[#E07A55] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3 h-3" />
          <span>Quick Preview</span>
        </button>
      </div>

      {/* Live Resume Document Preview (Styled for Print & Screen) */}
      <div className="mt-8 bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 max-w-4xl mx-auto font-sans leading-relaxed">
        {/* Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            {student.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 font-medium">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-500" /> {student.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-500" /> {student.phone}
            </span>
            <span>•</span>
            <span>{student.branch}</span>
            <span>•</span>
            <span className="font-bold text-indigo-700 font-mono">CGPA: {student.cgpa}</span>
          </div>

          <div className="mt-1 flex items-center justify-center gap-4 text-xs text-indigo-700 font-medium">
            {student.linkedin && <span>linkedin.com/in/demo</span>}
            {student.github && <span>github.com/demo</span>}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Professional Profile
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Education
          </h3>
          <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
            <span>Bachelor of Technology in {student.branch}</span>
            <span>2022 – 2026</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 mt-0.5">
            <span>National Institute of Technology / University Campus</span>
            <span className="font-bold text-slate-900">Cumulative CGPA: {student.cgpa} / 10.0</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Class XII (Senior Secondary): {student.twelfthMarks}% • Class X (Secondary): {student.tenthMarks}%
          </div>
        </div>

        {/* Experience & Internships */}
        {student.internships && student.internships.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Internship Experience
            </h3>
            {student.internships.map((int, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                  <span>{int.role} — <span className="text-indigo-800">{int.company}</span></span>
                  <span className="font-normal text-slate-600">{int.period}</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  • {int.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Technical Projects */}
        <div className="mt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Selected Technical Projects
          </h3>
          {(student.projects || []).map((proj, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                <span>{proj.title} <span className="font-normal text-slate-600 text-[11px]">| {proj.tech}</span></span>
                <span className="text-[11px] font-semibold text-indigo-700">Production Ready</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                • {proj.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div className="mt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Technical Competencies
          </h3>
          <div className="text-xs text-slate-700 space-y-1">
            <div><strong className="text-slate-900">Core Technologies:</strong> {student.skills?.join(', ')}</div>
            <div><strong className="text-slate-900">Architecture & Tools:</strong> Docker, Git, CI/CD, Redis, PostgreSQL, REST APIs</div>
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="mt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Key Honors & Certifications
          </h3>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
            {(student.achievements || []).map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
            {(student.certifications || []).map((c, i) => (
              <li key={`cert-${i}`}>{c.name} — {c.issuer} ({c.year})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
