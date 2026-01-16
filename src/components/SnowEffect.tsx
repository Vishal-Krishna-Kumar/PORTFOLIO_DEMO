


import './SnowEffect.css';

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function SnowEffect() {
  // Generate snowflake style for each dot
  const snowflakes = Array.from({ length: 80 }, (_, i) => {
    const left = getRandom(0, 100); // percent
    const size = getRandom(5, 10); // px
    const duration = getRandom(8, 18); // seconds
    const delay = getRandom(0, 10); // seconds
    const opacity = getRandom(0.7, 1);
    return (
      <div
        key={i}
        className="snowflake-dot"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity,
        }}
      />
    );
  });

  return <div className="snow-overlay">{snowflakes}</div>;
}
