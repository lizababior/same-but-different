import { LOADERS } from './loaders';
import { FactSchema, type Fact } from './schema';

export class FactDataError extends Error {
  constructor(public readonly problems: string[]) {
    super(`The fact file has ${problems.length} problem(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    this.name = 'FactDataError';
  }
}

/** Parse and validate a fact file. Throws FactDataError listing every bad row, not just the first. */
export function parseFacts(text: string, format: string): Fact[] {
  const loader = LOADERS[format];
  if (!loader) throw new FactDataError([`no loader for format "${format}" (have: ${Object.keys(LOADERS).join(', ')})`]);

  let records: Record<string, unknown>[];
  try {
    records = loader(text);
  } catch (e) {
    throw new FactDataError([(e as Error).message]);
  }

  const facts: Fact[] = [];
  const problems: string[] = [];
  const ids = new Set<string>();
  records.forEach((record, i) => {
    const label = `fact ${i + 1}${record.id ? ` (${record.id})` : ''}`;
    const result = FactSchema.safeParse(record);
    if (!result.success) {
      for (const issue of result.error.issues) problems.push(`${label}, ${issue.path.join('.') || 'row'}: ${issue.message}`);
      return;
    }
    if (ids.has(result.data.id)) problems.push(`${label}: duplicate id`);
    ids.add(result.data.id);
    facts.push(result.data);
  });

  if (problems.length) throw new FactDataError(problems);
  return facts;
}
