// One numbered list of sources, shared by the Sources page and the [n] citations on fact cards.
import type { Fact } from '../data/fact';

export const sourceKey = (f: Fact) => `${f.source_title}|${f.source_url ?? ''}`;

/** One fact for each unique source, sorted by title. Position + 1 is the citation number. */
export function uniqueSources(facts: Fact[]): Fact[] {
  return [...new Map(facts.map((f) => [sourceKey(f), f])).values()].sort((x, y) => x.source_title.localeCompare(y.source_title));
}

/** Citation number for each source key, matching the order on the Sources page. */
export function citationNumbers(facts: Fact[]): Map<string, number> {
  return new Map(uniqueSources(facts).map((f, i) => [sourceKey(f), i + 1]));
}
