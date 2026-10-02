import type { SkillEvidenceItem, PreScreenResult, Qualification } from '../../types/index.ts';
import { SEED_QUALIFICATIONS } from '../seed/data.ts';

/**
 * Module 1: Skill Evidence (STRICT: Deterministic, no LLM decision-making)
 * Maps quoted facts to qualification skill units and computes RPL pre-screen band.
 */
export function evaluateSkillEvidence(
  qualificationCode: string,
  evidencedUnits: Array<{ unitCode: string; level: 0 | 1 | 2 | 3 | 4; quote: string; specifics: string }>
): {
  evidenceList: SkillEvidenceItem[];
  preScreen: PreScreenResult;
} {
  const qualification = SEED_QUALIFICATIONS.find((q) => q.code === qualificationCode);
  if (!qualification) {
    throw new Error(`Qualification ${qualificationCode} not found in official catalog.`);
  }

  const evidenceMap = new Map(evidencedUnits.map((item) => [item.unitCode, item]));

  const evidenceList: SkillEvidenceItem[] = qualification.units.map((unit) => {
    const found = evidenceMap.get(unit.code);
    if (found) {
      return {
        unitCode: unit.code,
        unitTitle: unit.title,
        level: found.level,
        quote: found.quote,
        specifics: found.specifics,
      };
    }
    return {
      unitCode: unit.code,
      unitTitle: unit.title,
      level: 0,
      quote: undefined,
      specifics: 'Not evidenced in conversation',
    };
  });

  const coreUnits = qualification.units.filter((u) => u.core);
  const coreUnitsCount = coreUnits.length;

  // Evidenced if level >= 2 (Evidence-supported, Corroborated, or Assessed)
  const coreUnitsEvidenced = coreUnits.filter((u) => {
    const ev = evidenceList.find((item) => item.unitCode === u.code);
    return ev && ev.level >= 2;
  }).length;

  const percentage = Math.round((coreUnitsEvidenced / coreUnitsCount) * 100);

  let band: 'Likely ready' | 'Partly ready' | 'Not yet' = 'Not yet';
  let explanation = '';

  if (percentage >= 70) {
    band = 'Likely ready';
    explanation = `${coreUnitsEvidenced} of ${coreUnitsCount} core units evidenced (${percentage}%). Candidate demonstrates strong prior experience suitable for immediate RPL assessment.`;
  } else if (percentage >= 40) {
    band = 'Partly ready';
    explanation = `${coreUnitsEvidenced} of ${coreUnitsCount} core units evidenced (${percentage}%). Requires bridge module before final certification assessment.`;
  } else {
    band = 'Not yet';
    explanation = `Only ${coreUnitsEvidenced} of ${coreUnitsCount} core units evidenced (${percentage}%). Full foundational training course recommended.`;
  }

  return {
    evidenceList,
    preScreen: {
      qualificationCode: qualification.code,
      qualificationTitle: qualification.title,
      coreUnitsCount,
      coreUnitsEvidenced,
      percentage,
      band,
      explanation,
    },
  };
}

/**
 * Sunita's specific evidence extractor helper:
 * In demo beat 3: Sunita yields 5 of 7 core units (Likely ready)
 */
export function getSunitaSkillEvidence() {
  return evaluateSkillEvidence('AMH/Q1947', [
    {
      unitCode: 'AMH/N1947-1',
      level: 2,
      quote: '"I measure with inch-tape and take chest, waist, and length before cutting."',
      specifics: 'Measurements and garment sizing for blouse and salwar suits',
    },
    {
      unitCode: 'AMH/N1947-2',
      level: 2,
      quote: '"I fold the cloth, mark margin with white chalk, and cut with heavy shears."',
      specifics: 'Pattern cutting and seam allowance drafting',
    },
    {
      unitCode: 'AMH/N1947-3',
      level: 3,
      quote: '"I have stitched on my black Usha machine for 7 years every single week."',
      specifics: '7 years regular sewing machine operation & component assembly',
    },
    {
      unitCode: 'AMH/N1947-4',
      level: 2,
      quote: '"After stitching, I hem edges, press with coal iron, and check for loose threads."',
      specifics: 'Finishing, hem stitch, pressing, visual inspection',
    },
    {
      unitCode: 'AMH/N1947-5',
      level: 2,
      quote: '"Neighbours bring dresses that are tight or loose, and I open the side seam to fix."',
      specifics: 'Alterations and bespoke fitting adjustments',
    },
  ]);
}
