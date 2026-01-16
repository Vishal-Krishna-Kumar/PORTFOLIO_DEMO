const BASE_URL = process.env.MUSIC_WATCH_BASE_URL || "http://localhost:3000";
const POLL_MS = Number(process.env.MUSIC_WATCH_POLL_MS || 5000);

function iso(ts = Date.now()) {
  return new Date(ts).toISOString();
}

function fmtLocalTime(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

async function httpGetJson(url) {
  // Node 18+ has fetch. If not, fall back to http/https.
  if (typeof fetch === "function") {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "Cache-Control": "no-store" },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
    }
    return await res.json();
  }

  const { request } = await import(url.startsWith("https") ? "node:https" : "node:http");

  return new Promise((resolve, reject) => {
    const req = request(
      url,
      {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage} ${data}`));
          }
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function getStatus() {
  // Add a cache-busting query param
  const ts = Date.now();
  return await httpGetJson(`${BASE_URL}/api/music-status?ts=${ts}`);
}

async function getNowPlaying() {
  const ts = Date.now();
  return await httpGetJson(`${BASE_URL}/api/now-playing?ts=${ts}`);
}

async function getTopTracks() {
  const ts = Date.now();
  return await httpGetJson(`${BASE_URL}/api/top-tracks?ts=${ts}`);
}

function summarizeTrack(track) {
  if (!track) return "(null)";
  const artist = Array.isArray(track.artists) ? track.artists.join(", ") : "";
  return `${track.name || "Untitled"}${artist ? ` — ${artist}` : ""} (${track.album_image || "no-cover"})`;
}

async function main() {
  console.log(`[music-watch] base: ${BASE_URL}`);
  console.log(`[music-watch] poll: ${POLL_MS}ms`);

  let lastNowPlayingIndex = null;
  let lastTopStartIndex = null;
  let lastSource = null;
  let lastCount = null;

  while (true) {
    try {
      const status = await getStatus();

      const sourceChanged = lastSource !== null && status.source !== lastSource;
      const countChanged = lastCount !== null && status.trackCount !== lastCount;
      const nowChanged = lastNowPlayingIndex !== null && status.nowPlayingIndex !== lastNowPlayingIndex;
      const topChanged = lastTopStartIndex !== null && status.topTracksStartIndex !== lastTopStartIndex;

      if (lastSource === null) {
        console.log(
          `[${iso()}] status: source=${status.source} tracks=${status.trackCount} nowIdx=${status.nowPlayingIndex} topStart=${status.topTracksStartIndex}`
        );
        console.log(
          `           next now-playing: ${fmtLocalTime(status.nextNowPlayingChangeAt)} | next top-tracks: ${fmtLocalTime(status.nextTopTracksChangeAt)}`
        );
      }

      if (sourceChanged || countChanged) {
        console.log(
          `[${iso()}] status changed: source=${status.source} tracks=${status.trackCount}`
        );
      }

      if (nowChanged) {
        const nowPlaying = await getNowPlaying();
        console.log(
          `[${iso()}] NOW PLAYING changed -> idx=${status.nowPlayingIndex} | ${summarizeTrack(nowPlaying?.item)}`
        );
      }

      if (topChanged) {
        const top = await getTopTracks();
        const first = Array.isArray(top?.tracks) ? top.tracks[0] : null;
        console.log(
          `[${iso()}] TOP TRACK #1 changed -> start=${status.topTracksStartIndex} | ${summarizeTrack(first)}`
        );
      }

      lastNowPlayingIndex = status.nowPlayingIndex;
      lastTopStartIndex = status.topTracksStartIndex;
      lastSource = status.source;
      lastCount = status.trackCount;
    } catch (e) {
      console.log(`[${iso()}] watcher error: ${e?.message || e}`);
    }

    await new Promise((r) => setTimeout(r, POLL_MS));
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
