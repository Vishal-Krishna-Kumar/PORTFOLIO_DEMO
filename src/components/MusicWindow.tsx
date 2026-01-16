import React, { useEffect, useRef, useState } from "react";

type SimpleTrack = {
  name: string;
  artist: string;
  cover: string;
};

// Local-safe fallback (no external CDN dependency)
const FALLBACK_COVER =
  "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'>\
  <rect width='300' height='300' fill='%23111'/>\
  <text x='50%' y='50%' fill='%23cbd5f5' font-size='24' font-family='Arial' text-anchor='middle' dominant-baseline='middle'>No Cover</text>\
</svg>";

// Static fallbacks (Spotify CDN covers)
const fallbackTopTracks: SimpleTrack[] = [
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    cover: FALLBACK_COVER,
  },
  {
    name: "As It Was",
    artist: "Harry Styles",
    cover: FALLBACK_COVER,
  },
  {
    name: "Heat Waves",
    artist: "Glass Animals",
    cover: FALLBACK_COVER,
  },
  {
    name: "Starboy",
    artist: "The Weeknd",
    cover: FALLBACK_COVER,
  },
  {
    name: "Save Your Tears",
    artist: "The Weeknd",
    cover: FALLBACK_COVER,
  },
];

const fallbackNowPlaying: SimpleTrack = {
  name: "Starboy",
  artist: "The Weeknd ft. Daft Punk",
  cover: FALLBACK_COVER,
};

interface MusicWindowProps {
  isDark: boolean;
}

