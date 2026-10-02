import React from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { Volume2, Mic, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Pause, Play, Sparkles } from 'lucide-react';
import { getSunitaSkillEvidence } from '@/lib/rules/skillEvidence.ts';
import { getSunitaDiagnosis } from '@/lib/rules/diagnosis.ts';

export const BeneficiaryView: React.FC = () => {
  const {
    state,
    setSunitaStep,
    toggleLocalEvidence,
    choosePathway,
    triggerWowAnimation
  } = useAppStore();

  const sunitaEvidence = getSunitaSkillEvidence();
  const sunitaDiagnosis = getSunitaDiagnosis();

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-100px)]">
      {/* Device wrapper / stand */}
      <div className="text-center mb-2">
        <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
          Beneficiary Phone View (Hunar Line Voice Session)
        </span>
        <div className="text-2xs text-ink-soft">Touch targets ≥ 64px · Voice-first interface · No text fields</div>
      </div>

      {/* Strict Phone Frame (390 x 844 px) */}
      <div className="w-[390px] h-[844px] bg-surface rounded-[32px] border-4 border-ink shadow-2xl flex flex-col overflow-hidden relative">
        {/* Phone Notch & Status Bar */}
        <div className="bg-ink text-surface px-6 pt-2 pb-1 flex items-center justify-between text-xs select-none">
          <span className="font-mono text-[11px] tabular-nums">10:42 AM</span>
          <div className="w-24 h-4 bg-ink rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1" />
            <span className="text-[10px] text-surface/80">Hunar Line</span>
          </div>
          <span className="text-[10px] text-surface/80">4G / SIM</span>
        </div>

        {/* Audio Live Bar (Spoken First Interface) */}
        <div className="bg-indigo/10 border-b border-indigo/20 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo animate-bounce" />
            <span className="text-xs font-medium text-indigo">Speaking in Hindi (Chandauli)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] bg-indigo text-white px-1.5 py-0.5 rounded font-mono">1.5x</span>
            <button
              onClick={() => setSunitaStep(state.sunitaStep === 'V9' ? 'V2' : 'V9')}
              className="text-xs text-ink-soft hover:text-ink px-1.5 py-0.5 rounded bg-surface border border-rule"
              title="Pause and protect privacy"
            >
              {state.sunitaStep === 'V9' ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>

        {/* SCREEN CONTENTS (V1 through V9) */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          {/* V9: Paused Screen */}
          {state.sunitaStep === 'V9' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <Pause className="w-12 h-12 text-ink-soft mb-3" />
              <h2 className="text-lg font-bold text-ink">Session Paused</h2>
              <p className="text-xs text-ink-soft mt-1">Screen blanked to protect privacy.</p>
              <button
                onClick={() => setSunitaStep('V2')}
                className="mt-6 w-full min-h-[64px] bg-indigo text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base"
              >
                <Play className="w-5 h-5" /> Resume Conversation
              </button>
            </div>
          )}

          {/* V1: 3-Part Spoken Consent */}
          {state.sunitaStep === 'V1' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded text-2xs mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-marigold" />
                  <span>3-Part Audio Consent (Beat 2)</span>
                </div>
                <h1 className="text-xl font-bold text-ink leading-tight">Namaste Sunita ji.</h1>
                <p className="text-xs text-ink-soft mt-1">Before we begin, do we have your permission?</p>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-xl border border-rule bg-paper flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xs font-semibold text-ink">1. Record conversation</h2>
                      <p className="text-2xs text-ink-soft mt-0.5">To accurately capture your tailoring experience.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-rule bg-paper flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xs font-semibold text-ink">2. District planning use</h2>
                      <p className="text-2xs text-ink-soft mt-0.5">Help district officials organize local training batches.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-rule bg-paper flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xs font-semibold text-ink">3. Follow-up check-in</h2>
                      <p className="text-2xs text-ink-soft mt-0.5">Allow our local village helper to call in 30 days.</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSunitaStep('V2')}
                className="w-full min-h-[64px] bg-indigo hover:bg-indigo/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-sm transition-all"
              >
                <span>I Agree (Begin Conversation)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* V2: Spoken Conversation with Live Meter */}
          {state.sunitaStep === 'V2' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo">Listening to Sunita...</span>
                  <span className="text-2xs text-ink-soft">Turn 4 / 6</span>
                </div>

                {/* Spoken audio level meter */}
                <div className="bg-paper p-4 rounded-xl border border-rule flex items-center justify-center gap-1.5 h-16">
                  {[24, 40, 16, 56, 32, 48, 64, 28, 44, 18, 52, 36].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1.5 bg-marigold rounded-full transition-all duration-150 animate-pulse"
                    />
                  ))}
                </div>

                {/* Transcript bubble with quoted facts */}
                <div className="mt-4 bg-indigo/5 border border-indigo/20 p-3.5 rounded-xl">
                  <p className="text-xs text-ink leading-relaxed italic">
                    "I have been stitching blouse, salwar suit, and school frocks on my black Usha machine for 7 years at home. I measure with inch-tape and cut with chalk. But I don't have any certificate, and work is irregular..."
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-2xs text-ink-soft">
                  <span className="w-2 h-2 rounded-full bg-room" />
                  <span>5 unit competencies identified in spoken transcript</span>
                </div>
              </div>

              <button
                onClick={() => setSunitaStep('V4')}
                className="w-full min-h-[64px] bg-indigo hover:bg-indigo/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-sm"
              >
                <span>View Skills Discovered</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* V4: Skills Discovered & Barrier Diagnosis */}
          {state.sunitaStep === 'V4' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-ink">Skills Found in Your Words</h2>
                  <span className="bg-room/10 text-room border border-room/20 px-2 py-0.5 rounded text-2xs font-semibold">
                    {sunitaEvidence.preScreen.coreUnitsEvidenced} of {sunitaEvidence.preScreen.coreUnitsCount} Core Units
                  </span>
                </div>

                <div className="p-2.5 bg-room/10 border border-room/30 rounded-lg text-xs text-room font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-room shrink-0" />
                  <span>RPL Pre-screen: {sunitaEvidence.preScreen.band} (71%)</span>
                </div>

                {/* Evidence Checklist */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {sunitaEvidence.evidenceList.map((item) => (
                    <div
                      key={item.unitCode}
                      className="p-2 bg-paper rounded border border-rule flex items-center justify-between text-2xs"
                    >
                      <div className="flex items-center gap-2">
                        {item.level >= 2 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-room shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-ink-soft text-ink-soft flex items-center justify-center text-[9px]">?</div>
                        )}
                        <span className="text-ink font-medium truncate max-w-[210px]">{item.unitTitle}</span>
                      </div>
                      <span className="font-mono text-ink-soft tabular-nums">Level {item.level}</span>
                    </div>
                  ))}
                </div>

                {/* Diagnostic finding */}
                <div className="mt-3 p-3 bg-paper rounded-xl border border-rule">
                  <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider block">Diagnostic Barrier Finding</span>
                  <p className="text-xs font-bold text-indigo mt-0.5">
                    "{sunitaDiagnosis.primaryBarrier}"
                  </p>
                  <p className="text-2xs text-ink-soft mt-1">
                    Forbidden: 3-month beginner course. Recommended: 2-day RPL Camp + Order linkage.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSunitaStep('V5')}
                className="w-full min-h-[64px] bg-indigo hover:bg-indigo/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-sm mt-3"
              >
                <span>See Tailored Options</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* V5: Options Tiles (With Re-Rank Animation & 'was 1st' outline) */}
          {state.sunitaStep === 'V5' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-ink">Your Best Pathways</h2>
                  {/* Local Evidence Switch */}
                  <button
                    onClick={toggleLocalEvidence}
                    className={`px-2 py-0.5 rounded text-2xs font-semibold border transition-all ${
                      state.withLocalEvidence
                        ? 'bg-marigold text-ink border-amber-400 shadow-sm'
                        : 'bg-paper text-ink-soft border-rule hover:bg-surface'
                    }`}
                    title="Toggle local market evidence (Press 'L')"
                  >
                    {state.withLocalEvidence ? '✓ Local Evidence ON' : 'Individual Only'}
                  </button>
                </div>

                <div className="text-2xs text-ink-soft mb-3">
                  {state.withLocalEvidence
                    ? 'Options ranked with Devgaon cluster market data.'
                    : 'Options ranked only by your individual skills.'}
                </div>

                {/* Ranked Options List (Animated transition) */}
                <div className="space-y-2.5">
                  {state.rankedOptions.map((opt) => {
                    const isWasFirst = state.withLocalEvidence && opt.previousRank === 1 && opt.rank !== 1;
                    return (
                      <div
                        key={opt.pathway.id}
                        onClick={() => choosePathway(opt.pathway.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-500 relative ${
                          opt.rank === 1
                            ? 'border-indigo bg-indigo/5 shadow-sm'
                            : 'border-rule bg-surface hover:border-indigo/50'
                        } ${isWasFirst ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}
                      >
                        {/* "Was 1st" outline badge */}
                        {isWasFirst && (
                          <div className="absolute -top-2 right-3 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm animate-pulse">
                            was 1st (crowded in Devgaon)
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-paper border border-rule flex items-center justify-center font-bold text-xs tabular-nums text-ink">
                              {opt.rank}
                            </span>
                            <h3 className="text-xs font-bold text-ink">{opt.pathway.name}</h3>
                          </div>
                          {opt.badge && (
                            <span className="text-[10px] bg-paper px-1.5 py-0.5 rounded font-medium border border-rule text-ink-soft shrink-0">
                              {opt.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-2xs text-ink-soft mt-1.5 leading-relaxed">{opt.reason}</p>

                        {opt.verdictText && (
                          <div className="mt-2 flex items-center gap-1.5 text-2xs">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                opt.verdictStatus === 'Likely room'
                                  ? 'bg-room'
                                  : opt.verdictStatus === 'Likely crowded'
                                  ? 'bg-crowded'
                                  : 'bg-uncertain'
                              }`}
                            />
                            <span className="font-semibold text-ink">{opt.verdictText}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-2 text-center text-2xs text-ink-soft">
                Tap any option above to confirm your choice
              </div>
            </div>
          )}

          {/* V6: Confirm Choice */}
          {state.sunitaStep === 'V6' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-room/10 text-room border border-room/20 px-2 py-1 rounded text-2xs mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-room" />
                  <span>Choice Recorded on Phone</span>
                </div>
                <h2 className="text-lg font-bold text-ink">Choice Confirmed!</h2>
                <p className="text-xs text-ink-soft mt-1">
                  You selected: <strong>School uniform cluster / SHG order group</strong>.
                </p>

                <div className="mt-4 p-4 rounded-xl border border-rule bg-paper space-y-2">
                  <div className="text-xs font-semibold text-ink">Next Steps for Sunita:</div>
                  <ul className="text-2xs text-ink-soft space-y-1 list-disc pl-4">
                    <li>Joined Devgaon RPL Assessment candidate roster.</li>
                    <li>Notified when RPL 2-day camp schedule is confirmed.</li>
                    <li>Local helper will deliver identity badge in 5 days.</li>
                  </ul>
                </div>

                {/* THE WOW TRIGGER BUTTON */}
                <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-300">
                  <span className="text-2xs font-bold text-amber-900 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-marigold" /> Beat 8 Trigger: The WOW Sequence
                  </span>
                  <p className="text-2xs text-amber-800 mt-0.5">
                    Clicking below will dispatch Sunita's marigold dot across to the District Map!
                  </p>
                  <button
                    onClick={triggerWowAnimation}
                    disabled={state.wowAnimationTriggered}
                    className="mt-2 w-full py-2.5 bg-marigold hover:bg-amber-500 text-ink font-bold text-xs rounded-lg transition-all shadow-sm disabled:opacity-50"
                  >
                    {state.wowAnimationComplete
                      ? '✓ Dot Landed & Camp Triggered'
                      : state.wowAnimationTriggered
                      ? 'Dot Traveling to Map...'
                      : 'Launch Marigold Dot to District Map →'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSunitaStep('V7')}
                className="w-full min-h-[64px] bg-indigo text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-sm mt-3"
              >
                <span>Finish & View Next Step</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* V7: Next Step / Follow-up Scheduled */}
          {state.sunitaStep === 'V7' && (
            <div className="flex-1 flex flex-col justify-between text-center p-2">
              <div>
                <CheckCircle2 className="w-12 h-12 text-room mx-auto mb-3" />
                <h2 className="text-xl font-bold text-ink">All Set, Sunita ji!</h2>
                <p className="text-xs text-ink-soft mt-1">Your session is securely saved.</p>

                <div className="mt-6 p-4 rounded-xl bg-paper border border-rule text-left space-y-2">
                  <div className="text-xs font-semibold text-ink">Scheduled Check-in:</div>
                  <div className="text-xs text-ink-soft">
                    Helper <strong>Ramesh (Devgaon Cluster)</strong> will visit on <strong>Nov 2, 2026</strong>.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSunitaStep('V1')}
                className="w-full min-h-[64px] bg-paper hover:bg-surface border border-rule text-ink font-bold rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                Start New Beneficiary Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
