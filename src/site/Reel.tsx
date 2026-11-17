import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export type Clip = {
  kind: "video" | "image";
  src: string;
  /** Shown over the clip, bottom left. */
  label?: string;
  /** Second, smaller line under the label (used for credits). */
  note?: string;
};

/** How long a still image stays up before the reel moves on. */
const IMAGE_SECONDS = 3.5;

/** True while the element is on screen; used to start and stop playback. */
export function useOnScreen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);

const ROUND =
  "grid place-items-center h-8 w-8 rounded-full bg-black/60 text-white border border-white/20 hover:bg-white hover:text-black transition-colors";

/**
 * Plays a list of clips one after another, forever. Videos start muted so browsers allow them
 * to play by themselves; a single video simply loops. It keeps going until the visitor pauses it
 * or it scrolls off screen.
 *
 * - "card":   fills its parent, small pause button only
 * - "hero":   fills its parent, with a caption
 * - "detail": a 16:9 player with caption, previous/next, pause and sound
 */
export const Reel = ({
  clips,
  variant,
  active = true,
  onIndexChange,
}: {
  clips: Clip[];
  variant: "card" | "hero" | "detail";
  active?: boolean;
  onIndexChange?: (index: number) => void;
}) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  const [muted, setMuted] = useState(true);
  // Media is only attached once the reel has been on screen, so off-screen cards cost nothing.
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const many = clips.length > 1;
  const clip = clips[index % clips.length];
  const playing = active && !paused;

  const go = (next: number) => {
    const target = (next + clips.length) % clips.length;
    setIndex(target);
    setProgress(0);
    onIndexChange?.(target);
  };

  useEffect(() => {
    if (active) setStarted(true);
  }, [active]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    element.muted = muted;
    if (playing) element.play().catch(() => {});
    else element.pause();
  }, [playing, muted, started, clip.src]);

  useEffect(() => {
    if (clip.kind !== "image" || !playing || !many) return;
    const timer = window.setInterval(
      () => setProgress((value) => value + 0.1 / IMAGE_SECONDS),
      100
    );
    return () => window.clearInterval(timer);
  }, [clip.kind, clip.src, playing, many]);

  useEffect(() => {
    if (clip.kind === "image" && progress >= 1) go(index + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const stop = (handler: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    handler();
  };

  const cover = variant !== "detail" && clip.kind === "video";
  const mediaClass = `reel-fade absolute inset-0 w-full h-full ${
    variant === "card" ? "card-zoom " : ""
  }${cover ? "object-cover" : variant === "detail" ? "object-contain" : "object-contain p-3"}`;

  return (
    <div
      className={`reel overflow-hidden bg-[#0b0d12] ${
        variant === "detail" ? "relative aspect-video rounded-xl border border-white/10" : "absolute inset-0"
      }`}
    >
      {started &&
        (clip.kind === "video" ? (
          <video
            key={clip.src}
            ref={videoRef}
            src={clip.src}
            muted
            autoPlay
            playsInline
            loop={!many}
            preload="auto"
            className={mediaClass}
            onEnded={() => go(index + 1)}
            onTimeUpdate={(event) => {
              const element = event.currentTarget;
              if (element.duration) setProgress(element.currentTime / element.duration);
            }}
          />
        ) : (
          <img key={clip.src} src={clip.src} alt={clip.label ?? ""} className={mediaClass} />
        ))}

      {/* One bar per clip, filling as it plays */}
      {many && (
        <div className="absolute top-0 inset-x-0 z-10 flex gap-1 p-2.5">
          {clips.map((item, position) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show clip ${position + 1} of ${clips.length}`}
              onClick={stop(() => go(position))}
              className="group/bar grow h-3 flex items-center"
            >
              <span className="block w-full h-[3px] rounded-full bg-white/25 overflow-hidden group-hover/bar:h-[5px] transition-all">
                <span
                  className="block h-full bg-white"
                  style={{
                    width: `${position < index ? 100 : position === index ? Math.min(progress, 1) * 100 : 0}%`,
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      )}

      <div
        className={`absolute bottom-0 inset-x-0 z-10 flex items-end justify-between gap-3 p-3 ${
          variant === "card" ? "" : "bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-10"
        }`}
      >
        <div className="min-w-0">
          {variant !== "card" && clip.label && (
            <p className="text-sm font-medium text-white truncate">{clip.label}</p>
          )}
          {variant === "detail" && clip.note && <p className="text-xs text-gray-300 truncate">{clip.note}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {variant === "detail" && many && (
            <>
              <button type="button" aria-label="Previous clip" onClick={stop(() => go(index - 1))} className={ROUND}>
                <Icon>
                  <path d="M15.5 5.5v13l-9-6.5z" />
                </Icon>
              </button>
              <button type="button" aria-label="Next clip" onClick={stop(() => go(index + 1))} className={ROUND}>
                <Icon>
                  <path d="M8.5 5.5v13l9-6.5z" />
                </Icon>
              </button>
            </>
          )}
          {variant === "detail" && clip.kind === "video" && (
            <button
              type="button"
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              onClick={stop(() => setMuted((value) => !value))}
              className={ROUND}
            >
              <Icon>
                {muted ? (
                  <path d="M4 9v6h4l5 4V5L8 9zm12.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" />
                ) : (
                  <path d="M4 9v6h4l5 4V5L8 9zm11.5 3a4 4 0 0 0-2-3.5v7a4 4 0 0 0 2-3.5zm-2-8.2v2.1a7 7 0 0 1 0 12.2v2.1a9 9 0 0 0 0-16.4z" />
                )}
              </Icon>
            </button>
          )}
          <button
            type="button"
            aria-label={paused ? "Play" : "Pause"}
            onClick={stop(() => setPaused((value) => !value))}
            className={ROUND}
          >
            <Icon>{paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zm6 0h4v14h-4z" />}</Icon>
          </button>
        </div>
      </div>
    </div>
  );
};
