import React, { useState, useEffect } from 'react';
import {
  PREP_QUESTIONS,
  APTITUDE_MOCK_TEST,
  INTERVIEW_EXPERIENCES
} from '../../data/mockData';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
  ChevronRight,
  Code,
  Layers,
  MessageSquare,
  Building2,
  RefreshCw
} from 'lucide-react';

export default function PlacementPrepHub() {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'mock-test' | 'experiences'

  // Question bank state
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Mock test state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes timer
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive && secondsRemaining > 0 && !testSubmitted) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && !testSubmitted) {
      setTestSubmitted(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsRemaining, testSubmitted]);

  const handleStartTest = () => {
    setSelectedAnswers({});
    setTestSubmitted(false);
    setSecondsRemaining(300);
    setTimerActive(true);
  };

  const calculateScore = () => {
    let score = 0;
    APTITUDE_MOCK_TEST.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const filteredQuestions = selectedCompany === 'All'
    ? PREP_QUESTIONS
    : PREP_QUESTIONS.filter(q => q.company.toLowerCase() === selectedCompany.toLowerCase());

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Career Development & Readiness
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Placement Preparation Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Master company-specific technical interview problems, practice timed quantitative aptitude tests, and read real interview transcripts from placed seniors.
        </p>
      </div>

      {/* Tabs */}
      <div className="my-8 flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-full sm:w-max">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'questions' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Company Question Bank</span>
        </button>

        <button
          onClick={() => setActiveTab('mock-test')}
          className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'mock-test' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Aptitude Mock Test</span>
        </button>

        <button
          onClick={() => setActiveTab('experiences')}
          className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'experiences' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Senior Interview Logs</span>
        </button>
      </div>

      {/* TAB 1: QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Company filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['All', 'Google', 'Amazon', 'Microsoft', 'Goldman Sachs'].map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCompany === comp
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl glass-panel border transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                      {q.company}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {q.askedCount}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {q.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {q.description}
                </p>

                {expandedQuestion === q.id ? (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
                    {q.sampleInput && (
                      <div>
                        <strong className="text-slate-700 dark:text-slate-300">Sample Input:</strong>{' '}
                        <code className="text-[11px] bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">
                          {q.sampleInput}
                        </code>
                      </div>
                    )}
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Recommended Solution Approach:</strong>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {q.solutionApproach}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedQuestion(null)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer pt-2 block"
                    >
                      Hide Solution
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setExpandedQuestion(q.id)}
                    className="mt-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Solution Approach & Insights</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: APTITUDE MOCK TEST */}
      {activeTab === 'mock-test' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border">
          {!timerActive && !testSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <Clock className="w-12 h-12 text-indigo-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Timed Quantitative Aptitude Assessment
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                4 high-probability aptitude questions covering speed-distance, permutations, work-time, and number series. 5-minute countdown starts upon launch.
              </p>
              <button
                onClick={handleStartTest}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                Start 5-Minute Mock Quiz
              </button>
            </div>
          ) : (
            <div>
              {/* Header with Countdown Timer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Campus Aptitude Test ({APTITUDE_MOCK_TEST.length} Questions)
                  </h3>
                  <div className="text-xs text-slate-500">Passing threshold: 75% score</div>
                </div>

                {!testSubmitted && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-sm">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>
                      {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {testSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-center">
                  <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                    Test Completed! Your Score: {calculateScore()} / {APTITUDE_MOCK_TEST.length}
                  </h4>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                    {calculateScore() >= 3 ? '🎉 Excellent! You cleared the company screening cutoff.' : 'Review explanations below to sharpen your quantitative skills.'}
                  </p>
                  <button
                    onClick={handleStartTest}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Retake Test
                  </button>
                </div>
              )}

              {/* Questions list */}
              <div className="space-y-6">
                {APTITUDE_MOCK_TEST.map((q, qIndex) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correct;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                      <div className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                        Q{qIndex + 1}. {q.question}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = userAnswer === optIndex;
                          let optionStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800';

                          if (testSubmitted) {
                            if (optIndex === q.correct) {
                              optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200';
                            }
                          } else if (isSelected) {
                            optionStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold';
                          }

                          return (
                            <button
                              key={optIndex}
                              disabled={testSubmitted}
                              onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIndex })}
                              className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer ${optionStyle}`}
                            >
                              <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {testSubmitted && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-[11px] text-slate-600 dark:text-slate-400">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!testSubmitted && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setTestSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Submit Answers
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SENIOR INTERVIEW EXPERIENCES */}
      {activeTab === 'experiences' && (
        <div className="space-y-6">
          {INTERVIEW_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="p-6 sm:p-8 rounded-3xl glass-panel border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {exp.company} — {exp.role}
                    </h3>
                    <div className="text-xs text-slate-500">{exp.studentName} • {exp.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                    ● {exp.verdict} ({exp.package})
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preparation Tips & Interview Insights:
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{exp.tips}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
