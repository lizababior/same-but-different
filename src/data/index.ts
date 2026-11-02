// Build-time only (reads the file system). Pages call this; the browser gets the result as props.
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { parseFacts } from './parse';

/** The fact file the site is built from. Change the extension to switch format. */
export const FACT_FILE = 'data/facts.csv';

export async function loadFacts(path = FACT_FILE) {
  return parseFacts(await readFile(path, 'utf8'), extname(path).slice(1));
}
