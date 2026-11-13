// The Explore page: two people side by side, life areas in the middle.
import { useMemo, useState } from 'react';
import type { Fact } from '../data/fact';
import { compare, differs, type AreaComparison } from '../lib/compare';
import { citationNumbers, sourceKey } from '../lib/sources';
import { areaLabel, blankPerson, type Person } from '../lib/traits';
import Avatar from './Avatar';
import FactCard from './FactCard';
import TraitPicker from './TraitPicker';
import './Explorer.css';

const SIDES = { A: 'Left person', B: 'Right person' } as const;

export default function Explorer({ facts }: { facts: Fact[] }) {
  const [a, setA] = useState<Person>(blankPerson);
  const [b, setB] = useState<Person>(blankPerson);
  const [selected, setSelected] = useState<string | null>(null);

  const areas = useMemo(() => compare(a, b, facts), [a, b, facts]);
  const cites = useMemo(() => citationNumbers(facts), [facts]);
  const picked = areas.find((c) => c.area === selected);
  const current = (picked && hasFacts(picked) ? picked : undefined) ?? areas.find(differs);

  function reset() {
    setA(blankPerson());
    setB(blankPerson());
    setSelected(null);
  }

  return (
    <div className="explorer">
      <div className="toolbar">
        <button type="button" className="btn" onClick={reset}>Reset</button>
      </div>
      <div className="mirror">
        <Side label={SIDES.A} person={a} other={b} shirt="#ffffff" onChange={setA} />
        <section className="center" aria-label="Life areas">
          <div className="areas">
            {areas.map((c) => (
              <AreaRow key={c.area} c={c} selected={current?.area === c.area} onSelect={() => setSelected(c.area)} />
            ))}
          </div>
          {current ? <AreaFacts c={current} cites={cites} /> : <p className="hint muted">Change a trait on one side to see what differs.</p>}
        </section>
        <Side label={SIDES.B} person={b} other={a} shirt="#dadada" onChange={setB} />
      </div>
    </div>
  );
}

function Side({ label, person, other, shirt, onChange }: { label: string; person: Person; other: Person; shirt: string; onChange: (p: Person) => void }) {
  return (
    <section className="side" aria-label={label}>
      <div className="who">
        <div className="frame"><Avatar person={person} shirt={shirt} /></div>
        <div className="name">{label}</div>
      </div>
      <TraitPicker person={person} other={other} onChange={onChange} />
    </section>
  );
}

/** True when at least one fact (or gap) in this area applies to one of the two people. */
const hasFacts = (c: AreaComparison) => c.onlyA.length + c.onlyB.length + c.both.length + c.gaps.length > 0;

function AreaRow({ c, selected, onSelect }: { c: AreaComparison; selected: boolean; onSelect: () => void }) {
  const available = hasFacts(c);
  return (
    <button type="button" className={`area${selected ? ' sel' : ''}`} aria-pressed={selected} disabled={!available} onClick={onSelect}>
      <span className="lbl">{areaLabel(c.area)}</span>
      {available && !differs(c) && <span className="counts muted">same for both</span>}
    </button>
  );
}

function AreaFacts({ c, cites }: { c: AreaComparison; cites: Map<string, number> }) {
  const groups: [string, Fact[]][] = [
    ['Only the left person', c.onlyA],
    ['Only the right person', c.onlyB],
    ['Both', c.both],
  ];
  return (
    <div className="area-facts">
      <h2>{areaLabel(c.area)}</h2>
      {groups.map(([title, list]) => list.length > 0 && (
        <div key={title}>
          <h3>{title}</h3>
          {list.map((f) => <FactCard key={f.id} fact={f} cite={cites.get(sourceKey(f))} />)}
        </div>
      ))}
      {c.gaps.length > 0 && (
        <div>
          <h3>No data</h3>
          {c.gaps.map(({ fact, who }) => <FactCard key={fact.id} fact={fact} cite={cites.get(sourceKey(fact))} who={who === 'both' ? 'Both' : who === 'A' ? 'Left' : 'Right'} />)}
        </div>
      )}
    </div>
  );
}
