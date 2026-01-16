// Kept for reference only; logic moved into server.js to avoid dynamic import issues
import { getRandomNowPlaying } from "./music-data.js";

export default async function handler(req, res) {
  try {
    const nowPlaying = getRandomNowPlaying();
    return res.status(200).json(nowPlaying);
  } catch (error) {
    console.error("Error in now-playing API:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      is_playing: false,
      item: null
    });
  }
}
