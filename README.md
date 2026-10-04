# Wedding Invitation

A static, no-build wedding invitation website. Share one link and anyone can open it on their phone.

## Customise
1. Edit `js/config.js` — names, date, story, events, venue, RSVP.
2. Drop photos in `assets/photos/` (names referenced in config). Missing photos are skipped gracefully.
3. Opening animation: put an `.mp4` in `assets/intro/` and set `introVideo`; otherwise the built-in envelope plays.
4. Optional music: put an mp3 in `assets/` and set `music`.

## Preview locally
    python3 -m http.server 8000   # then open http://localhost:8000

## Publish on Vercel (free)
1. Push this repo to GitHub.
2. Go to vercel.com → Add New → Project → import `wedding-invite`.
3. Framework preset: **Other**. Leave build command and output directory empty. Click Deploy.
4. Share the `https://<project>.vercel.app` link. Every push to the deployed branch redeploys it.

Tip: keep photos under ~500 KB each so it loads fast on phones.
