import Papa from 'papaparse';

/** Turns a fact file's text into raw records. Add a format by adding a loader here. */
export type FactLoader = (text: string) => Record<string, unknown>[];

const csv: FactLoader = (text) => {
  const result = Papa.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: 'greedy' });
  if (result.errors.length) {
    throw new Error(result.errors.map((e) => `CSV row ${(e.row ?? 0) + 2}: ${e.message}`).join('\n'));
  }
  return result.data;
};

const json: FactLoader = (text) => {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('JSON fact file must be an array of facts');
  return data;
};

export const LOADERS: Record<string, FactLoader> = { csv, json };
