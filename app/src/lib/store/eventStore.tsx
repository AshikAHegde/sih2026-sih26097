import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Role,
  AuditEvent,
  Beneficiary,
  Opportunity,
  PlanLine,
  OutcomeRecord,
  RankedOption
} from '@/types';
import {
  SEED_LOCATIONS,
  SEED_BENEFICIARIES,
  SEED_OPPORTUNITIES,
  SEED_PLAN_LINES,
  SEED_OUTCOMES,
  PERSONA_SUNITA,
  PERSONA_ASHA,
} from '@/lib/seed/data';
import { rankPathwaysForSunita } from '@/lib/rules/pathways';
import { checkOpportunityViability, evaluatePlanLineFlags } from '@/lib/rules/allocation';
import { verifyOutcomes, OutcomeVerificationSummary } from '@/lib/rules/outcomes';

export interface AppState {
  currentRole: Role;
  storyMode: boolean;
  storyBeat: number; // 1 to 12

  // Beneficiary (Sunita) Flow State
  sunita: Beneficiary;
  sunitaStep: 'V0' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8' | 'V9';
  audioPlaying: boolean;
  audioSpeed: 1 | 1.5;
  factsRevealed: number; // 0 to 5
  withLocalEvidence: boolean; // Local evidence toggle ('L' key)
  rankedOptions: RankedOption[];
  chosenOptionId: string | null;

  // The WOW Moment state
  wowAnimationTriggered: boolean;
  wowAnimationComplete: boolean;

  // Planning & Interventions
  opportunities: Opportunity[];
  planLines: PlanLine[];

  // Outcomes & Asha Verification
  outcomes: OutcomeRecord[];
  ashaCheckInCompleted: boolean;
  outcomeSummary: OutcomeVerificationSummary;

  // Event Log
  eventLog: AuditEvent[];

  // Drawer / UI Inspect state
  inspectClusterId: string | null;
  inspectPathwayId: string | null;
}

interface StoreContextType {
  state: AppState;
  setRole: (role: Role) => void;
  setStoryMode: (active: boolean) => void;
  nextBeat: () => void;
  prevBeat: () => void;
  setBeat: (beat: number) => void;
  setSunitaStep: (step: AppState['sunitaStep']) => void;
  toggleLocalEvidence: () => void;
  choosePathway: (pathwayId: string) => void;
  triggerWowAnimation: () => void;
  completeWowAnimation: () => void;
  replacePlanLine: (lineId: string, replaceWithOppId: string, reason: string) => void;
  submitAshaCheckIn: () => void;
  setInspectCell: (clusterId: string | null, pathwayId: string | null) => void;
  resetDemo: () => void;
  appendEvent: (action: string, objectId?: string, details?: Record<string, unknown>, reason?: string) => void;
}

const initialOpportunities = JSON.parse(JSON.stringify(SEED_OPPORTUNITIES));
const initialPlanLines = JSON.parse(JSON.stringify(SEED_PLAN_LINES));
const initialOutcomes = JSON.parse(JSON.stringify(SEED_OUTCOMES));

