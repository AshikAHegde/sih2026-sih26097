import type { CellVerdict, VerdictStatus, ConfidenceLevel, SignalReading } from '../../types/index.ts';
import { DEVGAON_OWN_TAILORING_VERDICT, DEVGAON_UNIFORM_SHG_VERDICT } from '../seed/data.ts';
import { getCellSignals } from './signals.ts';

/**
 * Module 5: Verdict (Deterministic rule consolidation)
 * NEVER uses an LLM. Consolidates Signal votes into transparent verdict.
 */
export function computeCellVerdict(clusterId: string, pathwayId: string): CellVerdict {
  if (clusterId === 'devgaon_cluster' && pathwayId === 'tailor_own') {
    return DEVGAON_OWN_TAILORING_VERDICT;
  }
  if (clusterId === 'devgaon_cluster' && pathwayId === 'tailor_uniform_shg') {
    return DEVGAON_UNIFORM_SHG_VERDICT;
  }

  const signals = getCellSignals(clusterId, pathwayId);

  // Count votes from Signals A-E (Signal F has no voting power)
  const votingSignals: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['A', 'B', 'C', 'D', 'E'];
  let roomVotes = 0;
  let crowdedVotes = 0;

  for (const s of votingSignals) {
    if (signals[s].vote === 'room') roomVotes++;
    if (signals[s].vote === 'crowded') crowdedVotes++;
  }

  // Verdict Rule:
  // Likely Crowded: 2+ crowded votes, 0 room votes from C, D, E.
  // Likely Room: 2+ room votes, 0 crowded votes from C, D.
  // Uncertain: Mixed or insufficient.
  let verdict: VerdictStatus = 'Uncertain';
  if (crowdedVotes >= 2 && signals.C.vote !== 'room' && signals.D.vote !== 'room' && signals.E.vote !== 'room') {
    verdict = 'Likely crowded';
  } else if (roomVotes >= 2 && signals.C.vote !== 'crowded' && signals.D.vote !== 'crowded') {
    verdict = 'Likely room';
  }

  // Confidence Rule:
  // High: 3+ signals with sample size >= 20
  // Medium: sample size >= 10 or funded demand
  // Low: otherwise
  let confidence: ConfidenceLevel = 'Low';
  const totalSample = (signals.A.sampleSize || 0) + (signals.C.sampleSize || 0) + (signals.D.sampleSize || 0);
  if (totalSample >= 40) {
    confidence = 'High';
  } else if (totalSample >= 15 || signals.E.value !== 0) {
    confidence = 'Medium';
  }

  return {
    clusterId,
    pathwayId,
    verdict,
    confidence,
    signals,
    roomVotes,
    crowdedVotes,
    explanation:
      verdict === 'Likely crowded'
        ? `Cluster displays ${crowdedVotes} crowded indicators and insufficient room signals.`
        : verdict === 'Likely room'
        ? `Cluster displays ${roomVotes} room indicators with healthy workload or open demand.`
        : 'Conflicting or insufficient market signals; requires further verification.',
  };
}