const MusicWindow: React.FC<MusicWindowProps> = ({ isDark }) => {
  const [nowPlaying, setNowPlaying] = useState<SimpleTrack>(fallbackNowPlaying);
  const [tracks, setTracks] = useState<SimpleTrack[]>(fallbackTopTracks);
  const lastNowPlayingIdRef = useRef<string | null>(null);
  const lastTopFirstIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    function scheduleAtBoundary(periodMs: number, fn: () => void) {
      const now = Date.now();
      const msUntilNext = periodMs - (now % periodMs);
      const timeout = window.setTimeout(() => {
        fn();
        const interval = window.setInterval(fn, periodMs);
        cleanupFns.push(() => window.clearInterval(interval));
      }, msUntilNext);
      cleanupFns.push(() => window.clearTimeout(timeout));
    }

    const cleanupFns: Array<() => void> = [];

    async function loadNowPlaying() {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const item = data?.item;
        const nextId = item?.id ? String(item.id) : null;
        if (nextId && nextId === lastNowPlayingIdRef.current) return;
        if (item && mounted) {
          lastNowPlayingIdRef.current = nextId;
          setNowPlaying({
            name: item.name || fallbackNowPlaying.name,
            artist: Array.isArray(item.artists)
              ? item.artists.join(", ")
              : fallbackNowPlaying.artist,
            cover: item.album_image || FALLBACK_COVER,
          });
        }
      } catch (err) {
        // keep fallback
      }
    }

    async function loadTopTracks() {
      try {
        const res = await fetch("/api/top-tracks", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list = data?.tracks || [];
        if (Array.isArray(list) && list.length && mounted) {
          const firstId = list?.[0]?.id ? String(list[0].id) : null;
          if (firstId && firstId === lastTopFirstIdRef.current) return;
          lastTopFirstIdRef.current = firstId;
          const mapped: SimpleTrack[] = list.slice(0, 5).map((t: any) => ({
            name: t.name || "Untitled",
            artist: Array.isArray(t.artists) ? t.artists.join(", ") : "",
            cover: t.album_image || FALLBACK_COVER,
          }));
          setTracks(mapped);
        }
      } catch (err) {
        // keep fallback
      }
    }

    loadNowPlaying();
    loadTopTracks();

    // Exactly every 10 minutes (aligned to 00, 10, 20, ...)
    scheduleAtBoundary(10 * 60 * 1000, loadNowPlaying);

    // Exactly every hour (aligned to HH:00)
    scheduleAtBoundary(60 * 60 * 1000, loadTopTracks);

    // Backup polling: ensures updates even if timers are throttled.
    // (Doesn't change cadence of the song selection; it just re-checks.)
    const nowPoll = window.setInterval(loadNowPlaying, 30_000);
    const topPoll = window.setInterval(loadTopTracks, 60_000);
    cleanupFns.push(() => window.clearInterval(nowPoll));
    cleanupFns.push(() => window.clearInterval(topPoll));

    // If the tab is backgrounded, browsers may throttle timers;
    // refresh when the user returns so it never looks "stuck".
    const onVisible = () => {
      if (!mounted) return;
      if (document.visibilityState === "visible") {
        loadNowPlaying();
        loadTopTracks();
      }
    };
    const onFocus = () => {
      if (!mounted) return;
      loadNowPlaying();
      loadTopTracks();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    cleanupFns.push(() => document.removeEventListener("visibilitychange", onVisible));
    cleanupFns.push(() => window.removeEventListener("focus", onFocus));

    return () => {
      mounted = false;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const panelBg = isDark ? "bg-[#0c0c0f]" : "bg-white";
  const border = isDark ? "border border-gray-800" : "border border-gray-200";
  const heading = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`h-full flex flex-col ${panelBg} ${border} rounded-xl p-4 gap-4 shadow-inner`}> 
      {/* Now Playing */}
      <div className="flex items-center gap-4">
        <img
          src={nowPlaying.cover}
          alt={nowPlaying.name}
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_COVER) e.currentTarget.src = FALLBACK_COVER;
          }}
          className="w-16 h-16 rounded-md object-cover shadow-md"
        />
        <div className="flex-1 min-w-0">
          <p className={`text-base font-semibold truncate ${heading}`}>
            {nowPlaying.name}
          </p>
          <p className={`text-sm truncate ${subtext}`}>
            {nowPlaying.artist}
          </p>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="flex-1 overflow-y-auto">
        <p className={`text-sm font-semibold mb-3 ${isDark ? "text-blue-300" : "text-[#2A8EE0]"}`}>
          Top Tracks
        </p>
        <div className="space-y-3">
          {tracks.map((track, idx) => (
            <div
              key={`${track.name}-${idx}`}
              className="flex items-center gap-3 group"
            >
              <img
                src={track.cover}
                alt={track.name}
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_COVER) e.currentTarget.src = FALLBACK_COVER;
                }}
                className="w-9 h-9 rounded-md object-cover shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm truncate transition-colors ${
                    isDark
                      ? "text-white group-hover:text-blue-300"
                      : "text-gray-900 group-hover:text-[#2A8EE0]"
                  }`}
                >
                  {track.name}
                </p>
                <p className={`text-xs truncate ${subtext}`}>
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Spotify Profile Connect Button at the very bottom */}
      <div className="flex justify-center mt-auto pt-2">
        <a
          href="https://open.spotify.com/user/31m2ok63ld6ajumhxnb7yloh2gku"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="84" cy="84" r="84" fill="#1ED760"/>
            <path d="M123.6 116.1c-2.1 3.5-6.6 4.6-10.1 2.5-27.7-16.9-62.7-20.7-103.8-11.2-4 0.9-8-1.6-8.9-5.6-0.9-4 1.6-8 5.6-8.9 44.6-10 82.1-6 112.1 12.5 3.5 2.1 4.6 6.6 2.5 10.1zm14.3-25.6c-2.6 4.2-8.1 5.6-12.3 3-31.8-19.4-80.2-25-117.7-13.5-4.7 1.4-9.7-1.2-11.1-5.9-1.4-4.7 1.2-9.7 5.9-11.1 41.7-12.4 94.1-6.3 129.2 15.1 4.2 2.6 5.6 8.1 3 12.4zm0.7-27.2C99.7 48.7 48.6 47.2 19.2 55.7c-5.3 1.5-10.8-1.5-12.3-6.8-1.5-5.3 1.5-10.8 6.8-12.3 33.7-9.6 90.7-7.8 127.6 16.2 4.7 2.9 6.2 9.1 3.3 13.8-2.9 4.7-9.1 6.2-13.8 3.3z" fill="#fff"/>
          </svg>
          Connect on Spotify
        </a>
      </div>
    </div>
  );
};

export default MusicWindow;
