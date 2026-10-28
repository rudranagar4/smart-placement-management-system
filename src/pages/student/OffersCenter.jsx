import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { fireCelebrationConfetti } from '../../utils/confetti';
import {
  Award,
  Download,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Building2,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

export default function OffersCenter() {
  const { offers, currentStudentData, acceptOffer, declineOffer } = usePlacement();
  const student = currentStudentData || {};

  const myOffers = offers.filter(o => o.studentId === student.id);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [acceptCelebrate, setAcceptCelebrate] = useState(false);

  const handleAccept = (offerId) => {
    acceptOffer(offerId);
    fireCelebrationConfetti();
    setAcceptCelebrate(true);
  };

  const handleDecline = (offerId) => {
    if (window.confirm('Are you sure you want to decline this offer? This action is irreversible.')) {
      declineOffer(offerId);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Campus Placements
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Offers & Accreditations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Review verified employment offer letters released by recruiter partners. Acceptance registers your placement in the official university records.
        </p>
      </div>

      {myOffers.length === 0 ? (
        <div className="mt-12 p-12 text-center rounded-3xl glass-panel border">
          <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No offer letters released yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Once technical and managerial interview rounds are concluded by recruiters, official offer letters will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {myOffers.map((offer) => {
            const isAccepted = offer.status === 'Accepted';
            const isDeclined = offer.status === 'Declined';
            const isPending = offer.status === 'Pending';

            return (
              <div
                key={offer.id}
                className="p-6 sm:p-8 rounded-3xl glass-panel border shadow-xs hover:shadow-lg transition-all relative overflow-hidden"
              >
                {/* Ribbon */}
                {isAccepted && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-extrabold px-6 py-1.5 rounded-bl-2xl shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ACCEPTED OFFER</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 p-2.5 border border-indigo-200/50 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {offer.companyName}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {offer.role} • <span className="text-slate-600 dark:text-slate-400">{offer.location}</span>
                      </div>
                      <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                        Ref: {offer.letterRef}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500">Total Compensation</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      ₹{offer.packageLPA} LPA
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Accept before: <strong className="text-slate-700 dark:text-slate-300">{offer.expiryDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Salary Breakup Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium">Fixed Base Salary</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {offer.baseSalary}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium">Joining Bonus</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {offer.joiningBonus}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium">Equity / ESOP Grants</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {offer.esops}
                    </div>
                  </div>
                </div>

                {/* Letter Preview & Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>View Formal Offer Letter</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {isPending && (
                      <>
                        <button
                          onClick={() => handleDecline(offer.id)}
                          className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAccept(offer.id)}
                          className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Accept Offer Letter</span>
                        </button>
                      </>
                    )}

                    {isAccepted && (
                      <button
                        onClick={() => { fireCelebrationConfetti(); }}
                        className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Accepted (Celebrate Again!)</span>
                      </button>
                    )}

                    {isDeclined && (
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl">
                        Declined
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Formal Letter Modal */}
      <Modal
        isOpen={!!selectedOffer}
        onClose={() => setSelectedOffer(null)}
        title={selectedOffer ? `Official Offer Letter — ${selectedOffer.companyName}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedOffer && (
          <div className="p-6 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-4 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-extrabold uppercase text-slate-900">{selectedOffer.companyName} India Pvt Ltd</h3>
                <p className="text-[11px] text-slate-500">University Campus Recruitment Cohort 2026</p>
              </div>
              <span className="font-mono text-[11px] font-bold text-indigo-700">{selectedOffer.letterRef}</span>
            </div>

            <p><strong>Date:</strong> {selectedOffer.offeredOn}</p>
            <p><strong>Dear {student.name},</strong></p>

            <p>
              On behalf of {selectedOffer.companyName}, we are delighted to extend you an offer of employment as <strong>{selectedOffer.role}</strong> at our {selectedOffer.location} development center.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div><strong>Cost to Company (CTC):</strong> ₹{selectedOffer.packageLPA} LPA</div>
              <div><strong>Base Annual Salary:</strong> {selectedOffer.baseSalary}</div>
              <div><strong>Relocation / Joining Bonus:</strong> {selectedOffer.joiningBonus}</div>
              <div><strong>Restricted Stock Grants:</strong> {selectedOffer.esops}</div>
            </div>

            <p>
              This offer is contingent upon successful verification of your academic records (maintaining minimum {selectedOffer.packageLPA > 30 ? '8.0' : '7.0'} CGPA upon graduation with zero backlogs) and completion of standard background checks.
            </p>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold">Director of Talent Acquisition</div>
                <div className="text-slate-500 text-[11px]">{selectedOffer.companyName} University Programs</div>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3 h-3" />
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Acceptance Modal Celebration Alert */}
      <Modal
        isOpen={acceptCelebrate}
        onClose={() => setAcceptCelebrate(false)}
        title="Congratulations on Your Placement! 🎉"
        maxWidth="max-w-md"
      >
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Offer Accepted!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Your formal acceptance has been recorded. The Training & Placement Cell and recruiter HR have been notified. Welcome to the alumni placement roll of honor!
          </p>
          <button
            onClick={() => setAcceptCelebrate(false)}
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer hover:bg-indigo-700 transition-colors"
          >
            Awesome!
          </button>
        </div>
      </Modal>
    </div>
  );
}
