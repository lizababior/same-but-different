import { ratioOf, type Fact } from '../data/fact';

const num = (n: number) => String(Number(n.toFixed(1)));
const times = (r: number) => `${r < 1 ? r.toFixed(2) : r.toFixed(1)}×`;

const VALUE: Record<NonNullable<Fact['unit']>, (n: number) => string> = {
  percent: (n) => `${num(n)}%`,
  share: (n) => `${num(n)}%`,
  dollars: (n) => `$${n.toLocaleString('en-US')}`,
  count: (n) => num(n),
};
const PHRASE: Record<NonNullable<Fact['unit']>, string> = {
  percent: 'as likely',
  share: 'their share',
  dollars: 'as much',
  count: 'as many',
};

/** "2.9× as likely (16.4% vs 5.7%)". Empty for gaps. */
export function formatComparison(f: Fact): string {
  const r = ratioOf(f);
  if (r === undefined || !f.unit || f.group_rate === undefined || f.comparison_rate === undefined) return '';
  const v = VALUE[f.unit];
  return `${times(r)} ${PHRASE[f.unit]} (${v(f.group_rate)} vs ${v(f.comparison_rate)})`;
}
