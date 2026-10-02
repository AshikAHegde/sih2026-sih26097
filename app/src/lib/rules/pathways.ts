import type { Pathway, CellVerdict } from '../../types/index.ts';
import { SEED_PATHWAYS, DEVGAON_OWN_TAILORING_VERDICT, DEVGAON_UNIFORM_SHG_VERDICT } from '../seed/data.ts';

export interface RankedOption {
  rank: number;
  pathway: Pathway;
  reason: string;
  badge?: string;
  verdictText?: string;
  verdictStatus?: 'Likely room' | 'Uncertain' | 'Likely crowded';
  previousRank?: number; // Used for "was 1st" re-rank animation
}

/**
 * Module 3: Pathways (Deterministic ranking)
 * Generates both "Person-only" ranking and "With-place" (local evidence) ranking.
 */
export function rankPathwaysForSunita(withLocalEvidence: boolean): RankedOption[] {
  if (!withLocalEvidence) {
    // Person-only ranking (Beat 5): Based only on her stated skill & quick time-to-income
    return [
      {
        rank: 1,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_own')!,
        reason: 'Immediate start with home machine. 7 days to first income. Matches current experience.',
        badge: 'Top individual fit',
        verdictStatus: undefined,
      },
      {
        rank: 2,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_uniform_shg')!,
        reason: 'Group production. Within travel limits (20 mins). Requires group formation.',
        badge: 'Strong skill fit',
        verdictStatus: undefined,
      },
      {
        rank: 3,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_factory_operator')!,
        reason: 'High steady wage, but requires 45 days training and district travel (>60 mins). Exceeds travel limit.',
        badge: 'High travel limit',
        verdictStatus: undefined,
      },
    ];
  } else {
    // With-place ranking (Beat 6 Re-rank):
    // "Own tailoring" drops because Devgaon cluster is "Likely crowded".
    // "Uniform orders" jumps to 1st because of sanctioned government tender (Likely room).
    return [
      {
        rank: 1,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_uniform_shg')!,
        reason: 'District primary school uniform order (12,000 sets) has sanctioned room. Existing groups booked.',
        badge: 'Likely room in Devgaon',
        verdictText: 'Likely room (High confidence)',
        verdictStatus: 'Likely room',
        previousRank: 2,
      },
      {
        rank: 2,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_factory_operator')!,
        reason: 'Industrial garment park has active hiring quota, but exceeds her 30-min travel limit.',
        badge: 'District demand',
        verdictText: 'Uncertain for local cluster',
        verdictStatus: 'Uncertain',
        previousRank: 3,
      },
      {
        rank: 3,
        pathway: SEED_PATHWAYS.find((p) => p.id === 'tailor_own')!,
        reason: 'Cluster already has 84 tailors (1.75x peer median) and low median work days (9 days/mo).',
        badge: 'Likely crowded in Devgaon',
        verdictText: 'Likely crowded (Medium confidence)',
        verdictStatus: 'Likely crowded',
        previousRank: 1, // Was 1st! Leaves "was 1st" outline in UI
      },
    ];
  }
}
