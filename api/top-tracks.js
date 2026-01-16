// Kept for reference only; logic moved into server.js to avoid dynamic import issues
import { getRandomTopTracks } from "./music-data.js";

export default async function handler(req, res) {
  try {
    const topTracks = getRandomTopTracks();
    return res.status(200).json(topTracks);
  } catch (error) {
    console.error("Error in top-tracks API:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      tracks: []
    });
  }
}
