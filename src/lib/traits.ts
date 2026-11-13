// The one list of life areas and traits. Pickers, validation and comparison all read from here.

export const AREAS = [
  { id: 'education', label: 'Finishing college' },
  { id: 'hired', label: 'Getting hired' },
  { id: 'promoted', label: 'Getting promoted' },
  { id: 'paid', label: 'Equal pay' },
  { id: 'loan', label: 'Getting a loan' },
  { id: 'care', label: 'Quality health care' },
  { id: 'ai', label: 'Recognized by AI' },
] as const;
export type AreaId = (typeof AREAS)[number]['id'];
export const AREA_IDS = AREAS.map((a) => a.id) as [AreaId, ...AreaId[]];

export const SKIN_TONES = ['#f6d7c3', '#eac0a0', '#d39b72', '#a86f48', '#7a4a2c', '#4b2e1c'];

export const TRAIT_GROUPS = [
  { key: 'race', label: 'Race / ethnicity', multi: false, options: [['asian', 'Asian'], ['black', 'Black'], ['hispanic', 'Hispanic / Latine'], ['native', 'Native American'], ['pi', 'Pacific Islander'], ['white', 'White'], ['multi', 'Multiracial']] },
  { key: 'gender', label: 'Gender', multi: false, options: [['woman', 'Woman'], ['man', 'Man'], ['nonbinary', 'Nonbinary'], ['trans', 'Transgender']] },
  { key: 'age', label: 'Age', multi: false, options: [['20s', '20s'], ['40s', '40s'], ['60s', '60s']] },
  { key: 'ability', label: 'Ability', multi: true, options: [['wheelchair', 'Wheelchair'], ['blind', 'White cane'], ['deaf', 'Hearing aid']] },
  { key: 'faith', label: 'Religion', multi: false, options: [['christian', 'Christian'], ['muslim', 'Muslim'], ['jewish', 'Jewish'], ['sikh', 'Sikh'], ['atheist', 'Atheist']] },
  { key: 'orient', label: 'Sexual orientation', multi: false, options: [['lgbtq', 'LGBTQ+']] },
  { key: 'class', label: 'Class / education', multi: true, options: [['firstgen', 'First-gen student'], ['pell', 'Low income (Pell)']] },
] as const;

export type Person = {
  skin: number;
  race: string | null;
  gender: string | null;
  age: string | null;
  ability: string[];
  faith: string | null;
  orient: string | null;
  class: string[];
};

export const blankPerson = (): Person => ({
  skin: 2, race: null, gender: null, age: '20s', ability: [], faith: null, orient: null, class: [],
});

const skinTag = (skin: number) => (skin <= 1 ? 'skin:light' : skin >= 4 ? 'skin:dark' : 'skin:mid');

/** Every tag a fact may use. */
export const KNOWN_TAGS = new Set<string>([
  ...TRAIT_GROUPS.flatMap((g) => g.options.map(([v]) => `${g.key}:${v}`)),
  'skin:light', 'skin:mid', 'skin:dark',
  'disabled', // derived: any ability trait
]);

/** The tags a person has, including derived ones (skin band, `disabled`). */
export function tagsOf(p: Person): Set<string> {
  const tags = new Set<string>([skinTag(p.skin)]);
  for (const g of TRAIT_GROUPS) {
    const v = p[g.key];
    if (Array.isArray(v)) v.forEach((x) => tags.add(`${g.key}:${x}`));
    else if (v) tags.add(`${g.key}:${v}`);
  }
  if (p.ability.length) tags.add('disabled');
  return tags;
}

export function tagLabel(tag: string): string {
  if (tag === 'disabled') return 'Disabled';
  const [key, value] = tag.split(':');
  if (key === 'skin') return `${value[0].toUpperCase()}${value.slice(1)} skin`;
  const group = TRAIT_GROUPS.find((g) => g.key === key);
  return group?.options.find(([v]) => v === value)?.[1] ?? tag;
}

export const areaLabel = (id: AreaId) => AREAS.find((a) => a.id === id)!.label;
