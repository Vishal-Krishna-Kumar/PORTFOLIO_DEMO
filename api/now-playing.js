// GET /api/now-playing
// Live Spotify data when the SPOTIFY_* environment variables are set; otherwise, or if Spotify
// fails, the curated static list. The response shape is the same either way.
import { getRandomNowPlaying } from "./music-data.js";
import { getLiveNowPlaying, spotifyConfigured } from "./spotify-live.js";

export default async function handler(req, res) {
  if (spotifyConfigured()) {
    try {
      const live = await getLiveNowPlaying();
      if (live) {
        // Let Vercel's edge cache absorb repeated polling so the Spotify rate limit is not hit.
        res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
        return res.status(200).json(live);
      }
    } catch (error) {
      console.error("Spotify now-playing failed, using static data:", error.message);
    }
  }

  try {
    return res.status(200).json({ ...getRandomNowPlaying(), source: "static" });
  } catch (error) {
    console.error("Error in now-playing API:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      is_playing: false,
      item: null,
    });
  }
}
