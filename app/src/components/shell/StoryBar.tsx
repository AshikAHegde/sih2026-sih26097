import React from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';

const BEAT_DESCRIPTIONS: Record<number, { title: string; hint: string }> = {
  1: {
    title: 'Beat 1: The Problem (District Planning Blindspot)',
    hint: 'Officer reviews Plan Line L1 (30 beginner tailoring seats). Top-down target with no feedback from local market.',
  },
  2: {
    title: 'Beat 2: Consent & Spoken Story (Beneficiary Voice Session)',
    hint: 'Sunita (Devgaon North) gives 3-part consent. Spoken history: 7 years tailoring on home Usha machine.',
  },
  3: {
    title: 'Beat 3: Skill Evidence (Unit Extraction & RPL Pre-screen)',
    hint: 'Extracted facts mapped to official AMH/Q1947 standard. 5 of 7 core units evidenced (71%) → "Likely ready".',
  },
  4: {
    title: 'Beat 4: Diagnosis (The 7 Barrier Markers)',
    hint: 'Evaluating 7 barriers. Diagnostic finding: "Certification and customer access. Not skill."',
  },
  5: {
    title: 'Beat 5: Options (Person-Only Ranking)',
    hint: 'Based purely on individual stated skill, Option 1 is "Home tailoring" (7 days to income).',
  },
  6: {
    title: 'Beat 6: The Re-Rank (Injecting Local Market Evidence)',
    hint: 'Presenter presses "L" key. Local evidence toggled: Devgaon is crowded. "Uniform orders" jumps to 1st; Home tailoring drops to 3rd ("was 1st").',
  },
  7: {
    title: 'Beat 7: Beneficiary Choice Confirmed',
    hint: 'Sunita chooses Option 1: School Uniform SHG Group Production. Selection confirmed on phone.',
  },
  8: {
    title: 'Beat 8: THE WOW MOMENT (Cross-System Integration)',
    hint: 'Marigold dot travels from phone to Devgaon cluster tile! Slot 20/20 filled. RPL camp flips to "Suggested". Plan Line L1 flags for hold/replace.',
  },
  9: {
    title: 'Beat 9: Why It is Crowded (Evidence Drawer Provenance)',
    hint: 'Inspecting Devgaon cluster signals: 84 existing tailors (1.75x peer median), 27 recent trainees, 9 median paid days.',
  },
  10: {
    title: 'Beat 10: Officer Decisions & Cohort Allocation',
    hint: 'Officer replaces beginner batch L1 with RPL camp O1, enters justification, and submits cohort brief to Provider Desk.',
  },
  11: {
    title: 'Beat 11: Independent Follow-up Verification (Asha Check-in)',
    hint: 'Asha reports 5 paid days last month. Reaches 20/25 verified trainees. Signal D updates to Weak; Confidence jumps to High. Learning Event triggered.',
  },
  12: {
    title: 'Beat 12: Continuous Evidence Loop Complete',
    hint: 'The complete loop: Voice diagnosis informs allocation; verified outcomes refine local intelligence.',
  },
};

export const StoryBar: React.FC = () => {
  const { state, setBeat, nextBeat, prevBeat } = useAppStore();

  if (!state.storyMode) return null;

  const currentInfo = BEAT_DESCRIPTIONS[state.storyBeat] || { title: `Beat ${state.storyBeat}`, hint: '' };

  return (
    <aside className="bg-surface border-b border-rule shadow-sm px-4 py-2" aria-label="Story Mode Presenter Navigation">
      <div className="max-w-console mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left: Beat Title & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={prevBeat}
              disabled={state.storyBeat <= 1}
              className="p-1 rounded hover:bg-paper disabled:opacity-30 disabled:hover:bg-transparent text-ink"
              title="Previous Beat (ArrowLeft)"
              aria-label="Previous beat"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-2 py-0.5 rounded bg-indigo/10 text-indigo font-bold text-xs tabular-nums">
              Beat {state.storyBeat} of 12
            </div>
            <button
              onClick={nextBeat}
              disabled={state.storyBeat >= 12}
              className="p-1 rounded hover:bg-paper disabled:opacity-30 disabled:hover:bg-transparent text-ink"
              title="Next Beat (ArrowRight)"
              aria-label="Next beat"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-xs font-bold text-ink flex items-center gap-2">
              <span>{currentInfo.title}</span>
              <span className="text-[10px] text-ink-soft font-normal hidden lg:inline">
                (Keyboard: <kbd className="px-1 py-0.2 bg-paper border border-rule rounded">←</kbd> <kbd className="px-1 py-0.2 bg-paper border border-rule rounded">→</kbd> · <kbd className="px-1 py-0.2 bg-paper border border-rule rounded">L</kbd> to re-rank)
              </span>
            </h2>
            <p className="text-[11px] text-ink-soft line-clamp-1">{currentInfo.hint}</p>
          </div>
        </div>

        {/* Right: Stepper Dots */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((beat) => {
            const isCurrent = state.storyBeat === beat;
            const isPast = state.storyBeat > beat;
            return (
              <button
                key={beat}
                onClick={() => setBeat(beat)}
                className={`w-6 h-6 rounded text-[11px] font-semibold flex items-center justify-center transition-all tabular-nums ${
                  isCurrent
                    ? 'bg-marigold text-ink font-bold shadow-sm ring-2 ring-marigold/30'
                    : isPast
                    ? 'bg-indigo/20 text-indigo hover:bg-indigo/30'
                    : 'bg-paper text-ink-soft hover:bg-rule/50'
                }`}
                title={`Jump to Beat ${beat}`}
                aria-label={`Jump to Beat ${beat}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {beat}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
