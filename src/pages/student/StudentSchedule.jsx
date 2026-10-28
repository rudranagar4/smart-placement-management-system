import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function StudentSchedule() {
  const { interviews, currentStudentData } = usePlacement();
  const student = currentStudentData || {};

  const myInterviews = interviews.filter(i => i.studentId === student.id);

  // Demo additional campus mock tests
  const schedules = [
    ...myInterviews.map(i => ({
      id: i.id,
      title: `${i.companyName} — ${i.roundName}`,
      type: 'Interview',
      date: i.date,
      time: i.time,
      mode: i.mode,
      venueOrLink: i.meetingLink,
      panel: i.panel,
      status: i.status
    })),
    {
      id: 'sch-mock-1',
      title: 'T&P Cell Mandatory Aptitude Simulation 2026',
      type: 'Assessment Test',
      date: '2026-11-01',
      time: '10:00 - 11:30 IST',
      mode: 'Computer Lab 3 (Online Assessment Portal)',
      venueOrLink: 'T&P Computing Complex, Ground Floor',
      panel: 'Automated Proctoring (CodeChef / HackerRank)',
      status: 'Upcoming'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Recruitment Calendar
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Interviews & Test Schedule
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Sync your calendar with upcoming coding assessments, system design interviews, and campus technical panels.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {schedules.map((sch) => {
          const isInterview = sch.type === 'Interview';

          return (
            <div
              key={sch.id}
              className="p-6 rounded-3xl glass-panel border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${
                  isInterview ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400'
                }`}>
                  {isInterview ? <Video className="w-6 h-6" /> : <CalendarIcon className="w-6 h-6" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isInterview ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300' : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/60 dark:text-cyan-300'
                    }`}>
                      {sch.type}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      ● {sch.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                    {sch.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{sch.date} • {sch.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sch.mode}</span>
                    </div>
                  </div>

                  {sch.panel && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Panel: <strong className="text-slate-800 dark:text-slate-200">{sch.panel}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="self-end md:self-center">
                {sch.venueOrLink.startsWith('http') ? (
                  <a
                    href={sch.venueOrLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>Join Meeting</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {sch.venueOrLink}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
