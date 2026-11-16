// Shared token management for Spotify API
import {
  isRateLimited,
  getRateLimitInfo,
  handleRateLimitResponse,
} from "./rate-limit-manager.js";

let cachedAccessToken = null;
let tokenExpiresAt = 0;

export async function getValidAccessToken() {
  // Check if we're currently rate limited
  if (isRateLimited()) {
    const rateLimitInfo = getRateLimitInfo();
    throw new Error(
      `Rate limited. Retry after ${rateLimitInfo.remainingSeconds} seconds.`
    );
  }
  // Check if we have a valid cached token
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  // Token expired or doesn't exist, refresh it
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error("SPOTIFY_REFRESH_TOKEN not set in environment variables");
  }

  const tokenParams = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenParams.toString(),
  });

  // Handle rate limiting for token refresh
  const rateLimitResult = handleRateLimitResponse(tokenRes);
  if (rateLimitResult.isRateLimited) {
    throw new Error(rateLimitResult.message);
  }

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    throw new Error(
      `Failed to refresh access token: ${JSON.stringify(tokenData)}`
    );
  }

  // Cache the new token with expiration (subtract 5 minutes for safety buffer)
  cachedAccessToken = tokenData.access_token;
  const expiresInMs = (tokenData.expires_in - 300) * 1000; // 5 min buffer
  tokenExpiresAt = Date.now() + expiresInMs;

  console.log(
    `New Spotify token cached, expires in ${tokenData.expires_in} seconds`
  );

  return cachedAccessToken;
}

// ---------------------------------------------------------------------------
// Live Spotify data, used by /api/now-playing and /api/top-tracks.
// Switched on by SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN.
// When any is missing, or Spotify cannot be reached, callers fall back to the static
// list in music-data.js. Kept in this file because the hosting plan limits the number
// of files in /api.
// ---------------------------------------------------------------------------

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
