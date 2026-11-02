// Helpers safe to use in the browser (no zod). The Fact type itself comes from the schema.
import type { Fact } from './schema';
export type { Fact };

/** A gap records that no data exists for a group; it has no numbers. */
export function isGap(f: Pick<Fact, 'group_rate' | 'comparison_rate' | 'ratio'>): boolean {
  return f.group_rate === undefined && f.comparison_rate === undefined && f.ratio === undefined;
}

/** The ratio shown on the site: the stored one, else computed from the rates. */
export function ratioOf(f: Fact): number | undefined {
  if (f.ratio !== undefined) return f.ratio;
  if (f.group_rate !== undefined && f.comparison_rate) return f.group_rate / f.comparison_rate;
  return undefined;
}
