// Helpers safe to use in the browser (no zod). The Fact type itself comes from the schema.
import type { Fact } from './schema';
export type { Fact };

type Numbers = Pick<Fact, 'group_rate' | 'comparison_rate' | 'ratio'>;

/** True when the row has at least one number. */
export const hasNumbers = (f: Numbers) => f.group_rate !== undefined || f.comparison_rate !== undefined || f.ratio !== undefined;

/** A finding is a sourced result with no numbers (for example from an audit study). It is shown like a fact. */
export const isFinding = (f: Pick<Fact, 'kind'>) => f.kind === 'finding';

/** A gap records that no data exists for a group: no numbers, and not a finding. */
export function isGap(f: Numbers & Pick<Fact, 'kind'>): boolean {
  return !hasNumbers(f) && !isFinding(f);
}

/** The ratio shown on the site: the stored one, else computed from the rates. */
export function ratioOf(f: Fact): number | undefined {
  if (f.ratio !== undefined) return f.ratio;
  if (f.group_rate !== undefined && f.comparison_rate) return f.group_rate / f.comparison_rate;
  return undefined;
}
