import type {
  Location,
  Qualification,
  Pathway,
  Beneficiary,
  CellVerdict,
  Opportunity,
  PlanLine,
  OutcomeRecord
} from '../../types/index.ts';

// ==========================================
// 1. LOCATIONS (5 Blocks, 20 Clusters)
// ==========================================
export const SEED_LOCATIONS: Location[] = [
  // Block 1: Devgaon
  { id: 'devgaon_cluster', name: 'Devgaon', block: 'Devgaon', type: 'peri-urban', households: 3400, tileCol: 2, tileRow: 2 },
  { id: 'khairwa_cluster', name: 'Khairwa', block: 'Devgaon', type: 'rural', households: 1850, tileCol: 2, tileRow: 3 },
  { id: 'tikri_cluster', name: 'Tikri', block: 'Devgaon', type: 'rural', households: 1420, tileCol: 3, tileRow: 2 },
  { id: 'nadipaar_cluster', name: 'Nadi Paar', block: 'Devgaon', type: 'peri-urban', households: 2800, tileCol: 1, tileRow: 2 },

  // Block 2: Lalpur
  { id: 'lalpur_cluster', name: 'Lalpur', block: 'Lalpur', type: 'rural', households: 1980, tileCol: 3, tileRow: 3 },
  { id: 'sarai_cluster', name: 'Sarai', block: 'Lalpur', type: 'rural', households: 1650, tileCol: 4, tileRow: 3 },
  { id: 'bhatoli_cluster', name: 'Bhatoli', block: 'Lalpur', type: 'rural', households: 1200, tileCol: 3, tileRow: 4 },
  { id: 'belwa_cluster', name: 'Belwa', block: 'Lalpur', type: 'rural', households: 1540, tileCol: 4, tileRow: 4 },

  // Block 3: Chandauli Central
  { id: 'chandauli_town', name: 'Chandauli Khas', block: 'Chandauli Central', type: 'peri-urban', households: 5200, tileCol: 2, tileRow: 1 },
  { id: 'jasuri_cluster', name: 'Jasuri', block: 'Chandauli Central', type: 'rural', households: 1720, tileCol: 3, tileRow: 1 },
  { id: 'karanpura_cluster', name: 'Karanpura', block: 'Chandauli Central', type: 'rural', households: 1390, tileCol: 1, tileRow: 1 },
  { id: 'mahuji_cluster', name: 'Mahuji', block: 'Chandauli Central', type: 'rural', households: 1450, tileCol: 2, tileRow: 0 },

  // Block 4: Sakaldiha
  { id: 'sakaldiha_cluster', name: 'Sakaldiha', block: 'Sakaldiha', type: 'peri-urban', households: 3100, tileCol: 0, tileRow: 2 },
  { id: 'amra_cluster', name: 'Amra', block: 'Sakaldiha', type: 'rural', households: 1600, tileCol: 0, tileRow: 3 },
  { id: 'tanda_cluster', name: 'Tanda Kalan', block: 'Sakaldiha', type: 'rural', households: 1800, tileCol: 0, tileRow: 1 },
  { id: 'pippal_cluster', name: 'Pippal Gaon', block: 'Sakaldiha', type: 'rural', households: 1310, tileCol: 0, tileRow: 0 },

  // Block 5: Naugarh
  { id: 'naugarh_cluster', name: 'Naugarh', block: 'Naugarh', type: 'rural', households: 2400, tileCol: 1, tileRow: 4 },
  { id: 'majhaigaon_cluster', name: 'Majhai Gaon', block: 'Naugarh', type: 'rural', households: 1150, tileCol: 2, tileRow: 4 },
  { id: 'chakiya_cluster', name: 'Chakiya Morh', block: 'Naugarh', type: 'rural', households: 1420, tileCol: 1, tileRow: 3 },
  { id: 'dhus_cluster', name: 'Dhus', block: 'Naugarh', type: 'rural', households: 980, tileCol: 0, tileRow: 4 },
];

