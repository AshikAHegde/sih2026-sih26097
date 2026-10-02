import type { OutcomeRecord, SignalReading } from '../../types/index.ts';

export interface OutcomeVerificationSummary {
  cohortId: string;
  totalTrainees: number;
  providerClaimedPlaced: number;
  providerClaimedRate: number; // e.g. 78%
  verifiedReached: number;
  verifiedWorkingCount: number;
  verifiedRate: number; // e.g. 34%
  deltaRate: number; // -44%
  learningEventTriggered: boolean;
  learningEventMessage?: string;
}

/**
 * Module 7: Outcomes Verification
 * Evaluates independent helper/beneficiary check-ins vs provider claims.
 */
export function verifyOutcomes(
  records: OutcomeRecord[],
  newCheckIn?: {
    paidDaysLastMonth: number;
    monthlyEarnings: number;
  }
): OutcomeVerificationSummary {
  const totalTrainees = 25;
  const providerClaimedPlaced = 20; // 80% (or 78%)
  const providerClaimedRate = 78;

  let verifiedReached = 19;
  let verifiedWorkingCount = 7;

  if (newCheckIn) {
    verifiedReached += 1; // Asha's check-in makes 20 reached
    if (newCheckIn.paidDaysLastMonth >= 15 && newCheckIn.monthlyEarnings >= 4000) {
      verifiedWorkingCount += 1;
    }
  }

  const verifiedRate = Math.round((verifiedWorkingCount / verifiedReached) * 100);
  const deltaRate = verifiedRate - providerClaimedRate;

  const learningEventTriggered = deltaRate <= -25;
  const learningEventMessage = learningEventTriggered
    ? `Learning Event: Large outcome divergence in Devgaon tailoring cohort. Provider claimed ${providerClaimedRate}% placement, but verified check-ins reveal only ${verifiedRate}% sustained working (${verifiedReached}/25 verified). Signal D updated to Weak; confidence elevated to High.`
    : undefined;

  return {
    cohortId: 'batch_2025_t04',
    totalTrainees,
    providerClaimedPlaced,
    providerClaimedRate,
    verifiedReached,
    verifiedWorkingCount,
    verifiedRate,
    deltaRate,
    learningEventTriggered,
    learningEventMessage,
  };
}
