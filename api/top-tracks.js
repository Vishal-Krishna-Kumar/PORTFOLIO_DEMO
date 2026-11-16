// GET /api/top-tracks
// Live Spotify data when the SPOTIFY_* environment variables are set; otherwise, or if Spotify
// fails, the curated static list. The response shape is the same either way.
import { getRandomTopTracks } from "./music-data.js";
import { getLiveTopTracks, spotifyConfigured } from "./token-manager.js";

export default async function handler(req, res) {
  if (spotifyConfigured()) {
    try {
      const live = await getLiveTopTracks(5);
      if (live) {
        // Top tracks change slowly; cache for an hour.
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
        return res.status(200).json(live);
      }
    } catch (error) {
      console.error("Spotify top-tracks failed, using static data:", error.message);
    }
  }

  try {
    return res.status(200).json({ ...getRandomTopTracks(), source: "static" });
  } catch (error) {
    console.error("Error in top-tracks API:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      tracks: [],
    });
  }
}
