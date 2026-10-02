import type { SignalReading, CellVerdict, ProvenanceKind } from '../../types/index.ts';
import { DEVGAON_OWN_TAILORING_VERDICT, DEVGAON_UNIFORM_SHG_VERDICT } from '../seed/data.ts';

/**
 * Module 4: Signals A-F per Cell (Place x Pathway)
 * Computes deterministic signal readings with provenance and votes.
 */
export function getCellSignals(clusterId: string, pathwayId: string): Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F', SignalReading> {
  if (clusterId === 'devgaon_cluster' && pathwayId === 'tailor_own') {
    return DEVGAON_OWN_TAILORING_VERDICT.signals;
  }
  if (clusterId === 'devgaon_cluster' && pathwayId === 'tailor_uniform_shg') {
    return DEVGAON_UNIFORM_SHG_VERDICT.signals;
  }

  // Generic fallback cell generator based on simulated rules
  return {
    A: {
      signalId: 'A',
      name: 'Existing Workers',
      value: 36,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 36,
      provenance: 'Official record',
      explanation: '36 active workers counted in cluster survey.',
    },
    B: {
      signalId: 'B',
      name: 'Recent Entrants',
      value: 12,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 12,
      provenance: 'Official record',
      explanation: '12 persons trained in the past 24 months.',
    },
    C: {
      signalId: 'C',
      name: 'Current Workload',
      value: '16 paid days / mo',
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 14,
      provenance: 'Verified',
      explanation: 'Median paid days: 16/month among active workers.',
    },
    D: {
      signalId: 'D',
      name: 'Past Outcomes',
      value: '52% working',
      readingWord: 'Neutral',
      vote: 'uncertain',
      sampleSize: 16,
      provenance: 'Verified',
      explanation: '52% of past trainees verified actively earning.',
    },
    E: {
      signalId: 'E',
      name: 'Funded Demand',
      value: 0,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 0,
      provenance: 'Official record',
      explanation: 'No open government purchase orders.',
    },
    F: {
      signalId: 'F',
      name: 'Our Callers',
      value: 6,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 6,
      provenance: 'Self-reported',
      explanation: '6 callers on waitlist (context only, no voting power).',
    },
  };
}
