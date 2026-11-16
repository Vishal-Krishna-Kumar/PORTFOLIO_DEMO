// Live Spotify data, used by /api/now-playing and /api/top-tracks.
//
// It is switched on by three environment variables:
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// When any of them is missing, or Spotify cannot be reached, callers fall back to the
// curated static list in music-data.js, so the music window never shows an error.

import { getValidAccessToken } from "./token-manager.js";

const API = "https://api.spotify.com/v1";

export function spotifyConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );
}

function toTrack(track) {
  const images = track?.album?.images ?? [];
  return {
    id: track.id,
    name: track.name,
    artists: (track.artists ?? []).map((artist) => artist.name),
    album: track.album?.name ?? "",
    // images are sorted largest first; the middle one (about 300px) is enough for the window
    album_image: (images[1] ?? images[0])?.url ?? "",
    spotify_url: track.external_urls?.spotify ?? "",
    preview_url: track.preview_url ?? null,
  };
}

async function spotifyGet(path) {
  const token = await getValidAccessToken();
  const response = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 204) return null; // nothing is playing
  if (!response.ok) throw new Error(`Spotify ${path} returned ${response.status}`);
  return response.json();
}

/** What is playing right now, or the most recently played track when nothing is. */
export async function getLiveNowPlaying() {
  const current = await spotifyGet("/me/player/currently-playing");
  if (current?.item && current.currently_playing_type === "track") {
    return { is_playing: Boolean(current.is_playing), item: toTrack(current.item), source: "spotify" };
  }
  const recent = await spotifyGet("/me/player/recently-played?limit=1");
  const last = recent?.items?.[0]?.track;
  if (last) {
    return { is_playing: false, item: toTrack(last), source: "spotify" };
  }
  return null;
}

/** Top tracks of roughly the last four weeks. */
export async function getLiveTopTracks(limit = 5) {
  const top = await spotifyGet(`/me/top/tracks?time_range=short_term&limit=${limit}`);
  const tracks = (top?.items ?? []).map(toTrack);
  return tracks.length ? { tracks, source: "spotify" } : null;
}
