import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import {
  SEED_LOCATIONS,
  SEED_PATHWAYS,
  SEED_BENEFICIARIES,
  DEVGAON_OWN_TAILORING_VERDICT,
  PERSONA_SUNITA,
  PERSONA_ASHA,
} from '@/lib/seed/data.ts';
import {
  MapPin,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { computeCellVerdict } from '@/lib/rules/verdict.ts';

type ConsoleTab = 'overview' | 'map' | 'opportunities' | 'plan' | 'people' | 'outcomes' | 'trust';

export const OfficerConsole: React.FC = () => {
  const {
    state,
    setInspectCell,
    completeWowAnimation,
    replacePlanLine,
    submitAshaCheckIn,
    triggerWowAnimation,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<ConsoleTab>('overview');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('tailor_own');
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);
  const [officerReason, setOfficerReason] = useState(
    'Devgaon cluster tailoring market is likely crowded (84 existing workers, 9 median days). Replacing 30 beginner seats with 20-seat RPL Certification Camp for experienced home sewers.'
  );

  // Sync tab with story beats
  useEffect(() => {
    if (state.storyBeat === 1) setActiveTab('plan');
    if (state.storyBeat === 8) setActiveTab('map');
    if (state.storyBeat === 9) {
      setActiveTab('map');
      setInspectCell('devgaon_cluster', 'tailor_own');
    }
    if (state.storyBeat === 10) setActiveTab('plan');
    if (state.storyBeat === 11) setActiveTab('outcomes');
    if (state.storyBeat === 12) setActiveTab('overview');
  }, [state.storyBeat]);

  // Handle WOW dot arrival simulation
  useEffect(() => {
    if (state.wowAnimationTriggered && !state.wowAnimationComplete) {
      const timer = setTimeout(() => {
        completeWowAnimation();
      }, 900); // 900ms WOW animation duration per ui_spec.md
      return () => clearTimeout(timer);
    }
  }, [state.wowAnimationTriggered, state.wowAnimationComplete]);

  const activeOpp = state.opportunities.find((o) => o.id === 'opp_rpl_01');
  const planL1 = state.planLines.find((l) => l.id === 'L1');

  const inspectedVerdict = state.inspectClusterId
    ? computeCellVerdict(state.inspectClusterId, state.inspectPathwayId || selectedPathwayId)
    : DEVGAON_OWN_TAILORING_VERDICT;

  return (
    <div className="max-w-console mx-auto px-4 py-4 space-y-4">
      {/* Console Subheader & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold text-ink">District Officer Planning Console</h1>
          <span className="bg-paper text-ink-soft border border-rule px-2 py-0.5 rounded text-2xs font-mono">
            Chandauli HQ
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'C1 Overview' },
            { id: 'map', label: 'C2 Livelihood Map' },
            { id: 'opportunities', label: 'C3 Opportunities' },
            { id: 'plan', label: 'C4 Plan Builder' },
            { id: 'people', label: 'C5 People' },
            { id: 'outcomes', label: 'C6 Outcomes' },
            { id: 'trust', label: 'C7 Data & Trust' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ConsoleTab)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo text-white shadow-sm font-semibold'
                  : 'bg-surface text-ink-soft hover:bg-paper hover:text-ink border border-rule'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          C1: OVERVIEW TAB
          ======================================================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Highlights Banner */}
            <div className="p-4 bg-surface rounded-xl border border-rule">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">District Evidence Summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-paper rounded-lg border border-rule">
                  <span className="text-2xs text-ink-soft block">Surveyed Population</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-ink">600</span>
                  <span className="text-[10px] text-marigold block mt-0.5">100% Simulated</span>
                </div>
                <div className="p-3 bg-paper rounded-lg border border-rule">
                  <span className="text-2xs text-ink-soft block">Active Clusters</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-ink">20</span>
                  <span className="text-[10px] text-ink-soft block mt-0.5">Across 5 Blocks</span>
                </div>
                <div className="p-3 bg-paper rounded-lg border border-rule">
                  <span className="text-2xs text-ink-soft block">RPL Candidates Viable</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-room">
                    {activeOpp?.candidateIds.length || 19}/20
                  </span>
                  <span className="text-[10px] text-room block mt-0.5">Devgaon Tailoring Camp</span>
                </div>
                <div className="p-3 bg-paper rounded-lg border border-rule">
                  <span className="text-2xs text-ink-soft block">Plan Flags Raised</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-crowded">
                    {planL1?.status === 'Hold suggested' ? 1 : 0}
                  </span>
                  <span className="text-[10px] text-crowded block mt-0.5">Hold Beginner Batch</span>
                </div>
              </div>
            </div>

            {/* Change Feed */}
            <div className="p-4 bg-surface rounded-xl border border-rule">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Live District Change Feed</h2>
              <div className="space-y-2">
                {state.eventLog.slice(0, 5).map((evt) => (
                  <div key={evt.id} className="p-2.5 bg-paper rounded border border-rule text-xs flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-ink font-semibold">{evt.action}</strong>
                        <span className="text-2xs text-ink-soft font-mono tabular-nums">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      {evt.objectId && <span className="text-2xs text-ink-soft block">Target: {evt.objectId}</span>}
                      {evt.reason && <p className="text-2xs text-indigo mt-1 font-medium">{evt.reason}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Pending Decisions */}
          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-xl border border-rule">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">Decisions Awaiting Action</h2>
              {planL1?.status === 'Hold suggested' ? (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Plan Line L1 Flagged for Replacement</span>
                  </div>
                  <p className="text-2xs text-amber-800">
                    Beginner tailoring in Devgaon is likely crowded. 20 RPL candidates ready.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('plan');
                      setReplaceDialogOpen(true);
                    }}
                    className="w-full py-1.5 bg-indigo text-white text-xs font-bold rounded shadow-sm hover:bg-indigo/90"
                  >
                    Open Plan Builder & Replace Line
                  </button>
                </div>
              ) : planL1?.status === 'Replaced' ? (
                <div className="p-3 bg-room/10 border border-room/30 rounded-lg text-xs text-room font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-room shrink-0" />
                  <span>Line L1 Replaced with RPL Camp O1</span>
                </div>
              ) : (
                <p className="text-xs text-ink-soft">No urgent flags. All lines nominal.</p>
              )}
            </div>

            {/* Quick Persona Inspector */}
            <div className="p-4 bg-surface rounded-xl border border-rule">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">Demo Focus Persona</h2>
              <div className="p-3 bg-paper rounded-lg border border-rule space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-ink">Sunita D.</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">In Focus</span>
                </div>
                <div className="text-2xs text-ink-soft">Village: Devgaon North (Devgaon Cluster)</div>
                <div className="text-2xs text-ink-soft">Skill: 7 years home tailoring on Usha machine</div>
                <div className="text-2xs font-semibold text-room mt-1">Status: Candidate in RPL Camp (Slot 20/20)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          C2: LIVELIHOOD MAP TAB (WITH THE WOW MOMENT)
          ======================================================== */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {/* Pathway Selector Bar */}
            <div className="p-3 bg-surface rounded-xl border border-rule flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink">Market Pathway:</span>
                <select
                  value={selectedPathwayId}
                  onChange={(e) => setSelectedPathwayId(e.target.value)}
                  className="text-xs bg-paper border border-rule rounded px-2 py-1 text-ink font-medium"
                >
                  {SEED_PATHWAYS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sector})
                    </option>
                  ))}
                </select>
              </div>

              {/* Map Legend */}
              <div className="flex items-center gap-3 text-2xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-room" />
                  <span className="text-ink-soft">Likely Room</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-uncertain hatch-uncertain" />
                  <span className="text-ink-soft">Uncertain</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-crowded pattern-crowded" />
                  <span className="text-ink-soft">Likely Crowded</span>
                </div>
              </div>
            </div>

            {/* Tile Map Grid (5 Blocks, 20 Clusters) */}
            <div className="p-4 bg-surface rounded-xl border border-rule relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo" />
                  <span className="text-xs font-bold text-ink uppercase tracking-wide">
                    Chandauli District Tile Map (20 Clusters)
                  </span>
                </div>
                <span className="text-2xs text-ink-soft font-mono">Click any cluster tile to inspect 6 signals</span>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                {SEED_LOCATIONS.map((loc) => {
                  const verdict = computeCellVerdict(loc.id, selectedPathwayId);
                  const isDevgaon = loc.id === 'devgaon_cluster';
                  const isInspected = state.inspectClusterId === loc.id;

                  return (
                    <div
                      key={loc.id}
                      onClick={() => setInspectCell(loc.id, selectedPathwayId)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all relative ${
                        verdict.verdict === 'Likely room'
                          ? 'border-room/40 bg-room/5 hover:border-room'
                          : verdict.verdict === 'Likely crowded'
                          ? 'border-crowded/40 bg-crowded/5 hover:border-crowded'
                          : 'border-uncertain/40 bg-uncertain/5 hover:border-uncertain'
                      } ${isInspected ? 'ring-2 ring-indigo shadow-md' : ''}`}
                    >
                      {/* WOW Marigold Dot landing badge */}
                      {isDevgaon && (
                        <div
                          className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-marigold border-2 border-surface shadow flex items-center justify-center transition-transform ${
                            state.wowAnimationTriggered ? 'scale-125 animate-ping' : ''
                          }`}
                          title="Sunita's Candidate Slot (Marigold Dot)"
                        >
                          <span className="text-[9px] font-bold text-ink">20</span>
                        </div>
                      )}

                      <div className="text-xs font-bold text-ink truncate">{loc.name}</div>
                      <div className="text-[10px] text-ink-soft truncate">{loc.block} Block</div>

                      <div className="mt-2 flex items-center justify-between text-2xs">
                        <span
                          className={`font-semibold ${
                            verdict.verdict === 'Likely room'
                              ? 'text-room'
                              : verdict.verdict === 'Likely crowded'
                              ? 'text-crowded'
                              : 'text-uncertain'
                          }`}
                        >
                          {verdict.verdict}
                        </span>
                        <span className="text-[10px] text-ink-soft font-mono">{verdict.confidence}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* The WOW Moment Live Status Bar */}
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-marigold animate-pulse" />
                  <span className="text-xs font-bold text-amber-900">
                    Devgaon RPL Tailoring Camp Status:
                  </span>
                  <strong className="text-xs text-amber-950 font-mono">
                    {activeOpp?.candidateIds.length || 19} / 20 Candidates
                  </strong>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      activeOpp?.status === 'Suggested'
                        ? 'bg-room text-white'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {activeOpp?.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!state.wowAnimationComplete && (
                    <button
                      onClick={triggerWowAnimation}
                      disabled={state.wowAnimationTriggered}
                      className="px-3 py-1 bg-marigold hover:bg-amber-500 text-ink text-xs font-bold rounded shadow-sm transition-all"
                    >
                      {state.wowAnimationTriggered ? 'Dot Traveling...' : 'Simulate Sunita Arrival (Beat 8)'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              C2a: EVIDENCE DRAWER (SLIDES IN ON CLUSTER CLICK)
              ======================================================== */}
          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-xl border border-rule shadow-sm">
              <div className="flex items-center justify-between border-b border-rule pb-2 mb-3">
                <div>
                  <h2 className="text-xs font-bold text-ink uppercase tracking-wide">
                    C2a Evidence Drawer
                  </h2>
                  <span className="text-sm font-bold text-indigo">
                    {SEED_LOCATIONS.find((l) => l.id === state.inspectClusterId)?.name || 'Devgaon'} Cluster
                  </span>
                </div>
                <span className="text-2xs bg-paper border border-rule px-1.5 py-0.5 rounded font-mono text-ink-soft">
                  {selectedPathwayId}
                </span>
              </div>

              {/* Verdict Banner */}
              <div
                className={`p-3 rounded-lg border mb-3 ${
                  inspectedVerdict.verdict === 'Likely crowded'
                    ? 'bg-crowded/10 border-crowded/30 text-crowded'
                    : inspectedVerdict.verdict === 'Likely room'
                    ? 'bg-room/10 border-room/30 text-room'
                    : 'bg-uncertain/10 border-uncertain/30 text-uncertain'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Verdict: {inspectedVerdict.verdict}</span>
                  <span className="text-2xs font-mono font-normal">Confidence: {inspectedVerdict.confidence}</span>
                </div>
                <p className="text-2xs text-ink mt-1 leading-relaxed">{inspectedVerdict.explanation}</p>
              </div>

              {/* The 6 Signals (A to F) with Provenance Chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider block">
                  The 6 Transparent Signal Readings (Zero LLM)
                </span>

                {(['A', 'B', 'C', 'D', 'E', 'F'] as const).map((sigId) => {
                  const sig = inspectedVerdict.signals[sigId];
                  return (
                    <div key={sigId} className="p-2.5 bg-paper rounded border border-rule text-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded bg-surface border border-rule flex items-center justify-center font-bold text-[10px] text-ink">
                            {sigId}
                          </span>
                          <span className="font-bold text-ink">{sig.name}</span>
                        </div>
                        <span className="font-mono font-bold text-ink tabular-nums">{sig.value}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-ink-soft">{sig.explanation}</span>
                        <span className="bg-surface px-1.5 py-0.5 rounded border border-rule text-ink-soft font-mono shrink-0 ml-1">
                          {sig.provenance}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          C4: PLAN BUILDER TAB (FLAGGING & REPLACE WORKFLOW)
          ======================================================== */}
      {activeTab === 'plan' && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-rule">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-ink">Annual District Training Plan (FY 2026-27)</h2>
                <p className="text-2xs text-ink-soft">
                  Plan Lines are flagged automatically when local market evidence signals saturation.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-mono text-ink-soft">3 Lines Total</span>
              </div>
            </div>

            {/* Plan Lines Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rule text-ink-soft text-2xs uppercase">
                    <th className="py-2 px-3 font-semibold">Line ID</th>
                    <th className="py-2 px-3 font-semibold">Title & Sector</th>
                    <th className="py-2 px-3 font-semibold">Cluster</th>
                    <th className="py-2 px-3 font-semibold text-right">Seats</th>
                    <th className="py-2 px-3 font-semibold">Current Status</th>
                    <th className="py-2 px-3 font-semibold text-right">Officer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule font-normal">
                  {state.planLines.map((line) => {
                    const isFlagged = line.status === 'Hold suggested';
                    const isReplaced = line.status === 'Replaced';

                    return (
                      <tr
                        key={line.id}
                        className={`transition-colors ${
                          isFlagged
                            ? 'bg-amber-50/80'
                            : isReplaced
                            ? 'bg-indigo/5'
                            : 'hover:bg-paper'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-ink">{line.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-ink">{line.title}</div>
                          {line.flagReason && (
                            <div className="text-[11px] text-amber-800 font-medium mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{line.flagReason}</span>
                            </div>
                          )}
                          {line.officerReason && (
                            <div className="text-[11px] text-indigo font-medium mt-1">
                              Officer Justification: "{line.officerReason}"
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-ink-soft">
                          {SEED_LOCATIONS.find((l) => l.id === line.clusterId)?.name}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-ink">
                          {line.seats}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-2xs font-semibold ${
                              isFlagged
                                ? 'bg-amber-200 text-amber-900 border border-amber-300'
                                : isReplaced
                                ? 'bg-indigo/10 text-indigo border border-indigo/20'
                                : 'bg-paper text-ink-soft border border-rule'
                            }`}
                          >
                            {line.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {isFlagged && (
                            <button
                              onClick={() => setReplaceDialogOpen(true)}
                              className="px-2.5 py-1 bg-indigo text-white font-bold text-2xs rounded hover:bg-indigo/90 shadow-sm"
                            >
                              Replace with RPL Camp
                            </button>
                          )}
                          {isReplaced && (
                            <span className="text-2xs text-room font-bold">✓ Replaced with O1</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* REPLACE MODAL DIALOG */}
          {replaceDialogOpen && (
            <div className="fixed inset-0 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-surface rounded-2xl border border-rule max-w-lg w-full p-5 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <h3 className="text-sm font-bold text-ink">Replace Plan Line L1 (Beat 10)</h3>
                  <button onClick={() => setReplaceDialogOpen(false)} className="text-ink-soft hover:text-ink">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                    <strong>Action:</strong> Replace 30-seat beginner tailoring batch with 20-seat RPL Certification Camp (opp_rpl_01) in Devgaon cluster.
                  </div>

                  <div>
                    <label className="font-semibold text-ink block mb-1">
                      Typed Officer Justification (Stored in Audit Log):
                    </label>
                    <textarea
                      value={officerReason}
                      onChange={(e) => setOfficerReason(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-indigo"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setReplaceDialogOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-soft hover:bg-paper"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      replacePlanLine('L1', 'opp_rpl_01', officerReason);
                      setReplaceDialogOpen(false);
                    }}
                    className="px-4 py-1.5 bg-indigo text-white font-bold text-xs rounded-lg hover:bg-indigo/90 shadow-sm"
                  >
                    Confirm & Update District Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          C3: OPPORTUNITIES TAB
          ======================================================== */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-rule">
            <h2 className="text-sm font-bold text-ink mb-3">Interventions & Viability Ledger</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.opportunities.map((opp) => (
                <div key={opp.id} className="p-4 bg-paper rounded-xl border border-rule space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xs font-mono font-bold text-indigo">{opp.id}</span>
                      <h3 className="text-xs font-bold text-ink">{opp.title}</h3>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-2xs font-bold uppercase ${
                        opp.status === 'Suggested' ? 'bg-room text-white' : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </div>

                  <p className="text-2xs text-ink-soft leading-relaxed">{opp.notes}</p>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-2xs font-mono">
                      <span>Viability Threshold:</span>
                      <span className="font-bold tabular-nums">
                        {opp.candidateIds.length} / {opp.capacity} Candidates
                      </span>
                    </div>
                    <div className="w-full bg-rule h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, (opp.candidateIds.length / opp.capacity) * 100)}%` }}
                        className={`h-full transition-all duration-500 ${
                          opp.candidateIds.length >= opp.capacity ? 'bg-room' : 'bg-marigold'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          C5: PEOPLE TAB
          ======================================================== */}
      {activeTab === 'people' && (
        <div className="p-4 bg-surface rounded-xl border border-rule space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-ink">Beneficiaries Roster (~600 Synthetic Records)</h2>
              <p className="text-2xs text-ink-soft">
                Strict Privacy Guardrail: First name & initial only. No surname, caste, religion, or exact address.
              </p>
            </div>
            <span className="text-2xs font-mono text-ink-soft">Displaying first 15 records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-rule text-ink-soft text-2xs uppercase">
                  <th className="py-2 px-2 font-semibold">ID</th>
                  <th className="py-2 px-2 font-semibold">Beneficiary</th>
                  <th className="py-2 px-2 font-semibold">Cluster</th>
                  <th className="py-2 px-2 font-semibold">Age / Gender</th>
                  <th className="py-2 px-2 font-semibold">Experience</th>
                  <th className="py-2 px-2 font-semibold">Planning Consent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule font-normal">
                {SEED_BENEFICIARIES.slice(0, 15).map((b) => (
                  <tr key={b.id} className="hover:bg-paper">
                    <td className="py-2.5 px-2 font-mono text-2xs text-ink-soft">{b.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-ink">
                      {b.firstName} {b.initial}.
                    </td>
                    <td className="py-2.5 px-2 text-ink-soft">
                      {SEED_LOCATIONS.find((l) => l.id === b.clusterId)?.name}
                    </td>
                    <td className="py-2.5 px-2 text-ink-soft text-2xs">
                      {b.ageBand} · {b.gender}
                    </td>
                    <td className="py-2.5 px-2 text-ink-soft text-2xs font-mono">
                      {b.yearsExperience ?? 0} yrs
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          b.consent.planningUse ? 'bg-room/10 text-room' : 'bg-crowded/10 text-crowded'
                        }`}
                      >
                        {b.consent.planningUse ? 'Granted' : 'Declined (Excluded)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          C6: OUTCOMES TAB (ASHA CHECK-IN LOOP)
          ======================================================== */}
      {activeTab === 'outcomes' && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-rule space-y-4">
            <div>
              <h2 className="text-sm font-bold text-ink">Outcome Verification & Truth Loop (Beat 11)</h2>
              <p className="text-2xs text-ink-soft">
                Comparing Provider Claims against Independent Village Helper Check-ins.
              </p>
            </div>

            {/* Claimed vs Verified Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-paper rounded-xl border border-rule space-y-2">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider">
                  Provider Claimed Placement
                </span>
                <div className="text-2xl font-bold font-mono text-ink tabular-nums">
                  {state.outcomeSummary.providerClaimedRate}%
                </div>
                <p className="text-2xs text-ink-soft">
                  Provider reported 20 of 25 trainees successfully placed in sustained work.
                </p>
              </div>

              <div className="p-4 bg-paper rounded-xl border border-rule space-y-2">
                <span className="text-2xs font-bold text-ink-soft uppercase tracking-wider">
                  Independent Verified Outcomes
                </span>
                <div className="text-2xl font-bold font-mono text-crowded tabular-nums">
                  {state.outcomeSummary.verifiedRate}%
                </div>
                <p className="text-2xs text-ink-soft">
                  Based on {state.outcomeSummary.verifiedReached} verified check-ins (Asha R. reported 5 paid days last month).
                </p>
              </div>
            </div>

            {/* Learning Event Banner */}
            {state.outcomeSummary.learningEventTriggered && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl space-y-1">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Learning Event Generated</span>
                </span>
                <p className="text-2xs text-amber-900 leading-relaxed">
                  {state.outcomeSummary.learningEventMessage}
                </p>
              </div>
            )}

            {/* Asha Check-in Action Trigger */}
            <div className="p-3 bg-indigo/5 rounded-xl border border-indigo/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-ink">Asha R. (Devgaon Trainee Check-in):</span>
                <span className="text-2xs text-ink-soft block">
                  Completed tailoring course 8 months ago. Only 5 paid days last month.
                </span>
              </div>
              <button
                onClick={submitAshaCheckIn}
                disabled={state.ashaCheckInCompleted}
                className="px-3 py-1.5 bg-indigo text-white text-xs font-bold rounded-lg hover:bg-indigo/90 disabled:opacity-50"
              >
                {state.ashaCheckInCompleted ? '✓ 20th Check-in Logged' : 'Submit Asha Check-in'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          C7: DATA & TRUST TAB
          ======================================================== */}
      {activeTab === 'trust' && (
        <div className="p-4 bg-surface rounded-xl border border-rule space-y-4">
          <div>
            <h2 className="text-sm font-bold text-ink">Data Provenance, Rules & Audit Ledger</h2>
            <p className="text-2xs text-ink-soft">
              Every figure is traceable to an official NSQF standard, an audit event, or simulated ground check.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Recent Audit Trail</span>
            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {state.eventLog.map((evt) => (
                <div key={evt.id} className="p-2 bg-paper rounded border border-rule text-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-ink-soft">{evt.id}</span>
                    <strong className="text-ink">{evt.action}</strong>
                    {evt.objectId && <span className="text-ink-soft">({evt.objectId})</span>}
                  </div>
                  <span className="font-mono text-ink-soft tabular-nums">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
