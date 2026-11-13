import { describe, expect, it } from 'vitest';
import type { Fact } from '../data/fact';
import { compare, differs } from './compare';
import { formatComparison } from './format';
import { blankPerson, type Person } from './traits';

const fact = (id: string, area: Fact['area'], traits: string[], extra: Partial<Fact> = {}): Fact => ({
  id, area, traits, group: id, group_rate: 20, comparison_group: 'others', comparison_rate: 10, ratio: 2,
  unit: 'percent', statement: id, source_title: 'MOCK', status: 'mock', ...extra,
});
const gap = (id: string, area: Fact['area'], traits: string[]) =>
  fact(id, area, traits, { group_rate: undefined, comparison_rate: undefined, ratio: undefined, unit: undefined, notes: 'no data' });

const person = (p: Partial<Person>): Person => ({ ...blankPerson(), ...p });
const area = (result: ReturnType<typeof compare>, id: Fact['area']) => result.find((r) => r.area === id)!;
const ids = (facts: Fact[]) => facts.map((f) => f.id);

describe('compare', () => {
  const facts = [
    fact('black-loan', 'loan', ['race:black']),
    fact('woman-pay', 'paid', ['gender:woman']),
    fact('black-woman-pay', 'paid', ['race:black', 'gender:woman']),
    fact('disabled-hired', 'hired', ['disabled']),
    fact('dark-ai', 'ai', ['skin:dark']),
    gap('nonbinary-pay', 'paid', ['gender:nonbinary']),
  ];

  it('gives one comparison for each life area', () => {
    expect(compare(blankPerson(), blankPerson(), facts).map((c) => c.area)).toEqual(['education', 'hired', 'promoted', 'paid', 'loan', 'care', 'ai']);
  });

  it('splits facts into only A, only B and both', () => {
    const r = compare(person({ race: 'black', gender: 'woman' }), person({ race: 'white', gender: 'woman' }), facts);
    expect(ids(area(r, 'loan').onlyA)).toEqual(['black-loan']);
    expect(ids(area(r, 'paid').onlyA)).toEqual(['black-woman-pay']);
    expect(ids(area(r, 'paid').both)).toEqual(['woman-pay']);
    expect(area(r, 'loan').onlyB).toEqual([]);
  });

  it('applies an intersection only when every trait matches, and lists it first', () => {
    const r = compare(person({ race: 'black', gender: 'woman' }), person({ gender: 'woman' }), facts);
    expect(ids(area(r, 'paid').onlyA)).toEqual(['black-woman-pay']);
    const both = compare(person({ race: 'black', gender: 'woman' }), person({ race: 'black', gender: 'woman' }), facts);
    expect(ids(area(both, 'paid').both)).toEqual(['black-woman-pay', 'woman-pay']);
  });

  it('gives any disability the disabled tag', () => {
    const r = compare(person({ ability: ['deaf'] }), blankPerson(), facts);
    expect(ids(area(r, 'hired').onlyA)).toEqual(['disabled-hired']);
  });

  it('turns skin tone into light, mid and dark bands', () => {
    const r = compare(person({ skin: 5 }), person({ skin: 3 }), facts);
    expect(ids(area(r, 'ai').onlyA)).toEqual(['dark-ai']);
    expect(area(compare(person({ skin: 4 }), blankPerson(), facts), 'ai').onlyA).toHaveLength(1);
  });

  it('keeps gaps apart from facts with numbers', () => {
    const paid = area(compare(person({ gender: 'nonbinary' }), person({ gender: 'man' }), facts), 'paid');
    expect(paid.gaps).toEqual([{ fact: facts[5], who: 'A' }]);
    expect(paid.onlyA).toEqual([]);
    expect(differs(paid)).toBe(true);
  });

  it('finds no difference between identical people', () => {
    const p = person({ race: 'black', gender: 'woman', ability: ['wheelchair'] });
    expect(compare(p, p, facts).some(differs)).toBe(false);
  });
});

describe('formatComparison', () => {
  it('shows the ratio with both rates', () => {
    expect(formatComparison(fact('x', 'loan', ['race:black'], { group_rate: 16.4, comparison_rate: 5.7, ratio: 2.9 }))).toBe('2.9× as likely (16.4% vs 5.7%)');
  });
  it('phrases pay as "as much"', () => {
    expect(formatComparison(fact('x', 'paid', ['gender:woman'], { unit: 'dollars', group_rate: 65, comparison_rate: 100, ratio: 0.65 }))).toBe('0.65× as much ($65 vs $100)');
  });
  it('is empty for a gap', () => {
    expect(formatComparison(gap('x', 'paid', ['gender:nonbinary']))).toBe('');
  });
});
