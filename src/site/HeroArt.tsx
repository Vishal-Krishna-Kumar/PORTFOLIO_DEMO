import { useEffect, useState } from "react";

// The scene behind the top of the home page: a figure on a hill looking out over a dark sea
// toward a low red sun. Drawn as vector shapes in the site's own colours, so it is sharp at any
// size. To go back to the plain red glow, render <div className="ink-glow" /> in its place.

/** A small repeatable random-number source, so the scene is the same on every visit. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const HORIZON = 540;
const SUN = { x: 1120, y: HORIZON };

const HeroArt = () => {
  const random = seeded(11);

  // On a tall, narrow screen only the middle of a wide picture would show, which misses the
  // sun and the figure. There the scene is framed on its right-hand side instead.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Glints on the water: short strokes, denser and brighter in the path of light under the sun.
  const glints = Array.from({ length: 230 }, () => {
    const depth = Math.pow(random(), 1.4); // 0 at the horizon, 1 at the bottom
    const y = HORIZON + 6 + depth * 330;
    const spread = 120 + depth * 900;
    const inPath = random() < 0.62;
    const x = inPath ? SUN.x + (random() - 0.5) * spread : random() * 1600;
    const closeness = Math.max(0, 1 - Math.abs(x - SUN.x) / 520);
    return {
      x,
      y,
      width: 10 + depth * 46 + random() * 20,
      opacity: 0.1 + closeness * 0.55 + random() * 0.12,
      warm: closeness > 0.35,
      delay: random() * 6,
    };
  });

  const stars = Array.from({ length: 70 }, () => ({
    x: random() * 1600,
    y: random() * (HORIZON - 150),
    size: 0.6 + random() * 1.5,
    opacity: 0.15 + random() * 0.5,
    delay: random() * 5,
  }));

  return (
    <svg
      viewBox={narrow ? "780 0 760 900" : "0 0 1600 900"}
      preserveAspectRatio="xMidYMid slice"
      className="hero-art absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050506" />
          <stop offset="55%" stopColor="#1a0709" />
          <stop offset="100%" stopColor="#5a1012" />
        </linearGradient>
        <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5a4a" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#c81e1e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7a0f10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9c2" />
          <stop offset="100%" stopColor="#ef2b2b" />
        </linearGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a0a0c" />
          <stop offset="40%" stopColor="#0d0708" />
          <stop offset="100%" stopColor="#060607" />
        </linearGradient>
        <clipPath id="hero-above">
          <rect x="0" y="0" width="1600" height={HORIZON} />
        </clipPath>
      </defs>

      {/* Sky, stars, sun */}
      <rect x="0" y="0" width="1600" height={HORIZON} fill="url(#hero-sky)" />
      {stars.map((star, position) => (
        <circle
          key={position}
          className="hero-twinkle"
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="#fff"
          opacity={star.opacity}
          style={{ animationDelay: `${star.delay}s`, ["--o" as string]: star.opacity }}
        />
      ))}
      <ellipse className="hero-halo" cx={SUN.x} cy={SUN.y} rx="560" ry="330" fill="url(#hero-halo)" />
      <circle cx={SUN.x} cy={SUN.y} r="96" fill="url(#hero-sun)" clipPath="url(#hero-above)" />

      {/* Sea */}
      <rect x="0" y={HORIZON} width="1600" height={900 - HORIZON} fill="url(#hero-sea)" />
      <line x1="0" y1={HORIZON} x2="1600" y2={HORIZON} stroke="#ff8a7a" strokeWidth="1.2" opacity="0.55" />
      {glints.map((glint, position) => (
        <rect
          key={position}
          className="hero-twinkle"
          x={glint.x - glint.width / 2}
          y={glint.y}
          width={glint.width}
          height={2.2}
          rx={1.1}
          fill={glint.warm ? "#ffb4a2" : "#f4f2ee"}
          opacity={glint.opacity}
          style={{ animationDelay: `${glint.delay}s`, ["--o" as string]: glint.opacity }}
        />
      ))}

      {/* The hill in front, and someone standing on it looking out */}
      <path
        d="M 0 900 L 0 812 C 260 790, 520 800, 800 770 C 1010 748, 1180 690, 1330 672 C 1450 658, 1540 668, 1600 676 L 1600 900 Z"
        fill="#040d17"
        stroke="#ff8a7a"
        strokeWidth="1.2"
        strokeOpacity="0.35"
      />
      <g transform="translate(1322 673)" fill="#040d17" stroke="#ff8a7a" strokeWidth="1.2" strokeOpacity="0.55">
        <circle cx="0" cy="-104" r="12.5" />
        <path d="M -11 -90 C -14 -62, -13 -44, -9 -40 L -11 0 L -3 0 L 0 -36 L 3 0 L 11 0 L 9 -40 C 13 -44, 14 -62, 11 -90 Z" />
        <path d="M -11 -86 C -24 -70, -24 -56, -15 -46 L -11 -50 C -17 -58, -16 -68, -8 -78 Z" />
        <path d="M 11 -86 C 24 -70, 24 -56, 15 -46 L 11 -50 C 17 -58, 16 -68, 8 -78 Z" />
      </g>
    </svg>
  );
};

export default HeroArt;
