import React from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { CheckCircle2, Clock, Calendar, UserCheck, AlertCircle } from 'lucide-react';
import { PERSONA_SUNITA, PERSONA_ASHA } from '@/lib/seed/data.ts';

export const HelperView: React.FC = () => {
  const { state, submitAshaCheckIn } = useAppStore();

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      {/* Mobile Header */}
      <div className="bg-surface p-4 rounded-2xl border border-rule shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-ink">Field Helper Desk</span>
          <span className="text-[10px] bg-indigo/10 text-indigo font-bold px-2 py-0.5 rounded">
            Devgaon Cluster
          </span>
        </div>
        <h1 className="text-base font-bold text-ink">Today's Field Tasks</h1>
        <p className="text-2xs text-ink-soft">Ramesh K. · 2 Follow-ups Scheduled Today</p>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {/* Task 1: Asha Follow-up */}
        <div className="bg-surface p-4 rounded-xl border border-rule space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h2 className="text-xs font-bold text-ink">30-Day Trainee Check-in</h2>
              </div>
              <p className="text-xs font-semibold text-indigo mt-0.5">{PERSONA_ASHA.firstName} {PERSONA_ASHA.initial}.</p>
              <span className="text-2xs text-ink-soft">{PERSONA_ASHA.villageName}</span>
            </div>
            <span className="text-2xs font-mono bg-paper px-2 py-0.5 rounded border border-rule">
              Due Today
            </span>
          </div>

          <div className="p-2.5 bg-paper rounded-lg border border-rule text-2xs space-y-1 text-ink-soft">
            <div>Training: 3-month Self Employed Tailor</div>
            <div>Questions: Paid days last month, monthly earnings, machine status</div>
          </div>

          <button
            onClick={submitAshaCheckIn}
            disabled={state.ashaCheckInCompleted}
            className={`w-full min-h-[48px] rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              state.ashaCheckInCompleted
                ? 'bg-room text-white cursor-default'
                : 'bg-indigo text-white hover:bg-indigo/90 shadow-sm'
            }`}
          >
            {state.ashaCheckInCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Check-in Completed (5 Days Reported)
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" /> Log Asha's In-Person Check-in
              </>
            )}
          </button>
        </div>

        {/* Task 2: Sunita Identity Card Delivery */}
        <div className="bg-surface p-4 rounded-xl border border-rule space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-room" />
                <h2 className="text-xs font-bold text-ink">Deliver RPL Assessment Slip</h2>
              </div>
              <p className="text-xs font-semibold text-indigo mt-0.5">{PERSONA_SUNITA.firstName} {PERSONA_SUNITA.initial}.</p>
              <span className="text-2xs text-ink-soft">{PERSONA_SUNITA.villageName}</span>
            </div>
            <span className="text-2xs font-mono bg-paper px-2 py-0.5 rounded border border-rule">
              Nov 2, 2026
            </span>
          </div>

          <p className="text-2xs text-ink-soft">
            Deliver admission token for 2-day RPL Camp (AMH/Q1947) at Devgaon Community Centre.
          </p>
        </div>
      </div>
    </div>
  );
};
