import { useEffect, useRef, useState } from "react";

const SOURCE = "/hero-scene.mp4";
const POSTER = "/hero-scene.webp";
/** How long, in seconds, the end of one pass dissolves into the start of the next. */
const DISSOLVE = 1.1;

/**
 * The scene at the top of the home page, playing forever.
 *
 * The clip starts close and ends wide, so a plain loop would snap from the last frame back to
 * the first. Two copies take turns instead: shortly before one finishes, the other starts from
 * the beginning and fades in over it. Visitors who ask for reduced motion get the still image.
 */
const HeroVideo = () => {
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState(0);
  const [still] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (still) return;
    const players = [first.current, second.current];
    if (!players[0] || !players[1]) return;
    let current = 0;
    let handing = false;

    const watch = () => {
      const active = players[current];
      if (!active || handing || !active.duration) return;
      if (active.duration - active.currentTime <= DISSOLVE) {
        handing = true;
        const next = players[1 - current];
        if (!next) return;
        next.currentTime = 0;
        next.play().catch(() => {});
        current = 1 - current;
        setFront(current);
        // Once the fade is over, the old copy is rewound and waits for its next turn.
        window.setTimeout(() => {
          active.pause();
          handing = false;
        }, DISSOLVE * 1000 + 100);
      }
    };
    // If a copy ever reaches its end without handing over (a stalled tab, say), start it again.
    const restart = (event: Event) => {
      const player = event.currentTarget as HTMLVideoElement;
      if (players[current] === player) {
        player.currentTime = 0;
        player.play().catch(() => {});
      }
    };

    players.forEach((player) => {
      player?.addEventListener("timeupdate", watch);
      player?.addEventListener("ended", restart);
    });
    players[0].play().catch(() => {});
    return () => {
      players.forEach((player) => {
        player?.removeEventListener("timeupdate", watch);
        player?.removeEventListener("ended", restart);
      });
    };
  }, [still]);

  if (still) return <img src={POSTER} alt="" className="h-full w-full object-cover" />;

  return (
    <>
      {[first, second].map((ref, position) => (
        <video
          key={position}
          ref={ref}
          src={SOURCE}
          poster={position === 0 ? POSTER : undefined}
          muted
          playsInline
          preload="auto"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          style={{ opacity: front === position ? 1 : 0, zIndex: front === position ? 1 : 0 }}
        />
      ))}
    </>
  );
};

export default HeroVideo;
