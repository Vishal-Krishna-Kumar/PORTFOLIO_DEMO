import type { ReactElement } from "react";

// Background artwork for the project panels that have no photograph of their own. Each one is
// drawn as vector shapes, so it stays sharp at any screen size, and each pictures what the
// project is about: text being cut into chunks, a ranked search, air flowing over a wing.

/** A small repeatable random-number source, so the artwork is the same on every visit. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const FRAME = { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMid slice" as const };
const CLASS = "absolute inset-0 h-full w-full";

/** chunkaudit: lines of text as blocks, cut into chunks; one answer is split by a cut. */
const ChunkArt = () => {
  const random = seeded(7);
  const rows = Array.from({ length: 13 }, (_, row) => {
    const words: { x: number; width: number }[] = [];
    let x = -60 + random() * 80;
    while (x < 1760) {
      const width = 46 + random() * 150;
      words.push({ x, width });
      x += width + 16;
    }
    return { y: 40 + row * 68, words };
  });
  const cuts = [330, 720, 1080, 1430];

  return (
    <svg {...FRAME} className={CLASS} aria-hidden="true">
      <defs>
        <radialGradient id="chunk-glow" cx="72%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#7a1414" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#2a0b0d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#09090b" />
      <rect width="1600" height="900" fill="url(#chunk-glow)" />
      <g transform="rotate(-9 800 450) translate(0 -20)">
        {rows.map((row, index) =>
          row.words.map((word, position) => {
            const answer = index === 6 && word.x > 930 && word.x < 1290;
            return (
              <rect
                key={`${index}-${position}`}
                x={word.x}
                y={row.y}
                width={word.width}
                height={30}
                rx={7}
                fill={answer ? "#f4f2ee" : "#ffffff"}
                opacity={answer ? 0.95 : 0.07 + ((index + position) % 3) * 0.035}
              />
            );
          })
        )}
        {cuts.map((x, position) => (
          <line
            key={x}
            x1={x}
            y1={-80}
            x2={x}
            y2={980}
            stroke={position === 2 ? "#ef2b2b" : "#ffffff"}
            strokeWidth={position === 2 ? 3 : 1.5}
            strokeDasharray={position === 2 ? "0" : "10 12"}
            opacity={position === 2 ? 0.95 : 0.22}
          />
        ))}
      </g>
    </svg>
  );
};

/** ragbench: a query at the centre, documents around it, the best matches lit up and ranked. */
const BenchArt = () => {
  const random = seeded(23);
  const centre = { x: 1090, y: 440 };
  const dots = Array.from({ length: 150 }, () => {
    const angle = random() * Math.PI * 2;
    const distance = 60 + Math.pow(random(), 0.7) * 640;
    return { x: centre.x + Math.cos(angle) * distance, y: centre.y + Math.sin(angle) * distance * 0.78, distance, size: 2 + random() * 4 };
  });
  const nearest = [...dots].sort((a, b) => a.distance - b.distance).slice(0, 7);

  return (
    <svg {...FRAME} className={CLASS} aria-hidden="true">
      <defs>
        <radialGradient id="bench-glow" cx="68%" cy="48%" r="58%">
          <stop offset="0%" stopColor="#12324a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0b1622" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#08090b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#08090b" />
      <rect width="1600" height="900" fill="url(#bench-glow)" />
      {[120, 240, 380, 540, 720].map((radius) => (
        <ellipse key={radius} cx={centre.x} cy={centre.y} rx={radius} ry={radius * 0.78} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.1" />
      ))}
      {nearest.map((dot, position) => (
        <line key={`l-${position}`} x1={centre.x} y1={centre.y} x2={dot.x} y2={dot.y} stroke="#ef2b2b" strokeWidth="1.6" opacity={0.75 - position * 0.08} />
      ))}
      {dots.map((dot, position) => {
        const hit = nearest.includes(dot);
        return <circle key={position} cx={dot.x} cy={dot.y} r={hit ? dot.size + 3 : dot.size} fill={hit ? "#ff5a5a" : "#ffffff"} opacity={hit ? 1 : 0.16 + (position % 4) * 0.06} />;
      })}
      <circle cx={centre.x} cy={centre.y} r="15" fill="#ffffff" />
      <circle cx={centre.x} cy={centre.y} r="34" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
    </svg>
  );
};

/** AeroForge: streamlines bending around an airfoil, coloured like a pressure field. */
const FlowArt = () => {
  const lines = Array.from({ length: 26 }, (_, index) => {
    const y = 60 + index * 31;
    // Lines near the wing are pushed away from it; far lines stay almost straight.
    const offset = y - 455;
    const push = (offset >= 0 ? 1 : -1) * 150 * Math.exp(-Math.abs(offset) / 150);
    return { y, push, speed: Math.exp(-Math.abs(offset) / 220) };
  });

  return (
    <svg {...FRAME} className={CLASS} aria-hidden="true">
      <defs>
        <linearGradient id="flow-field" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="45%" stopColor="#60a5fa" />
          <stop offset="62%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <radialGradient id="flow-glow" cx="66%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#3b0f14" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0c1424" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#07080b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#07080b" />
      <rect width="1600" height="900" fill="url(#flow-glow)" />
      {lines.map((line) => (
        <path
          key={line.y}
          d={`M -40 ${line.y} C 520 ${line.y}, 700 ${line.y + line.push}, 1040 ${line.y + line.push} S 1420 ${line.y + line.push * 0.25}, 1660 ${line.y + line.push * 0.1}`}
          fill="none"
          stroke="url(#flow-field)"
          strokeWidth={1.2 + line.speed * 2.2}
          opacity={0.22 + line.speed * 0.6}
        />
      ))}
      <path
        d="M 760 455 C 800 392, 980 372, 1170 414 C 1260 432, 1330 448, 1372 458 C 1300 468, 1190 480, 1050 486 C 900 492, 790 486, 760 455 Z"
        fill="#0b0d12"
        stroke="#f4f2ee"
        strokeWidth="2.5"
      />
    </svg>
  );
};

const ART: Record<string, () => ReactElement> = {
  "oss-chunkaudit": ChunkArt,
  "oss-ragbench": BenchArt,
  "research-008": FlowArt,
};

/** The drawn background for a project, if it has one. */
export const panelArt = (id: string) => ART[id];