// ==========================================
// 2. QUALIFICATIONS (Real NQR Standards Only)
// ==========================================
export const SEED_QUALIFICATIONS: Qualification[] = [
  {
    code: 'AMH/Q1947',
    title: 'Self Employed Tailor',
    nsqfLevel: 4,
    sector: 'Apparel, Made-Ups & Home Furnishing',
    units: [
      { code: 'AMH/N1947-1', title: 'Take body measurements and sketch designs', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Measurements', 'Design sketch'] },
      { code: 'AMH/N1947-2', title: 'Draft patterns and cut fabric accurately', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Drafting', 'Pattern cutting'] },
      { code: 'AMH/N1947-3', title: 'Operate sewing machine and attach components', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Machine stitch', 'Assembly'] },
      { code: 'AMH/N1947-4', title: 'Perform finishing, pressing and inspection', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Finishing', 'Ironing', 'Quality check'] },
      { code: 'AMH/N1947-5', title: 'Alter and repair garments to client fit', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Alteration', 'Fit correction'] },
      { code: 'AMH/N1947-6', title: 'Cost estimation and maintain client accounts', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Costing', 'Record keeping'] },
      { code: 'AMH/N1947-7', title: 'Maintain health, safety and clean work area', standardCode: 'AMH/Q1947', nsqfLevel: 4, core: true, tasks: ['Workplace safety', 'Hygiene'] },
    ],
  },
  {
    code: 'CON/Q0103',
    title: 'Assistant Mason',
    nsqfLevel: 2,
    sector: 'Construction',
    units: [
      { code: 'CON/N0103-1', title: 'Erect and dismantle basic staging/scaffolding', standardCode: 'CON/Q0103', nsqfLevel: 2, core: true, tasks: ['Scaffold assist'] },
      { code: 'CON/N0103-2', title: 'Prepare mortar and concrete mixes by hand/machine', standardCode: 'CON/Q0103', nsqfLevel: 2, core: true, tasks: ['Mortar mixing'] },
      { code: 'CON/N0103-3', title: 'Lay bricks and hollow blocks in simple masonry', standardCode: 'CON/Q0103', nsqfLevel: 2, core: true, tasks: ['Brick laying'] },
      { code: 'CON/N0103-4', title: 'Plaster surfaces under supervision', standardCode: 'CON/Q0103', nsqfLevel: 2, core: true, tasks: ['Plastering'] },
      { code: 'CON/N0103-5', title: 'Adhere to site safety norms', standardCode: 'CON/Q0103', nsqfLevel: 2, core: false, tasks: ['Safety gear'] },
    ],
  },
  {
    code: 'ASC/Q1411',
    title: 'Two-Wheeler Service Technician',
    nsqfLevel: 4,
    sector: 'Automotive',
    units: [
      { code: 'ASC/N1411-1', title: 'Perform routine service and engine tune-up', standardCode: 'ASC/Q1411', nsqfLevel: 4, core: true, tasks: ['Oil change', 'Filter cleaning'] },
      { code: 'ASC/N1411-2', title: 'Overhaul braking and suspension systems', standardCode: 'ASC/Q1411', nsqfLevel: 4, core: true, tasks: ['Brakes', 'Shockers'] },
      { code: 'ASC/N1411-3', title: 'Diagnose electrical wiring and battery faults', standardCode: 'ASC/Q1411', nsqfLevel: 4, core: true, tasks: ['Battery', 'Wiring'] },
      { code: 'ASC/N1411-4', title: 'Customer greeting and job card creation', standardCode: 'ASC/Q1411', nsqfLevel: 4, core: true, tasks: ['Job card'] },
    ],
  },
];

// ==========================================
// 3. PATHWAYS / OCCUPATIONS
// ==========================================
export const SEED_PATHWAYS: Pathway[] = [
  {
    id: 'tailor_own',
    name: 'Home-based tailoring / repair',
    sector: 'Apparel',
    type: 'self-employment',
    marketScope: 'local',
    costBand: 'free',
    timeToFirstIncomeDays: 7,
    qualificationCode: 'AMH/Q1947',
  },
  {
    id: 'tailor_uniform_shg',
    name: 'School uniform cluster / SHG order group',
    sector: 'Apparel',
    type: 'group-enterprise',
    marketScope: 'cluster',
    costBand: 'free',
    timeToFirstIncomeDays: 20,
    qualificationCode: 'AMH/Q1947',
  },
  {
    id: 'tailor_factory_operator',
    name: 'Industrial sewing machine operator',
    sector: 'Apparel',
    type: 'wage',
    marketScope: 'district',
    costBand: 'stipend',
    timeToFirstIncomeDays: 45,
    qualificationCode: 'AMH/Q1947',
  },
  {
    id: 'mason_rpl_bridge',
    name: 'Certified Mason (Housing & Public Works)',
    sector: 'Construction',
    type: 'self-employment',
    marketScope: 'cluster',
    costBand: 'free',
    timeToFirstIncomeDays: 14,
    qualificationCode: 'CON/Q0103',
  },
  {
    id: 'two_wheeler_mechanic',
    name: 'Two-Wheeler Service & Repair Shop',
    sector: 'Automotive',
    type: 'self-employment',
    marketScope: 'local',
    costBand: 'subsidized',
    timeToFirstIncomeDays: 30,
    qualificationCode: 'ASC/Q1411',
  },
];

// ==========================================
// 4. THE 5 CORE DEMO PERSONAS
// ==========================================
export const PERSONA_SUNITA: Beneficiary = {
  id: 'ben_sunita_01',
  firstName: 'Sunita',
  initial: 'D',
  ageBand: '25-34',
  gender: 'female',
  clusterId: 'devgaon_cluster',
  villageName: 'Devgaon North',
  maskedPhone: 'XXXXX-98214',
  language: 'hi',
  archetypeId: 1, // Experienced home tailor, no cert
  consent: {
    recording: true,
    planningUse: true,
    followUp: true,
  },
  statedSkills: ['Stitching blouse, suit, fall-pico', '7 years home stitching on Usha machine', 'Cuts patterns with chalk'],
  yearsExperience: 7,
  hardLimits: {
    maxTravelMinutes: 30,
    hoursPerDay: 5,
  },
};

export const PERSONA_RAJU: Beneficiary = {
  id: 'ben_raju_02',
  firstName: 'Raju',
  initial: 'K',
  ageBand: '25-34',
  gender: 'male',
  clusterId: 'khairwa_cluster',
  villageName: 'Khairwa Dehat',
  maskedPhone: 'XXXXX-45190',
  language: 'bho',
  archetypeId: 7, // Seasonal migrant on building sites
  consent: {
    recording: true,
    planningUse: true,
    followUp: true,
  },
  statedSkills: ['5 years brick laying, plaster', 'Travels to Lucknow 6 months/yr'],
  yearsExperience: 5,
  hardLimits: {
    maxTravelMinutes: 45,
    hoursPerDay: 8,
  },
};

export const PERSONA_MANOJ: Beneficiary = {
  id: 'ben_manoj_03',
  firstName: 'Manoj',
  initial: 'S',
  ageBand: '25-34',
  gender: 'male',
  clusterId: 'tikri_cluster',
  villageName: 'Tikri Khurd',
  maskedPhone: 'XXXXX-12093',
  language: 'hi',
  archetypeId: 9, // Mechanic wants a shop
  consent: {
    recording: true,
    planningUse: true,
    followUp: true,
  },
  statedSkills: ['4 years repairing Splendor, HF Deluxe at highway garage', 'Needs toolset loan'],
  yearsExperience: 4,
  hardLimits: {
    maxTravelMinutes: 20,
    hoursPerDay: 8,
  },
};

export const PERSONA_KAVITA: Beneficiary = {
  id: 'ben_kavita_04',
  firstName: 'Kavita',
  initial: 'P',
  ageBand: '18-24',
  gender: 'female',
  clusterId: 'lalpur_cluster',
  villageName: 'Lalpur Kalan',
  maskedPhone: 'XXXXX-88123',
  language: 'hi',
  archetypeId: 10, // School leaver, no work experience
  consent: {
    recording: true,
    planningUse: true,
    followUp: true,
  },
  statedSkills: ['Passed Class 12, wants factory or office work'],
  yearsExperience: 0,
  hardLimits: {
    maxTravelMinutes: 60,
    hoursPerDay: 7,
  },
};

export const PERSONA_ASHA: Beneficiary = {
  id: 'ben_asha_05',
  firstName: 'Asha',
  initial: 'R',
  ageBand: '25-34',
  gender: 'female',
  clusterId: 'devgaon_cluster',
  villageName: 'Devgaon South',
  maskedPhone: 'XXXXX-33981',
  language: 'hi',
  archetypeId: 2, // Recent tailoring trainee, certified, little work
  consent: {
    recording: true,
    planningUse: true,
    followUp: true,
  },
  statedSkills: ['Completed 3-month tailoring course 8 months ago', 'Got certificate', 'Only 5 paid days last month'],
  yearsExperience: 1,
  hardLimits: {
    maxTravelMinutes: 30,
    hoursPerDay: 4,
  },
};

// ==========================================
// 5. SYNTHETIC POPULATION (~600 beneficiaries)
// Deterministic pseudorandom generator (seed: Oct 2, 2026)
// ==========================================
function createDeterministicRng(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const FIRST_NAMES_F = ['Geeta', 'Pooja', 'Anita', 'Mamta', 'Rekha', 'Manju', 'Shanti', 'Urmila', 'Savita', 'Pinki', 'Seema', 'Sarita', 'Kamla', 'Madhuri', 'Suman'];
const FIRST_NAMES_M = ['Ramesh', 'Suresh', 'Dinesh', 'Mukesh', 'Mahesh', 'Santosh', 'Vikram', 'Anil', 'Rajesh', 'Pramod', 'Deepak', 'Sanjay', 'Ajay', 'Vijay', 'Manoj'];
const INITIALS = ['A', 'B', 'C', 'D', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'Y'];

export function generateSyntheticBeneficiaries(): Beneficiary[] {
  const rng = createDeterministicRng(20261002);
  const people: Beneficiary[] = [PERSONA_SUNITA, PERSONA_RAJU, PERSONA_MANOJ, PERSONA_KAVITA, PERSONA_ASHA];

  // 12 Archetypes distribution
  // 1: 12%, 2: 9%, 3: 3%, 4: 5%, 5: 10%, 6: 5%, 7: 8%, 8: 5%, 9: 3%, 10: 18%, 11: 17%, 12: 5%
  const archetypeDistribution = [
    { id: 1, p: 0.12 },
    { id: 2, p: 0.09 },
    { id: 3, p: 0.03 },
    { id: 4, p: 0.05 },
    { id: 5, p: 0.10 },
    { id: 6, p: 0.05 },
    { id: 7, p: 0.08 },
    { id: 8, p: 0.05 },
    { id: 9, p: 0.03 },
    { id: 10, p: 0.18 },
    { id: 11, p: 0.17 },
    { id: 12, p: 0.05 },
  ];

  for (let i = 6; i <= 600; i++) {
    const roll = rng();
    let accumulated = 0;
    let chosenArchetype = 1;
    for (const item of archetypeDistribution) {
      accumulated += item.p;
      if (roll <= accumulated) {
        chosenArchetype = item.id;
        break;
      }
    }

    const isFemale = [1, 2, 3, 4, 10].includes(chosenArchetype) ? rng() > 0.3 : rng() < 0.2;
    const nameList = isFemale ? FIRST_NAMES_F : FIRST_NAMES_M;
    const firstName = nameList[Math.floor(rng() * nameList.length)];
    const initial = INITIALS[Math.floor(rng() * INITIALS.length)];
    const cluster = SEED_LOCATIONS[Math.floor(rng() * SEED_LOCATIONS.length)];

    // 1 in 10 decline planning use consent (STRICT rule)
    const declinesPlanning = rng() < 0.10;

    const ageRoll = rng();
    const ageBand = ageRoll < 0.25 ? '18-24' : ageRoll < 0.65 ? '25-34' : ageRoll < 0.85 ? '35-44' : '45+';

    people.push({
      id: `ben_gen_${String(i).padStart(4, '0')}`,
      firstName,
      initial,
      ageBand,
      gender: isFemale ? 'female' : 'male',
      clusterId: cluster.id,
      villageName: `${cluster.name} Ward ${Math.floor(rng() * 5) + 1}`,
      maskedPhone: `XXXXX-${Math.floor(10000 + rng() * 90000)}`,
      language: rng() < 0.7 ? 'hi' : 'bho',
      archetypeId: chosenArchetype,
      consent: {
        recording: true,
        planningUse: !declinesPlanning,
        followUp: rng() > 0.08,
      },
      statedSkills: [`Experience profile category ${chosenArchetype}`],
      yearsExperience: Math.floor(rng() * 10),
      hardLimits: {
        maxTravelMinutes: 15 + Math.floor(rng() * 45),
        hoursPerDay: 4 + Math.floor(rng() * 5),
      },
    });
  }

  return people;
}

export const SEED_BENEFICIARIES = generateSyntheticBeneficiaries();

// ==========================================
// 6. EXACT DEVGAON OWN TAILORING INPUTS (PLAN.MD & SPEC CRITICAL)
// ==========================================
export const DEVGAON_OWN_TAILORING_VERDICT: CellVerdict = {
  clusterId: 'devgaon_cluster',
  pathwayId: 'tailor_own',
  verdict: 'Likely crowded',
  confidence: 'Medium',
  roomVotes: 0,
  crowdedVotes: 3,
  explanation: 'Supply is high (84 workers vs median 48), 27 recent trainees, and low current workload (9 median days last month). Likely crowded.',
  signals: {
    A: {
      signalId: 'A',
      name: 'Existing Workers',
      value: 84, // EXACT seeded number: 84 existing vs peer median 48
      readingWord: 'Crowded',
      vote: 'crowded',
      sampleSize: 84,
      provenance: 'Official record',
      explanation: '84 active home tailors counted in cluster (peer cluster median: 48). Ratio 1.75x.',
    },
    B: {
      signalId: 'B',
      name: 'Recent Entrants',
      value: 27, // EXACT seeded number: 27 trained in last 24m
      readingWord: 'Crowded',
      vote: 'crowded',
      sampleSize: 27,
      provenance: 'Official record',
      explanation: '27 persons certified/trained in tailoring in the past 24 months.',
    },
    C: {
      signalId: 'C',
      name: 'Current Workload',
      value: '9 paid days / mo', // EXACT seeded number: 9 median paid days
      readingWord: 'Slack',
      vote: 'crowded',
      sampleSize: 18,
      provenance: 'Verified',
      explanation: 'Median paid days: 9/month. 18% of tailors turned away work (slack local market).',
    },
    D: {
      signalId: 'D',
      name: 'Past Outcomes',
      value: '34% working', // Weak outcomes from past training
      readingWord: 'Weak',
      vote: 'crowded',
      sampleSize: 19,
      provenance: 'Verified',
      explanation: 'Only 34% of past trainees verified actively earning in tailoring at 90 days.',
    },
    E: {
      signalId: 'E',
      name: 'Funded Demand',
      value: 0,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 0,
      provenance: 'Official record',
      explanation: 'No open government or institutional purchase orders for individual home tailors.',
    },
    F: {
      signalId: 'F',
      name: 'Our Callers',
      value: 14,
      readingWord: 'Neutral',
      vote: 'neutral', // STRICT: F has NO vote
      sampleSize: 14,
      provenance: 'Self-reported',
      explanation: '14 callers from Devgaon expressed interest in tailoring work (waitlist context only).',
    },
  },
};

export const DEVGAON_UNIFORM_SHG_VERDICT: CellVerdict = {
  clusterId: 'devgaon_cluster',
  pathwayId: 'tailor_uniform_shg',
  verdict: 'Likely room',
  confidence: 'High',
  roomVotes: 3,
  crowdedVotes: 0,
  explanation: 'Committed bulk district order for 12,000 primary school uniforms. Existing SHG clusters fully booked.',
  signals: {
    A: {
      signalId: 'A',
      name: 'Existing Workers',
      value: 12,
      readingWord: 'Tight',
      vote: 'room',
      sampleSize: 12,
      provenance: 'Official record',
      explanation: 'Only 12 active workers currently in certified uniform SHG groups.',
    },
    B: {
      signalId: 'B',
      name: 'Recent Entrants',
      value: 4,
      readingWord: 'Room',
      vote: 'room',
      sampleSize: 4,
      provenance: 'Official record',
      explanation: 'Only 4 new entrants joined uniform groups in the past 24 months.',
    },
    C: {
      signalId: 'C',
      name: 'Current Workload',
      value: '24 paid days / mo',
      readingWord: 'Tight',
      vote: 'room',
      sampleSize: 12,
      provenance: 'Verified',
      explanation: 'Existing groups work 24 days/month and turn away additional bulk orders.',
    },
    D: {
      signalId: 'D',
      name: 'Past Outcomes',
      value: '82% retained',
      readingWord: 'Strong',
      vote: 'room',
      sampleSize: 14,
      provenance: 'Verified',
      explanation: '82% of past group-enterprise trainees continue working and earning above threshold.',
    },
    E: {
      signalId: 'E',
      name: 'Funded Demand',
      value: '12,000 units',
      readingWord: 'Room',
      vote: 'room',
      sampleSize: 1,
      provenance: 'Official record',
      explanation: 'Committed district education department school uniform tender.',
    },
    F: {
      signalId: 'F',
      name: 'Our Callers',
      value: 8,
      readingWord: 'Neutral',
      vote: 'neutral',
      sampleSize: 8,
      provenance: 'Self-reported',
      explanation: '8 women callers seeking group production work.',
    },
  },
};

// ==========================================
// 7. OPPORTUNITIES & DISTRICT PLANNING LEDGER
// ==========================================
export const SEED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_rpl_01',
    title: 'RPL Camp: Self Employed Tailor (AMH/Q1947)',
    type: 'RPL Camp',
    clusterId: 'devgaon_cluster',
    pathwayId: 'tailor_own',
    capacity: 20,
    candidateIds: [
      // 19 pre-seeded candidates; Sunita's choice will add the 20th candidate!
      'ben_gen_0006', 'ben_gen_0018', 'ben_gen_0029', 'ben_gen_0042', 'ben_gen_0055',
      'ben_gen_0068', 'ben_gen_0079', 'ben_gen_0091', 'ben_gen_0104', 'ben_gen_0116',
      'ben_gen_0128', 'ben_gen_0140', 'ben_gen_0152', 'ben_gen_0164', 'ben_gen_0176',
      'ben_gen_0188', 'ben_gen_0200', 'ben_gen_0212', 'ben_gen_0224'
    ],
    status: 'Forming', // Will tip to "Suggested" when candidate count hits 20
    targetDate: '2026-11-15',
    providerId: 'prov_pratham_01',
    notes: '2-day recognition camp for experienced home sewers. Viability threshold = 20 candidates within 30 min travel.',
  },
  {
    id: 'opp_uniform_02',
    title: 'School Uniform Production Group Formation',
    type: 'SHG Order Linkage',
    clusterId: 'devgaon_cluster',
    pathwayId: 'tailor_uniform_shg',
    capacity: 15,
    candidateIds: ['ben_gen_0033', 'ben_gen_0084', 'ben_gen_0112'],
    status: 'Suggested',
    targetDate: '2026-10-25',
    providerId: 'prov_rseti_02',
    notes: 'Linked with Block Education Office tender delivery.',
  },
];

export const SEED_PLAN_LINES: PlanLine[] = [
  {
    id: 'L1',
    title: 'Beginner Tailoring Batch (Fresh Training)',
    type: 'Beginner Batch',
    clusterId: 'devgaon_cluster',
    pathwayId: 'tailor_own',
    seats: 30,
    status: 'Planned',
    flagReason: undefined,
  },
  {
    id: 'L2',
    title: 'Assistant Mason Batch (Basic)',
    type: 'Beginner Batch',
    clusterId: 'khairwa_cluster',
    pathwayId: 'mason_rpl_bridge',
    seats: 25,
    status: 'Planned',
  },
  {
    id: 'L3',
    title: 'Two-Wheeler Service Technician Batch',
    type: 'Beginner Batch',
    clusterId: 'tikri_cluster',
    pathwayId: 'two_wheeler_mechanic',
    seats: 20,
    status: 'Planned',
  },
];

// ==========================================
// 8. HISTORICAL TRAINING & OUTCOME RECORDS (~250 records)
// ==========================================
export const SEED_OUTCOMES: OutcomeRecord[] = [
  {
    id: 'out_001',
    beneficiaryId: 'ben_asha_05', // Asha's check-in
    clusterId: 'devgaon_cluster',
    pathwayId: 'tailor_own',
    cohortId: 'batch_2025_t04',
    daysSinceCompletion: 180,
    paidDaysLastMonth: 5,
    monthlyEarnings: 1400,
    providerClaimedWorking: true, // Provider claimed 78% placement
    verifiedWorking: false, // Independent check reveals under-employed
    status: 'Needs support',
    notes: 'Lack of local market demand; has skill and machine but insufficient clients.',
  },
];
