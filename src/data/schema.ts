import { z } from 'zod';
import { AREA_IDS, KNOWN_TAGS } from '../lib/traits';
import { hasNumbers, isGap } from './fact';

// Spreadsheet cells arrive as strings; treat empty cells as "not given".
const blank = (v: unknown) => (v === '' || v === null || v === undefined ? undefined : v);
const optText = z.preprocess((v) => blank(typeof v === 'string' ? v.trim() : v), z.string().optional());
const optNumber = z.preprocess((v) => {
  const b = blank(v);
  return b === undefined ? undefined : Number(b);
}, z.number().finite().optional());

const traitList = z.preprocess(
  (v) => (Array.isArray(v) ? v : String(v ?? '').split(';')).map((t) => String(t).trim()).filter(Boolean),
  z.array(z.string().refine((t) => KNOWN_TAGS.has(t), { message: 'unknown trait tag (see data/README.md)' })).min(1, 'needs at least one trait tag'),
);

export const STATUSES = ['mock', 'draft', 'verified'] as const;
export const UNITS = ['percent', 'dollars', 'share', 'count'] as const;
/** Optional. Empty = inferred: numbers make a `rate`, no numbers make a `gap`. */
export const KINDS = ['rate', 'finding', 'gap'] as const;

export const FactSchema = z
  .object({
    id: z.string().trim().min(1, 'needs an id'),
    kind: z.preprocess(blank, z.enum(KINDS).optional()),
    area: z.enum(AREA_IDS),
    traits: traitList,
    group: z.string().trim().min(1, 'needs a group'),
    group_rate: optNumber,
    comparison_group: optText,
    comparison_rate: optNumber,
    ratio: optNumber,
    unit: z.preprocess(blank, z.enum(UNITS).optional()),
    measure: optText,
    statement: z.string().trim().min(1, 'needs a statement'),
    source_title: z.string().trim().min(1, 'needs a source_title'),
    source_url: optText,
    year: optNumber,
    status: z.enum(STATUSES),
    verified_by: optText,
    verified_on: optText,
    notes: optText,
  })
  .superRefine((f, ctx) => {
    const issue = (path: string, message: string) => ctx.addIssue({ code: 'custom', path: [path], message });
    if (f.kind === 'finding') {
      if (hasNumbers(f)) issue('kind', 'a finding has no numbers; remove them, or leave kind empty for a rate');
      if (!f.source_url) issue('source_url', 'a finding needs a source_url');
      return;
    }
    if (f.kind === 'gap' && hasNumbers(f)) issue('kind', 'a gap has no numbers');
    if (f.kind === 'rate' && !hasNumbers(f)) issue('kind', 'a rate needs group_rate and comparison_rate');
    if (isGap(f)) {
      if (!f.notes) issue('notes', 'a gap row (no numbers) needs notes that say why there is no data');
      return;
    }
    if (f.group_rate === undefined) issue('group_rate', 'needs group_rate, or leave all numbers empty for a gap');
    if (f.comparison_rate === undefined) issue('comparison_rate', 'needs comparison_rate, or leave all numbers empty for a gap');
    if (!f.comparison_group) issue('comparison_group', 'needs comparison_group');
    if (!f.unit) issue('unit', `needs unit (${UNITS.join(', ')})`);
    if (f.comparison_rate === 0) issue('comparison_rate', 'cannot be 0');
    if (f.ratio !== undefined && f.group_rate !== undefined && f.comparison_rate) {
      const expected = f.group_rate / f.comparison_rate;
      if (Math.abs(f.ratio - expected) > Math.max(0.05, expected * 0.03)) {
        issue('ratio', `is ${f.ratio}, but group_rate / comparison_rate is ${expected.toFixed(2)}`);
      }
    }
    if (f.status === 'verified' && (!f.verified_by || !f.verified_on)) issue('status', 'a verified fact needs verified_by and verified_on');
  });

export type Fact = z.output<typeof FactSchema>;
