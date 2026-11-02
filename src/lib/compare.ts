// The comparison rule. This is the one place to change when the team decides the scoring method.
import { isGap, type Fact } from '../data/fact';
import { AREAS, tagsOf, type AreaId, type Person } from './traits';

export type Who = 'A' | 'B' | 'both';

export type AreaComparison = {
  area: AreaId;
  onlyA: Fact[];
  onlyB: Fact[];
  both: Fact[];
  gaps: { fact: Fact; who: Who }[];
};

/** A fact applies to a person when the person has every trait tag on the fact. */
export const appliesTo = (fact: Fact, tags: Set<string>) => fact.traits.every((t) => tags.has(t));

/** Facts with more traits (intersections) first. */
const byTraitCount = (x: Fact, y: Fact) => y.traits.length - x.traits.length;

export function compare(a: Person, b: Person, facts: Fact[]): AreaComparison[] {
  const tagsA = tagsOf(a);
  const tagsB = tagsOf(b);
  return AREAS.map(({ id }) => {
    const result: AreaComparison = { area: id, onlyA: [], onlyB: [], both: [], gaps: [] };
    for (const fact of facts.filter((f) => f.area === id).sort(byTraitCount)) {
      const inA = appliesTo(fact, tagsA);
      const inB = appliesTo(fact, tagsB);
      if (!inA && !inB) continue;
      const who: Who = inA && inB ? 'both' : inA ? 'A' : 'B';
      if (isGap(fact)) result.gaps.push({ fact, who });
      else if (who === 'both') result.both.push(fact);
      else (who === 'A' ? result.onlyA : result.onlyB).push(fact);
    }
    return result;
  });
}

/** True when the two people get different facts in this area. */
export const differs = (c: AreaComparison) =>
  c.onlyA.length > 0 || c.onlyB.length > 0 || c.gaps.some((g) => g.who !== 'both');
