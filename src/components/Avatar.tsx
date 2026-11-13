// Placeholder avatar, ported from the prototype. The avatar art is a separate team task.
import { SKIN_TONES, type Person } from '../lib/traits';

const INK = '#111';
const st = (fill: string, w = 5) => `style="fill:${fill};stroke:${INK};stroke-width:${w};stroke-linejoin:round;stroke-linecap:round"`;

function svg(p: Person, shirt: string): string {
  const skin = SKIN_TONES[p.skin];
  const hair = p.age === '60s' ? '#BDBDBD' : INK;
  const wc = p.ability.includes('wheelchair');
  let back = '';
  let front = '';
  if (p.faith === 'muslim') {
    back = `<path d="M46 112 Q46 36 100 36 Q154 36 154 112 L162 190 L38 190 Z" ${st('#5B6B8C')}/>`;
    front = `<path d="M58 96 Q60 48 100 48 Q140 48 142 96 Q134 70 100 68 Q66 70 58 96Z" ${st('#5B6B8C', 4)}/>`;
  } else if (p.gender === 'woman') {
    back = `<path d="M50 104 Q48 42 100 42 Q152 42 150 104 L154 170 Q100 182 46 170 Z" ${st(hair)}/>`;
    front = `<path d="M54 94 Q60 46 100 46 Q140 46 146 94 Q122 64 82 70 Q64 78 54 94Z" ${st(hair, 4)}/>`;
  } else if (p.gender === 'man') {
    front = `<path d="M54 92 Q52 42 100 42 Q148 42 146 92 Q140 66 100 64 Q60 66 54 92Z" ${st(hair, 4)}/>`;
  } else {
    front = `<path d="M54 98 Q50 42 102 42 Q150 44 148 86 Q122 58 92 74 Q68 80 54 98Z" ${st(hair, 4)}/>`;
  }
  const kippah = p.faith === 'jewish' ? `<path d="M78 50 Q100 30 122 50 Z" ${st('#2F3D57', 4)}/>` : '';
  const lines = p.age === '60s' ? `<path d="M70 90 q7 4 14 0 M116 90 q7 4 14 0" style="fill:none;stroke:${INK};stroke-width:2.5;stroke-linecap:round"/>` : '';
  const aid = p.ability.includes('deaf') ? `<path d="M150 96 q10 8 0 18" style="fill:none;stroke:${INK};stroke-width:6;stroke-linecap:round"/>` : '';
  const eyes = p.ability.includes('blind')
    ? `<rect x="66" y="94" width="28" height="15" rx="6" style="fill:${INK}"/><rect x="106" y="94" width="28" height="15" rx="6" style="fill:${INK}"/><path d="M94 100 h12" style="stroke:${INK};stroke-width:4"/>`
    : `<circle cx="82" cy="102" r="4.5" style="fill:${INK}"/><circle cx="118" cy="102" r="4.5" style="fill:${INK}"/>`;
  const cane = p.ability.includes('blind') ? `<path d="M178 150 L196 240" style="stroke:${INK};stroke-width:5;stroke-linecap:round"/>` : '';
  const pin = p.orient === 'lgbtq'
    ? ['#e03131', '#f08c00', '#fab005', '#2f9e44', '#1971c2', '#7048e8'].map((c, i) => `<rect x="118" y="${192 + i * 3}" width="18" height="3" fill="${c}"/>`).join('')
    : '';
  // Wheelchair, front view: a big backrest and seat behind the person, wheels at the sides, legs and footrest in front.
  const chairBack = wc
    ? `<g style="stroke:${INK};stroke-width:5;stroke-linecap:round;stroke-linejoin:round">
        <path d="M40 140 V124 M160 140 V124" style="fill:none"/>
        <rect x="32" y="134" width="136" height="92" rx="14" style="fill:#e6e6e6"/>
        <ellipse cx="30" cy="212" rx="9" ry="36" style="fill:#ffffff"/>
        <ellipse cx="170" cy="212" rx="9" ry="36" style="fill:#ffffff"/>
      </g>`
    : '';
  const legs = '#5a6472';
  const chairFront = wc
    ? `<g style="stroke:${INK};stroke-width:5;stroke-linecap:round;stroke-linejoin:round">
        <rect x="36" y="186" width="24" height="12" rx="5" style="fill:#e6e6e6"/>
        <rect x="140" y="186" width="24" height="12" rx="5" style="fill:#e6e6e6"/>
        <rect x="54" y="200" width="44" height="30" rx="12" style="fill:${legs}"/>
        <rect x="102" y="200" width="44" height="30" rx="12" style="fill:${legs}"/>
        <rect x="62" y="226" width="30" height="16" rx="6" style="fill:${legs}"/>
        <rect x="108" y="226" width="30" height="16" rx="6" style="fill:${legs}"/>
        <path d="M54 246 H146" style="fill:none"/>
      </g>`
    : '';
  return `<svg viewBox="20 20 170 230" width="100%" height="100%" aria-hidden="true">${chairBack}${back}
    <path d="M44 ${wc ? 208 : 260} Q44 166 100 160 Q156 166 156 ${wc ? 208 : 260} Z" ${st(shirt)}/>${pin}
    <path d="M88 136 L88 162 Q100 168 112 162 L112 136" ${st(skin)}/>
    <circle cx="54" cy="104" r="8" ${st(skin, 4)}/><circle cx="146" cy="104" r="8" ${st(skin, 4)}/>
    <circle cx="100" cy="100" r="46" ${st(skin)}/>${front}${kippah}${eyes}${lines}${aid}
    <path d="M100 104 q-5 10 2 12" style="fill:none;stroke:${INK};stroke-width:3;stroke-linecap:round"/>
    <path d="M88 126 Q100 133 112 126" style="fill:none;stroke:${INK};stroke-width:4;stroke-linecap:round"/>${chairFront}${cane}</svg>`;
}

export default function Avatar({ person, shirt }: { person: Person; shirt: string }) {
  return <div className="avatar" dangerouslySetInnerHTML={{ __html: svg(person, shirt) }} />;
}
