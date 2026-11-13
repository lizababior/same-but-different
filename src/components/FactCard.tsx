import { isGap, type Fact } from '../data/fact';
import { formatComparison } from '../lib/format';

/** `cite` is the source number on the Sources page. The full citation shows on hover. */
export default function FactCard({ fact, who, cite }: { fact: Fact; who?: string; cite?: number }) {
  const gap = isGap(fact);
  const citation = `${fact.source_title}${fact.year ? `, ${fact.year}` : ''}`;
  const label = `[${cite ?? '?'}]`;
  return (
    <div className={`fact${gap ? ' gap' : ''}`}>
      <div className="meta">
        {who && <span>{who} · </span>}
        {gap ? 'No data' : fact.traits.length > 1 ? 'Intersection' : fact.group}
        {fact.status !== 'verified' && (
          <span className="status" title="A second team member has not checked this number against the source yet.">
            {fact.status === 'mock' ? 'invented example' : 'not verified yet'}
          </span>
        )}
      </div>
      {!gap && <div className="ratio">{formatComparison(fact)}</div>}
      <p>
        {fact.statement}{' '}
        {fact.source_url ? (
          <a className="cite" href={fact.source_url} target="_blank" rel="noopener noreferrer" title={citation} aria-label={`Source: ${citation} (opens in a new tab)`}>
            {label}
          </a>
        ) : (
          <span className="cite" title={citation}>{label}</span>
        )}
      </p>
    </div>
  );
}
