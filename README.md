# Portfolio Screenshots


## Live Spotify

The music window shows real listening activity when three environment variables are set in
the Vercel project: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`.
Without them, or if Spotify cannot be reached, it shows the curated static list, so the window
never breaks.

One-time setup:

1. Create an app at https://developer.spotify.com/dashboard and add the redirect URI
   `https://www.vishal-krishna.me/api/callback`.
2. In Vercel, set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and
   `SPOTIFY_REDIRECT_URI` (the same redirect URI), then redeploy.
3. Open `https://www.vishal-krishna.me/api/login`, sign in to Spotify and approve. The
   callback page shows a refresh token.
4. Add that value in Vercel as `SPOTIFY_REFRESH_TOKEN` and redeploy.

The endpoints are `/api/now-playing` (what is playing now, or the last played track) and
`/api/top-tracks` (top five of roughly the last four weeks). Responses are cached at the edge
so visitors do not use up the Spotify rate limit.
