/**
 * Validation Script for Livelihood Evidence Loop Seed Data
 * Verifies exact numbers required by plan.md and specs:
 * 1. Devgaon own tailoring inputs: 84 existing, 27 trained, 9 median days, 34% verified
 * 2. Locations: 5 Blocks, 20 Clusters
 * 3. Exact 5 personas present and valid
 * 4. Privacy: Zero occurrences of caste, surname, religion, identity number, or full address
 * 5. Opportunity O1 capacity = 20, starts with 19 candidates
 */

import {
  SEED_LOCATIONS,
  SEED_QUALIFICATIONS,
  SEED_PATHWAYS,
  SEED_BENEFICIARIES,
  DEVGAON_OWN_TAILORING_VERDICT,
  DEVGAON_UNIFORM_SHG_VERDICT,
  SEED_OPPORTUNITIES,
  SEED_PLAN_LINES,
  PERSONA_SUNITA,
  PERSONA_RAJU,
  PERSONA_MANOJ,
  PERSONA_KAVITA,
  PERSONA_ASHA,
} from '../src/lib/seed/data.ts';

import { getSunitaSkillEvidence } from '../src/lib/rules/skillEvidence.ts';
import { getSunitaDiagnosis } from '../src/lib/rules/diagnosis.ts';
import { computeCellVerdict } from '../src/lib/rules/verdict.ts';

console.log('====================================================');
console.log('🔍 RUNNING LIVELIHOOD EVIDENCE LOOP VALIDATION SUITE');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// TEST 1: Locations (5 Blocks, 20 Clusters)
const blocks = new Set(SEED_LOCATIONS.map((l) => l.block));
assert(SEED_LOCATIONS.length === 20, `Total clusters count = ${SEED_LOCATIONS.length} (expected 20)`);
assert(blocks.size === 5, `Total blocks count = ${blocks.size} (expected 5)`);

// TEST 2: Devgaon Own Tailoring Exact Inputs
const devVerdict = DEVGAON_OWN_TAILORING_VERDICT;
assert(devVerdict.signals.A.value === 84, `Devgaon Signal A existing workers = ${devVerdict.signals.A.value} (expected 84)`);
assert(devVerdict.signals.B.value === 27, `Devgaon Signal B recent trainees = ${devVerdict.signals.B.value} (expected 27)`);
assert(String(devVerdict.signals.C.value).includes('9'), `Devgaon Signal C median paid days = ${devVerdict.signals.C.value} (expected 9 paid days / mo)`);
assert(String(devVerdict.signals.D.value).includes('34%'), `Devgaon Signal D past outcomes = ${devVerdict.signals.D.value} (expected 34% working)`);
assert(devVerdict.verdict === 'Likely crowded', `Devgaon verdict = ${devVerdict.verdict} (expected 'Likely crowded')`);
assert(devVerdict.confidence === 'Medium', `Devgaon confidence = ${devVerdict.confidence} (expected 'Medium')`);

// TEST 3: The 5 Personas
assert(PERSONA_SUNITA.firstName === 'Sunita' && PERSONA_SUNITA.clusterId === 'devgaon_cluster', 'Persona Sunita verified');
assert(PERSONA_RAJU.firstName === 'Raju' && PERSONA_RAJU.clusterId === 'khairwa_cluster', 'Persona Raju verified');
assert(PERSONA_MANOJ.firstName === 'Manoj' && PERSONA_MANOJ.clusterId === 'tikri_cluster', 'Persona Manoj verified');
assert(PERSONA_KAVITA.firstName === 'Kavita' && PERSONA_KAVITA.clusterId === 'lalpur_cluster', 'Persona Kavita verified');
assert(PERSONA_ASHA.firstName === 'Asha' && PERSONA_ASHA.clusterId === 'devgaon_cluster', 'Persona Asha verified');

// TEST 4: Sunita Skill Evidence & Diagnosis
const sunitaEvidence = getSunitaSkillEvidence();
assert(
  sunitaEvidence.preScreen.coreUnitsEvidenced === 5 && sunitaEvidence.preScreen.coreUnitsCount === 7,
  `Sunita yields ${sunitaEvidence.preScreen.coreUnitsEvidenced} of ${sunitaEvidence.preScreen.coreUnitsCount} core units`
);
assert(sunitaEvidence.preScreen.band === 'Likely ready', `Sunita RPL band = '${sunitaEvidence.preScreen.band}'`);

const sunitaDiag = getSunitaDiagnosis();
assert(
  sunitaDiag.primaryBarrier.toLowerCase().includes('certification') &&
  sunitaDiag.primaryBarrier.toLowerCase().includes('not skill'),
  `Sunita diagnosis: "${sunitaDiag.primaryBarrier}"`
);

// TEST 5: Opportunity Viability & Candidates
const rplOpp = SEED_OPPORTUNITIES.find((o) => o.id === 'opp_rpl_01');
assert(rplOpp && rplOpp.capacity === 20, 'RPL Camp capacity is 20');
assert(rplOpp && rplOpp.candidateIds.length === 19, `RPL Camp starts with 19 candidates (${rplOpp.candidateIds.length}/20)`);

// TEST 6: Strict Privacy Check
let privacyViolations = 0;
for (const b of SEED_BENEFICIARIES) {
  if ('surname' in b || 'caste' in b || 'religion' in b || 'aadhaar' in b || 'address' in b) {
    privacyViolations++;
  }
}
assert(privacyViolations === 0, `Zero privacy violations across ${SEED_BENEFICIARIES.length} beneficiaries`);

console.log('\n====================================================');
console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL FOUNDATION REQUIREMENTS VERIFIED SUCCESSFULLY!');
}
