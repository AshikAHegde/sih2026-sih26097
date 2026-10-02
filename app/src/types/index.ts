// Domain entities and types for Livelihood Evidence Loop (strictly rule-based, offline, event-sourced)

export type Role = 'beneficiary' | 'helper' | 'officer' | 'provider';

export type ProvenanceKind = 'Official record' | 'Self-reported' | 'Verified' | 'Estimated by rule';

export interface Location {
  id: string;
  name: string;
  block: string;
  type: 'rural' | 'peri-urban';
  households: number;
  tileCol: number;
  tileRow: number;
}

export interface SkillUnit {
  code: string;
  title: string;
  standardCode: string;
  nsqfLevel: number;
  core: boolean;
  tasks: string[];
}

export interface Qualification {
  code: string;
  title: string;
  nsqfLevel: number;
  sector: string;
  units: SkillUnit[];
}

export interface Pathway {
  id: string;
  name: string;
  sector: string;
  type: 'wage' | 'self-employment' | 'group-enterprise';
  marketScope: 'local' | 'cluster' | 'district';
  costBand: 'free' | 'stipend' | 'subsidized';
  timeToFirstIncomeDays: number;
  qualificationCode?: string;
}

export type SkillLevel = 0 | 1 | 2 | 3 | 4;
// 0: Not evidenced, 1: Self-reported, 2: Evidence-supported, 3: Corroborated, 4: Assessed

export interface SkillEvidenceItem {
  unitCode: string;
  unitTitle: string;
  level: SkillLevel;
  quote?: string;
  specifics?: string;
}

export type BarrierType =
  | 'skill'
  | 'certification'
  | 'capital'
  | 'market_access'
  | 'mobility'
  | 'information'
  | 'placement';

export type BarrierStatus = 'none' | 'partial' | 'blocking';

export interface BarrierAssessment {
  type: BarrierType;
  label: string;
  status: BarrierStatus;
  quote?: string;
  explanation: string;
}

export interface PreScreenResult {
  qualificationCode: string;
  qualificationTitle: string;
  coreUnitsCount: number;
  coreUnitsEvidenced: number;
  percentage: number;
  band: 'Likely ready' | 'Partly ready' | 'Not yet';
  explanation: string;
}

export interface Beneficiary {
  id: string;
  firstName: string;
  initial: string; // STRICT: NO surname
  ageBand: '18-24' | '25-34' | '35-44' | '45+';
  gender: 'female' | 'male' | 'other';
  clusterId: string;
  villageName: string;
  maskedPhone: string;
  language: 'hi' | 'bho' | 'en';
  archetypeId: number;
  consent: {
    recording: boolean;
    planningUse: boolean;
    followUp: boolean;
  };
  statedSkills: string[];
  yearsExperience?: number;
  hardLimits?: {
    maxTravelMinutes: number;
    hoursPerDay: number;
  };
  chosenPathwayId?: string;
}

export interface SignalReading {
  signalId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  name: string;
  value: number | string;
  readingWord: 'Slack' | 'Tight' | 'Crowded' | 'Room' | 'Neutral' | 'Strong' | 'Weak';
  vote: 'room' | 'uncertain' | 'crowded' | 'neutral';
  sampleSize?: number;
  provenance: ProvenanceKind;
  explanation: string;
}

export type VerdictStatus = 'Likely room' | 'Uncertain' | 'Likely crowded';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface CellVerdict {
  clusterId: string;
  pathwayId: string;
  verdict: VerdictStatus;
  confidence: ConfidenceLevel;
  signals: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F', SignalReading>;
  roomVotes: number;
  crowdedVotes: number;
  explanation: string;
}

export interface RankedOption {
  rank: number;
  pathway: Pathway;
  reason: string;
  badge?: string;
  verdictText?: string;
  verdictStatus?: 'Likely room' | 'Uncertain' | 'Likely crowded';
  previousRank?: number; // Used for "was 1st" re-rank animation
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'RPL Camp' | 'Beginner Batch' | 'SHG Order Linkage' | 'Enterprise Trial';
  clusterId: string;
  pathwayId: string;
  capacity: number;
  candidateIds: string[];
  status: 'Forming' | 'Suggested' | 'Sanctioned' | 'Active' | 'Completed';
  targetDate: string;
  providerId?: string;
  notes: string;
}

export interface PlanLine {
  id: string;
  title: string;
  type: string;
  clusterId: string;
  pathwayId: string;
  seats: number;
  status: 'Planned' | 'Hold suggested' | 'Replaced' | 'Active';
  flagReason?: string;
  replacedByOpportunityId?: string;
  officerReason?: string;
}

export interface OutcomeRecord {
  id: string;
  beneficiaryId: string;
  clusterId: string;
  pathwayId: string;
  cohortId: string;
  daysSinceCompletion: 30 | 90 | 180;
  paidDaysLastMonth: number;
  monthlyEarnings: number;
  providerClaimedWorking: boolean;
  verifiedWorking: boolean;
  status: 'Working' | 'Self-employed' | 'Needs support';
  notes?: string;
}

// EVENT SOURCING
export interface AuditEvent {
  id: string;
  timestamp: string;
  role: Role | 'system' | 'presenter';
  action: string;
  objectId?: string;
  details?: Record<string, unknown>;
  reason?: string;
}
