import type { Opportunity, PlanLine } from '../../types/index.ts';

/**
 * Module 6: Allocation & Batch Viability Rules
 * Groups people by level and calculates viability against strict thresholds.
 */
export function checkOpportunityViability(
  opp: Opportunity,
  candidateCount: number
): {
  isViable: boolean;
  newStatus: 'Forming' | 'Suggested';
  percentage: number;
} {
  const percentage = Math.min(100, Math.round((candidateCount / opp.capacity) * 100));
  const isViable = candidateCount >= opp.capacity;

  return {
    isViable,
    newStatus: isViable ? 'Suggested' : 'Forming',
    percentage,
  };
}

/**
 * Flags planned lines when local evidence signals crowding
 */
export function evaluatePlanLineFlags(
  line: PlanLine,
  isCrowded: boolean
): {
  shouldFlag: boolean;
  flagReason?: string;
} {
  if (line.type === 'Beginner Batch' && isCrowded) {
    return {
      shouldFlag: true,
      flagReason: 'Hold suggested. Likely crowded in Devgaon cluster (84 workers, 9 median days). Recommend replacing with RPL Camp.',
    };
  }
  return { shouldFlag: false };
}
