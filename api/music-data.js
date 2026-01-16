// Static music data (no Spotify API usage).
// Covers are served from /public/music.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const TEN_MINUTES_MS = 10 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;

const FALLBACK_TRACKS = [
  {
    id: "calm-down",
    name: "Calm Down",
    artists: ["Rema", "Selena Gomez"],
    album: "Rave & Roses",
    album_image: "/music/calm-down.jpg",
    spotify_url: "",
    preview_url: null,
  },
  {
    id: "attention",
    name: "Attention",
    artists: ["Charlie Puth"],
    album: "Voicenotes",
    album_image: "/music/attention.jpg",
    spotify_url: "",
    preview_url: null,
  },
  {
    id: "as-it-was",
    name: "As It Was",
    artists: ["Harry Styles"],
    album: "Harry's House",
    album_image: "/music/as-it-was.jpg",
    spotify_url: "",
    preview_url: null,
  },
  {
    id: "blinding-lights",
    name: "Blinding Lights",
    artists: ["The Weeknd"],
    album: "After Hours",
    album_image: "/music/blinding-lights.jpg",
    spotify_url: "",
    preview_url: null,
  },
  {
    id: "what-was-i-made-for",
    name: "What Was I Made For?",
    artists: ["Billie Eilish"],
    album: "Barbie The Album",
    album_image: "/music/what-was-i-made-for.jpg",
    spotify_url: "",
    preview_url: null,
  },
];

export const curatedTopTracks = FALLBACK_TRACKS;

let cachedLocalTracks = null;
let cachedLocalTracksAt = 0;
let cachedSource = "fallback";

function safeTitleCase(input) {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getMusicDirPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, "..", "public", "music");
}

function isAllowedImageFile(fileName) {
  const lower = fileName.toLowerCase();
  if (lower === "default-cover.svg") return false;
  return (
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".svg")
  );
}

function buildTracksFromLocalImages(fileNames) {
  const sorted = [...fileNames].sort((a, b) => a.localeCompare(b));
  return sorted.map((fileName) => {
    const base = fileName.replace(/\.[^.]+$/, "");
    return {
      id: base,
      name: safeTitleCase(base),
      artists: ["Various Artists"],
      album: "Local Playlist",
      album_image: `/music/${encodeURIComponent(fileName)}`,
      spotify_url: "",
      preview_url: null,
    };
  });
}

function getLocalTracksWithCache() {
  const now = Date.now();

  // Refresh list at most once per minute to keep requests cheap.
  if (cachedLocalTracks && now - cachedLocalTracksAt < 60_000) {
    return cachedLocalTracks;
  }

  try {
    const musicDir = getMusicDirPath();
    const fileNames = fs
      .readdirSync(musicDir)
      .filter((name) => isAllowedImageFile(name));
    const tracks = buildTracksFromLocalImages(fileNames);

    cachedLocalTracks = tracks.length ? tracks : FALLBACK_TRACKS;
    cachedSource = tracks.length ? "local" : "fallback";
    cachedLocalTracksAt = now;
    return cachedLocalTracks;
  } catch (_err) {
    cachedLocalTracks = FALLBACK_TRACKS;
    cachedSource = "fallback";
    cachedLocalTracksAt = now;
    return cachedLocalTracks;
  }
}

function rotatedIndex(periodMs, length, now = Date.now()) {
  if (!length) return 0;
  return Math.floor(now / periodMs) % length;
}

function rotateArray(list, startIndex) {
  if (!Array.isArray(list) || list.length === 0) return [];
  const start = ((startIndex % list.length) + list.length) % list.length;
  return [...list.slice(start), ...list.slice(0, start)];
}

// Top Tracks: rotates the ordering hourly so the first track changes every hour.
export function getCuratedTopTracks() {
  const tracks = getLocalTracksWithCache();
  const start = rotatedIndex(ONE_HOUR_MS, tracks.length);
  return { tracks: rotateArray(tracks, start) };
}

// Now Playing: picks a different song every 10 minutes.
export function getCuratedNowPlaying() {
  const tracks = getLocalTracksWithCache();
  const idx = rotatedIndex(TEN_MINUTES_MS, tracks.length);
  const item = tracks[idx] || null;
  return {
    is_playing: Boolean(item),
    item,
  };
}

export function getMusicRotationStatus(now = Date.now()) {
  const tracks = getLocalTracksWithCache();
  const trackCount = tracks.length;

  const nowPlayingIndex = rotatedIndex(TEN_MINUTES_MS, trackCount, now);
  const topTracksStartIndex = rotatedIndex(ONE_HOUR_MS, trackCount, now);

  const nextNowPlayingChangeAt = now + (TEN_MINUTES_MS - (now % TEN_MINUTES_MS));
  const nextTopTracksChangeAt = now + (ONE_HOUR_MS - (now % ONE_HOUR_MS));

  return {
    source: cachedSource,
    trackCount,
    nowPlayingIndex,
    topTracksStartIndex,
    nowPlayingPeriodMs: TEN_MINUTES_MS,
    topTracksPeriodMs: ONE_HOUR_MS,
    nextNowPlayingChangeAt,
    nextTopTracksChangeAt,
  };
}

// Legacy exports (kept in case other code imports them)
export function getRandomNowPlaying() {
  return getCuratedNowPlaying();
}

export function getRandomTopTracks() {
  return getCuratedTopTracks();
}
