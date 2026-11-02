import { describe, expect, it } from 'vitest';
import { FactDataError, parseFacts } from './parse';

const HEADER = 'id,area,traits,group,group_rate,comparison_group,comparison_rate,ratio,unit,measure,statement,source_title,source_url,year,status,verified_by,verified_on,notes';

const loanFact = {
  id: 'loan-x', area: 'loan', traits: 'race:black', group: 'Group X', group_rate: '20', comparison_group: 'Group Y',
  comparison_rate: '10', ratio: '2', unit: 'percent', measure: 'denial rate', statement: 'X was denied 2× as often.',
  source_title: 'MOCK', source_url: '', year: '2024', status: 'mock', verified_by: '', verified_on: '', notes: '',
};
const gapFact = { ...loanFact, id: 'gap-x', traits: 'gender:nonbinary', group_rate: '', comparison_rate: '', ratio: '', unit: '', comparison_group: '', notes: 'Survey records only two genders.' };

const toCsv = (rows: Record<string, string>[]) =>
  [HEADER, ...rows.map((r) => HEADER.split(',').map((k) => JSON.stringify(r[k] ?? '')).join(','))].join('\n');
const toJson = (rows: Record<string, string>[]) => JSON.stringify(rows.map((r) => ({ ...r, traits: r.traits.split(';') })));

function problemsOf(fn: () => unknown): string[] {
  try {
    fn();
  } catch (e) {
    if (e instanceof FactDataError) return e.problems;
    throw e;
  }
  throw new Error('expected a FactDataError');
}

describe('parseFacts', () => {
  it('gives the same facts from CSV and JSON', () => {
    const rows = [loanFact, gapFact];
    expect(parseFacts(toJson(rows), 'json')).toEqual(parseFacts(toCsv(rows), 'csv'));
  });

  it('turns cells into typed values', () => {
    const [fact] = parseFacts(toCsv([{ ...loanFact, traits: 'race:black; gender:woman' }]), 'csv');
    expect(fact).toMatchObject({ group_rate: 20, comparison_rate: 10, ratio: 2, year: 2024, traits: ['race:black', 'gender:woman'] });
    expect(fact.source_url).toBeUndefined();
  });

  it('accepts a gap row with no numbers when it explains why', () => {
    expect(parseFacts(toCsv([gapFact]), 'csv')).toHaveLength(1);
    expect(problemsOf(() => parseFacts(toCsv([{ ...gapFact, notes: '' }]), 'csv')).join()).toMatch(/notes/);
  });

  it('lists every problem with the fact id and field', () => {
    const problems = problemsOf(() =>
      parseFacts(toCsv([
        { ...loanFact, id: 'bad-area', area: 'housing' },
        { ...loanFact, id: 'bad-tag', traits: 'race:martian' },
        { ...loanFact, id: 'bad-ratio', ratio: '5' },
        { ...loanFact, id: 'half', comparison_rate: '' },
      ]), 'csv'),
    );
    expect(problems.find((p) => p.includes('bad-area'))).toMatch(/area/);
    expect(problems.find((p) => p.includes('bad-tag'))).toMatch(/unknown trait tag/);
    expect(problems.find((p) => p.includes('bad-ratio'))).toMatch(/ratio/);
    expect(problems.find((p) => p.includes('half'))).toMatch(/comparison_rate/);
  });

  it('rejects duplicate ids and verified facts without a checker', () => {
    const problems = problemsOf(() => parseFacts(toCsv([loanFact, loanFact, { ...loanFact, id: 'v', status: 'verified' }]), 'csv'));
    expect(problems.join('\n')).toMatch(/duplicate id/);
    expect(problems.join('\n')).toMatch(/verified_by/);
  });

  it('names the formats it knows', () => {
    expect(problemsOf(() => parseFacts('', 'xlsx'))[0]).toMatch(/csv, json/);
  });
});