const defaultState: AppState = {
  currentRole: 'officer',
  storyMode: true,
  storyBeat: 1,

  sunita: JSON.parse(JSON.stringify(PERSONA_SUNITA)),
  sunitaStep: 'V1',
  audioPlaying: false,
  audioSpeed: 1.5,
  factsRevealed: 0,
  withLocalEvidence: false,
  rankedOptions: rankPathwaysForSunita(false),
  chosenOptionId: null,

  wowAnimationTriggered: false,
  wowAnimationComplete: false,

  opportunities: initialOpportunities,
  planLines: initialPlanLines,

  outcomes: initialOutcomes,
  ashaCheckInCompleted: false,
  outcomeSummary: verifyOutcomes(initialOutcomes),

  eventLog: [
    {
      id: 'evt_init',
      timestamp: '2026-10-02T10:00:00Z',
      role: 'system',
      action: 'INITIALIZE_SIMULATED_DISTRICT',
      details: { district: 'Chandauli (Simulated)', clusters: 20, seedCount: 600 },
    },
  ],

  inspectClusterId: 'devgaon_cluster',
  inspectPathwayId: 'tailor_own',
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const appendEvent = (
    action: string,
    objectId?: string,
    details?: Record<string, unknown>,
    reason?: string
  ) => {
    const newEvent: AuditEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      role: state.currentRole,
      action,
      objectId,
      details,
      reason,
    };
    setState((prev) => ({
      ...prev,
      eventLog: [newEvent, ...prev.eventLog],
    }));
  };

  const setRole = (role: Role) => {
    appendEvent('SWITCH_ROLE', role, { from: state.currentRole, to: role });
    setState((prev) => ({ ...prev, currentRole: role }));
  };

  const setStoryMode = (active: boolean) => {
    appendEvent('TOGGLE_STORY_MODE', active ? 'ENABLED' : 'DISABLED');
    setState((prev) => ({ ...prev, storyMode: active }));
  };

  const setBeat = (beat: number) => {
    if (beat < 1 || beat > 12) return;
    appendEvent('GOTO_STORY_BEAT', `Beat_${beat}`);

    setState((prev) => {
      let role = prev.currentRole;
      let sunitaStep = prev.sunitaStep;
      let withLocalEvidence = prev.withLocalEvidence;
      let chosenOptionId = prev.chosenOptionId;
      let inspectClusterId = prev.inspectClusterId;

      // Scripted beat mappings (from demo_script_spec.md)
      if (beat === 1) {
        role = 'officer';
      } else if (beat >= 2 && beat <= 7) {
        role = 'beneficiary';
        if (beat === 2) sunitaStep = 'V2';
        if (beat === 3) sunitaStep = 'V4';
        if (beat === 4) sunitaStep = 'V4';
        if (beat === 5) {
          sunitaStep = 'V5';
          withLocalEvidence = false;
        }
        if (beat === 6) {
          sunitaStep = 'V5';
          withLocalEvidence = true;
        }
        if (beat === 7) {
          sunitaStep = 'V6';
          chosenOptionId = 'tailor_uniform_shg';
        }
      } else if (beat === 8) {
        // WOW moment split screen or officer map
        role = 'officer';
      } else if (beat === 9) {
        role = 'officer';
        inspectClusterId = 'devgaon_cluster';
      } else if (beat === 10) {
        role = 'officer';
      } else if (beat === 11) {
        role = 'officer';
      } else if (beat === 12) {
        role = 'officer';
      }

      return {
        ...prev,
        storyBeat: beat,
        currentRole: role,
        sunitaStep,
        withLocalEvidence,
        rankedOptions: rankPathwaysForSunita(withLocalEvidence),
        chosenOptionId,
        inspectClusterId,
      };
    });
  };

  const nextBeat = () => setBeat(state.storyBeat + 1);
  const prevBeat = () => setBeat(state.storyBeat - 1);

  const setSunitaStep = (step: AppState['sunitaStep']) => {
    appendEvent('STEP_BENEFICIARY_FLOW', step);
    setState((prev) => ({ ...prev, sunitaStep: step }));
  };

  const toggleLocalEvidence = () => {
    const nextVal = !state.withLocalEvidence;
    appendEvent('TOGGLE_LOCAL_EVIDENCE', nextVal ? 'WITH_PLACE' : 'PERSON_ONLY');
    setState((prev) => ({
      ...prev,
      withLocalEvidence: nextVal,
      rankedOptions: rankPathwaysForSunita(nextVal),
    }));
  };

  const choosePathway = (pathwayId: string) => {
    appendEvent('BENEFICIARY_CHOICE_CONFIRMED', pathwayId, { beneficiaryId: state.sunita.id });
    setState((prev) => ({
      ...prev,
      chosenOptionId: pathwayId,
      sunitaStep: 'V6',
    }));
  };

  const triggerWowAnimation = () => {
    appendEvent('TRIGGER_WOW_SEQUENCE', 'SUNITA_TO_DEVGAON');
    setState((prev) => ({
      ...prev,
      wowAnimationTriggered: true,
    }));
  };

  const completeWowAnimation = () => {
    // When dot lands on cluster tile:
    // 1. RPL camp reaches 20 candidates and flips to 'Suggested'
    // 2. Plan Line L1 flags for hold/replace
    appendEvent('DOT_LANDED_CLUSTER', 'devgaon_cluster', { newCandidateCount: 20 });

    setState((prev) => {
      const updatedOpps = prev.opportunities.map((opp) => {
        if (opp.id === 'opp_rpl_01') {
          return {
            ...opp,
            candidateIds: [...opp.candidateIds, prev.sunita.id],
            status: 'Suggested' as const,
          };
        }
        return opp;
      });

      const updatedPlans = prev.planLines.map((line) => {
        if (line.id === 'L1') {
          return {
            ...line,
            status: 'Hold suggested' as const,
            flagReason: 'Hold suggested. Likely crowded in Devgaon cluster (84 workers, 9 median days). Recommend replacing with RPL Camp.',
          };
        }
        return line;
      });

      return {
        ...prev,
        wowAnimationComplete: true,
        opportunities: updatedOpps,
        planLines: updatedPlans,
      };
    });
  };

  const replacePlanLine = (lineId: string, replaceWithOppId: string, reason: string) => {
    appendEvent('OFFICER_REPLACE_PLAN_LINE', lineId, { replaceWith: replaceWithOppId }, reason);

    setState((prev) => {
      const updatedPlans = prev.planLines.map((line) => {
        if (line.id === lineId) {
          return {
            ...line,
            status: 'Replaced' as const,
            replacedByOpportunityId: replaceWithOppId,
            officerReason: reason,
          };
        }
        return line;
      });

      return {
        ...prev,
        planLines: updatedPlans,
      };
    });
  };

  const submitAshaCheckIn = () => {
    appendEvent('SUBMIT_VERIFIED_CHECK_IN', PERSONA_ASHA.id, {
      paidDays: 5,
      monthlyEarnings: 1400,
    });

    setState((prev) => {
      const newOutcomeSummary = verifyOutcomes(prev.outcomes, {
        paidDaysLastMonth: 5,
        monthlyEarnings: 1400,
      });

      return {
        ...prev,
        ashaCheckInCompleted: true,
        outcomeSummary: newOutcomeSummary,
      };
    });
  };

  const setInspectCell = (clusterId: string | null, pathwayId: string | null) => {
    appendEvent('INSPECT_CELL', `${clusterId}_${pathwayId}`);
    setState((prev) => ({
      ...prev,
      inspectClusterId: clusterId,
      inspectPathwayId: pathwayId,
    }));
  };

  const resetDemo = () => {
    setState({
      ...defaultState,
      opportunities: JSON.parse(JSON.stringify(SEED_OPPORTUNITIES)),
      planLines: JSON.parse(JSON.stringify(SEED_PLAN_LINES)),
      outcomes: JSON.parse(JSON.stringify(SEED_OUTCOMES)),
      eventLog: [
        {
          id: `evt_reset_${Date.now()}`,
          timestamp: new Date().toISOString(),
          role: 'system',
          action: 'RESET_DEMO_STATE',
        },
      ],
    });
  };

  // Keyboard navigation for Story Mode (Arrow keys & 'L' key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextBeat();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevBeat();
      } else if (e.key === 'l' || e.key === 'L') {
        toggleLocalEvidence();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.storyBeat, state.withLocalEvidence]);

  return (
    <StoreContext.Provider
      value={{
        state,
        setRole,
        setStoryMode,
        nextBeat,
        prevBeat,
        setBeat,
        setSunitaStep,
        toggleLocalEvidence,
        choosePathway,
        triggerWowAnimation,
        completeWowAnimation,
        replacePlanLine,
        submitAshaCheckIn,
        setInspectCell,
        resetDemo,
        appendEvent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within StoreProvider');
  }
  return context;
};
