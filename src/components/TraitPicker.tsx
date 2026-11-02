import { SKIN_TONES, TRAIT_GROUPS, tagsOf, type Person } from '../lib/traits';

type Props = { person: Person; other: Person; onChange: (p: Person) => void };

/** Trait controls for one person. Traits the other person doesn't share are highlighted. */
export default function TraitPicker({ person, other, onChange }: Props) {
  const mine = tagsOf(person);
  const theirs = tagsOf(other);

  function toggle(key: (typeof TRAIT_GROUPS)[number]['key'], value: string, multi: boolean) {
    const current = person[key];
    let next: Person[typeof key];
    if (multi) {
      const list = current as string[];
      next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
    } else {
      next = current === value ? (key === 'age' ? '20s' : null) : value;
    }
    onChange({ ...person, [key]: next });
  }

  return (
    <div className="picker">
      <fieldset className="group">
        <legend>Skin tone</legend>
        <div className="opts">
          {SKIN_TONES.map((color, i) => (
            <button
              key={color}
              type="button"
              className={`swatch${person.skin === i ? ' on' : ''}`}
              style={{ background: color }}
              aria-label={`Skin tone ${i + 1}`}
              aria-pressed={person.skin === i}
              onClick={() => onChange({ ...person, skin: i })}
            />
          ))}
        </div>
      </fieldset>
      {TRAIT_GROUPS.map((g) => (
        <fieldset className="group" key={g.key}>
          <legend>{g.label}</legend>
          <div className="opts">
            {g.options.map(([value, label]) => {
              const tag = `${g.key}:${value}`;
              const on = mine.has(tag);
              const unshared = on !== theirs.has(tag);
              return (
                <button
                  key={value}
                  type="button"
                  className={`chip${on ? ' on' : ''}${unshared ? ' unshared' : ''}`}
                  aria-pressed={on}
                  onClick={() => toggle(g.key, value, g.multi)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
