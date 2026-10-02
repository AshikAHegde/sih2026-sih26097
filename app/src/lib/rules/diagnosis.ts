import type { BarrierAssessment, BarrierType, BarrierStatus } from '../../types/index.ts';

export interface DiagnosisResult {
  barriers: BarrierAssessment[];
  primaryBarrier: string;
  supportPackage: {
    recommended: string[];
    forbidden: string[];
    summary: string;
  };
}

/**
 * Module 2: Diagnosis
 * Evaluates 7 barriers: Skill, Certification, Capital, Market Access, Mobility, Information, Placement.
 * Generates transparent support package and plain-text explanation.
 */
export function diagnoseBarriers(inputs: {
  hasDemonstratedSkill: boolean;
  hasOfficialCertificate: boolean;
  hasToolsCapital: boolean;
  hasSteadyCustomers: boolean;
  travelConstrained: boolean;
  awarenessIssue: boolean;
  seekingWagePlacement: boolean;
  specificQuotes?: Partial<Record<BarrierType, string>>;
}): DiagnosisResult {
  const barriers: BarrierAssessment[] = [
    {
      type: 'skill',
      label: 'Technical Skill',
      status: inputs.hasDemonstratedSkill ? 'none' : 'blocking',
      quote: inputs.specificQuotes?.skill,
      explanation: inputs.hasDemonstratedSkill
        ? 'Demonstrated 5+ core skills in daily practice over multiple years.'
        : 'Lacks fundamental unit competencies; requires instruction.',
    },
    {
      type: 'certification',
      label: 'Formal Certification',
      status: inputs.hasOfficialCertificate ? 'none' : 'blocking',
      quote: inputs.specificQuotes?.certification,
      explanation: inputs.hasOfficialCertificate
        ? 'Holds recognized NSQF-aligned certificate.'
        : 'Has practical mastery but lacks formal government paper/assessment.',
    },
    {
      type: 'capital',
      label: 'Working Capital & Tools',
      status: inputs.hasToolsCapital ? 'none' : 'partial',
      quote: inputs.specificQuotes?.capital,
      explanation: inputs.hasToolsCapital
        ? 'Owns functioning basic tools/equipment.'
        : 'Requires toolkits or seed capital grant/loan.',
    },
    {
      type: 'market_access',
      label: 'Customer / Market Access',
      status: inputs.hasSteadyCustomers ? 'none' : 'blocking',
      quote: inputs.specificQuotes?.market_access,
      explanation: inputs.hasSteadyCustomers
        ? 'Sufficient direct customer base.'
        : 'Reliant on sporadic neighbourhood orders; needs collective order aggregation.',
    },
    {
      type: 'mobility',
      label: 'Mobility & Daily Time',
      status: inputs.travelConstrained ? 'partial' : 'none',
      quote: inputs.specificQuotes?.mobility,
      explanation: inputs.travelConstrained
        ? 'Restricted to cluster travel (<30 mins) due to household responsibilities.'
        : 'Can travel across district or migrate seasonally.',
    },
    {
      type: 'information',
      label: 'Scheme Information',
      status: inputs.awarenessIssue ? 'partial' : 'none',
      quote: inputs.specificQuotes?.information,
      explanation: inputs.awarenessIssue
        ? 'Unaware of government procurement orders and SHG linkages.'
        : 'Informed of local livelihood opportunities.',
    },
    {
      type: 'placement',
      label: 'Employer Placement Linkage',
      status: inputs.seekingWagePlacement ? 'partial' : 'none',
      quote: inputs.specificQuotes?.placement,
      explanation: inputs.seekingWagePlacement
        ? 'Seeking verified wage employer match.'
        : 'Focused on self-employment or collective enterprise.',
    },
  ];

  // Derive plain-text diagnosis statement
  let primaryBarrier = '';
  const recommended: string[] = [];
  const forbidden: string[] = [];

  if (inputs.hasDemonstratedSkill && !inputs.hasOfficialCertificate && !inputs.hasSteadyCustomers) {
    primaryBarrier = 'Certification and customer access. Not skill.';
    recommended.push('2-day RPL Assessment Camp (Self-Employed Tailor AMH/Q1947)');
    recommended.push('Linkage to School Uniform SHG Production Group');
    forbidden.push('Beginner 3-month tailoring course (Wasteful - already skilled)');
  } else if (!inputs.hasDemonstratedSkill) {
    primaryBarrier = 'Foundational skill deficit.';
    recommended.push('Beginner skill batch with structured curriculum');
    forbidden.push('Direct RPL assessment without prior training');
  } else if (inputs.hasOfficialCertificate && !inputs.hasSteadyCustomers) {
    primaryBarrier = 'Market access and order aggregation.';
    recommended.push('Enterprise order linkage');
    forbidden.push('Re-certification or repeat classroom courses');
  } else {
    primaryBarrier = 'Working capital and toolset.';
    recommended.push('Micro-credit / toolset support package');
  }

  const summary = `Primary diagnostic finding: ${primaryBarrier}`;

  return {
    barriers,
    primaryBarrier,
    supportPackage: {
      recommended,
      forbidden,
      summary,
    },
  };
}

/**
 * Sunita's specific barrier diagnosis helper
 */
export function getSunitaDiagnosis(): DiagnosisResult {
  return diagnoseBarriers({
    hasDemonstratedSkill: true,
    hasOfficialCertificate: false,
    hasToolsCapital: true,
    hasSteadyCustomers: false,
    travelConstrained: true,
    awarenessIssue: true,
    seekingWagePlacement: false,
    specificQuotes: {
      skill: '"I have been stitching clothes for neighbours for 7 years on my machine."',
      certification: '"I never went to any training centre or got any government certificate."',
      market_access: '"Some months I get 4 suits, some months only 2. I have no regular big orders."',
      mobility: '"I cannot travel to Varanasi city every day because my children come home at 2 PM."',
    },
  });
}
