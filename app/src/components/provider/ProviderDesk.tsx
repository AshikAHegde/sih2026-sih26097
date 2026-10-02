import React, { useState } from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { Building2, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const ProviderDesk: React.FC = () => {
  const { state, appendEvent } = useAppStore();
  const [confirmed, setConfirmed] = useState(false);

  const activeOpp = state.opportunities.find((o) => o.id === 'opp_rpl_01');

  const handleConfirmCapacity = () => {
    appendEvent('PROVIDER_CONFIRM_CAPACITY', activeOpp?.id, { provider: 'Pratham Institute' });
    setConfirmed(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <div className="bg-surface p-4 rounded-xl border border-rule shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center text-indigo">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-ink">Training Provider Desk (Pratham Institute)</h1>
            <p className="text-2xs text-ink-soft">Accredited Assessment Agency · Apparel & Construction</p>
          </div>
        </div>
        <span className="text-2xs bg-paper border border-rule px-2 py-0.5 rounded font-mono text-ink-soft">
          P1 Cohort Inbox
        </span>
      </div>

      {/* Cohort Spec Card */}
      <div className="bg-surface p-5 rounded-xl border border-rule space-y-4">
        <div className="flex items-start justify-between border-b border-rule pb-3">
          <div>
            <span className="text-2xs font-mono font-bold text-indigo">COHORT BRIEF #RPL-2026-08</span>
            <h2 className="text-sm font-bold text-ink mt-0.5">
              RPL Assessment Camp: Self Employed Tailor (AMH/Q1947)
            </h2>
            <p className="text-2xs text-ink-soft">Devgaon Cluster Community Hall · Target: Nov 15, 2026</p>
          </div>
          <span className="text-xs bg-room/10 text-room font-bold px-2.5 py-1 rounded">
            {activeOpp?.candidateIds.length || 20} Candidates Pre-screened
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-paper rounded border border-rule">
            <span className="text-2xs text-ink-soft block">Assessment Duration</span>
            <span className="font-bold text-ink">2 Days (Practical + Theory)</span>
          </div>
          <div className="p-3 bg-paper rounded border border-rule">
            <span className="text-2xs text-ink-soft block">Pre-Screen Criteria</span>
            <span className="font-bold text-ink">≥ 70% Core Units Evidenced</span>
          </div>
          <div className="p-3 bg-paper rounded border border-rule">
            <span className="text-2xs text-ink-soft block">Certification Agency</span>
            <span className="font-bold text-ink">Apparel Sector Skill Council</span>
          </div>
        </div>

        <div className="p-3 bg-paper rounded-lg border border-rule text-2xs space-y-1">
          <span className="font-bold text-ink block">Candidate Qualification Note:</span>
          <p className="text-ink-soft leading-relaxed">
            All 20 candidates possess ≥ 4 years demonstrated sewing experience on domestic or commercial machines. Pre-screening confirmed through spoken diagnostic evidence. No foundational course required.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {confirmed ? (
            <div className="flex items-center gap-1.5 text-xs text-room font-bold">
              <CheckCircle2 className="w-4 h-4 text-room" />
              <span>Capacity Confirmed & Assessors Assigned (Nov 15-16)</span>
            </div>
          ) : (
            <button
              onClick={handleConfirmCapacity}
              className="px-4 py-2 bg-indigo hover:bg-indigo/90 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
            >
              Confirm 20-Seat Assessor Capacity
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
