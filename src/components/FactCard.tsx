import { isGap, type Fact } from '../data/fact';
import { formatComparison } from '../lib/format';

export default function FactCard({ fact, who }: { fact: Fact; who?: string }) {
  const gap = isGap(fact);
  return (
    <div className={`fact${gap ? ' gap' : ''}`}>
      <div className="meta">
        {who && <span>{who} · </span>}
        {gap ? 'No data' : fact.traits.length > 1 ? 'Intersection' : fact.group}
        {fact.status !== 'verified' && <span className="status">{fact.status}</span>}
      </div>
      {!gap && <div className="ratio">{formatComparison(fact)}</div>}
      <p>{fact.statement}</p>
      <div className="src">
        {fact.source_url ? <a href={fact.source_url}>{fact.source_title}</a> : fact.source_title}
        {fact.year && `, ${fact.year}`}
      </div>
    </div>
  );
}
