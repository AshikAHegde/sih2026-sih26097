import React, { useState } from 'react';
import { Beneficiary } from '@/types';
import { useAppStore } from '@/lib/store/eventStore';
import { getSunitaSkillEvidence } from '@/lib/rules/skillEvidence';
import { getSunitaDiagnosis } from '@/lib/rules/diagnosis';
import { SEED_LOCATIONS } from '@/lib/seed/data';
import { X, CheckCircle2, ShieldCheck, Clock, Award, AlertTriangle, Layers, FileText } from 'lucide-react';

interface ProfileModalProps {
  beneficiary: Beneficiary;
  onClose: () => void;
}

export const BeneficiaryProfileModal: React.FC<ProfileModalProps> = ({ beneficiary, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'barriers' | 'timeline'>('summary');
  const { state } = useAppStore();

  const isSunita = beneficiary.id === 'ben_sunita_01';
  const sunitaEvidence = getSunitaSkillEvidence();
  const sunitaDiagnosis = getSunitaDiagnosis();
  const location = SEED_LOCATIONS.find((l) => l.id === beneficiary.clusterId);

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-2xl border border-rule max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-rule flex items-center justify-between bg-paper">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-marigold/20 border border-marigold text-ink font-bold flex items-center justify-center text-xs">
              {beneficiary.initial}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-ink">
                  {beneficiary.firstName} {beneficiary.initial}.
                </h2>
                <span className="text-[10px] bg-indigo/10 text-indigo border border-indigo/20 px-1.5 py-0.2 rounded font-mono">
                  {beneficiary.id}
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded font-mono">
                  Simulated
                </span>
              </div>
              <p className="text-2xs text-ink-soft">
                {location?.name} Cluster ({location?.block} Block) · {beneficiary.villageName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface text-ink-soft hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* C5a Profile Navigation Tabs */}
        <div className="flex border-b border-rule px-4 bg-surface text-xs font-medium">
          {[
            { id: 'summary', label: 'Summary' },
            { id: 'evidence', label: 'Skill Evidence Pane' },
            { id: 'barriers', label: 'Barriers & Pathways Pane' },
            { id: 'timeline', label: 'Timeline & Consent' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2.5 px-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo text-indigo font-bold'
                  : 'border-transparent text-ink-soft hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* 1. Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-paper rounded-xl border border-rule">
                  <span className="text-2xs text-ink-soft block">Age & Gender</span>
                  <span className="text-xs font-bold text-ink">{beneficiary.ageBand} · {beneficiary.gender}</span>
                </div>
                <div className="p-3 bg-paper rounded-xl border border-rule">
                  <span className="text-2xs text-ink-soft block">Stated Experience</span>
                  <span className="text-xs font-bold font-mono text-ink">{beneficiary.yearsExperience ?? 0} Years</span>
                </div>
                <div className="p-3 bg-paper rounded-xl border border-rule">
                  <span className="text-2xs text-ink-soft block">Travel Radius</span>
                  <span className="text-xs font-bold font-mono text-ink">≤ {beneficiary.hardLimits?.maxTravelMinutes ?? 30} mins</span>
                </div>
                <div className="p-3 bg-paper rounded-xl border border-rule">
                  <span className="text-2xs text-ink-soft block">RPL Status</span>
                  <span className="text-xs font-bold text-room">
                    {isSunita ? 'Likely ready' : 'Screened'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-paper rounded-xl border border-rule space-y-1">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider block">Spoken Profile Summary</span>
                <p className="text-xs text-ink leading-relaxed">
                  {beneficiary.statedSkills.join('. ')}.
                </p>
              </div>
            </div>
          )}

          {/* 2. Skill Evidence Pane */}
          {activeTab === 'evidence' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-room/10 border border-room/20 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-room">
                    Standard: AMH/Q1947 Self Employed Tailor (NSQF Level 4)
                  </div>
                  <div className="text-2xs text-room font-medium">
                    {sunitaEvidence.preScreen.coreUnitsEvidenced} of {sunitaEvidence.preScreen.coreUnitsCount} Core Units Evidenced ({sunitaEvidence.preScreen.percentage}%)
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-room text-white font-bold text-2xs rounded uppercase">
                  {sunitaEvidence.preScreen.band}
                </span>
              </div>

              <div className="space-y-2">
                {sunitaEvidence.evidenceList.map((unit) => (
                  <div key={unit.unitCode} className="p-3 bg-paper rounded-xl border border-rule space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {unit.level >= 2 ? (
                          <CheckCircle2 className="w-4 h-4 text-room shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-ink-soft text-ink-soft flex items-center justify-center text-[10px]">?</div>
                        )}
                        <span className="font-bold text-ink">{unit.unitTitle}</span>
                      </div>
                      <span className="font-mono text-2xs px-2 py-0.5 rounded bg-surface border border-rule font-semibold">
                        Level {unit.level} / 4
                      </span>
                    </div>

                    {unit.quote && (
                      <p className="text-2xs text-ink-soft italic pl-6">
                        Quote: {unit.quote}
                      </p>
                    )}
                    {unit.specifics && (
                      <p className="text-2xs text-indigo font-medium pl-6">
                        Specifics: {unit.specifics}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Barriers & Pathways Pane */}
          {activeTab === 'barriers' && (
            <div className="space-y-3">
              {/* Primary Diagnostic Banner */}
              <div className="p-3.5 bg-indigo/5 border border-indigo/20 rounded-xl space-y-1">
                <span className="text-2xs font-bold text-indigo uppercase tracking-wider block">
                  Module 2 Diagnostic Finding
                </span>
                <p className="text-sm font-bold text-ink">
                  "{sunitaDiagnosis.primaryBarrier}"
                </p>
                <p className="text-2xs text-ink-soft">
                  Skill is verified through 7-year history. Primary bottlenecks are formal credentials and aggregated buyer demand.
                </p>
              </div>

              {/* 7 Barrier Markers */}
              <div className="space-y-1.5">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wide block">
                  The 7 Barrier Markers
                </span>
                {sunitaDiagnosis.barriers.map((b) => (
                  <div key={b.type} className="p-2.5 bg-paper rounded-xl border border-rule flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-ink">{b.label}</span>
                      <span className="text-2xs text-ink-soft block">{b.explanation}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-2xs font-semibold uppercase ${
                        b.status === 'none'
                          ? 'bg-room/10 text-room border border-room/20'
                          : b.status === 'blocking'
                          ? 'bg-crowded/10 text-crowded border border-crowded/20'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {b.status === 'none' ? 'Clear' : b.status === 'blocking' ? 'Blocking' : 'Partial'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Support Package Recommendation */}
              <div className="p-3 bg-paper rounded-xl border border-rule space-y-2">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider block">Support Package Routing</span>
                <div className="space-y-1 text-2xs">
                  <div className="text-room font-semibold">
                    ✓ Recommended: {sunitaDiagnosis.supportPackage.recommended.join(' · ')}
                  </div>
                  <div className="text-crowded font-semibold">
                    ✗ Forbidden: {sunitaDiagnosis.supportPackage.forbidden.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Timeline & Consent Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              <div className="p-3 bg-paper rounded-xl border border-rule space-y-2">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider block">
                  Spoken Consent Audit
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink">1. Voice Recording:</span>
                    <span className="font-bold text-room">Granted (Spoken Audio)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink">2. District Planning Use:</span>
                    <span className="font-bold text-room">Granted (Included in dashboard)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink">3. Village Helper Follow-up:</span>
                    <span className="font-bold text-room">Granted (Nov 2, 2026 visit)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-paper rounded-xl border border-rule space-y-2">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider block">
                  Activity Timeline
                </span>
                <div className="space-y-2 text-2xs text-ink-soft">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo" />
                    <span>Oct 2, 2026 · 10:42 AM — Spoken voice session completed (Turn A1 to A16).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-marigold" />
                    <span>Oct 2, 2026 · 10:44 AM — Added to Devgaon RPL Candidate Roster (#20).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-room" />
                    <span>Nov 2, 2026 (Scheduled) — Helper token delivery visit.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
