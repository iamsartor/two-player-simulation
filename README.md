# Race Sim Duo

A race simulation for two athletes on two phones. No server, no database, no accounts: nothing is sent anywhere.

## How it works

1. **Phone A** picks the workout (Race Sim Duo, the 16-station race sim, or a race sim pasted from the club app's workout library), the times and both athletes' first stations, then taps **Start**.
2. Phone A shows a QR code. **Phone B** scans it with the normal camera app and opens the same workout and the same countdown. A late scan is fine: B lands in the right slot.
3. From then on each phone works out *Now / Next / time left* from its own clock. Phones on automatic time agree to well under a second.
4. **Check clocks** (optional): phone A taps *Show clock QR*, phone B taps *Check clocks* and points its camera at it. B measures the difference (about 0.2 s accurate) and follows A's clock from then on.
5. Each athlete counts their own meters, lanes or reps. At the end one phone shows *My results QR* and the other scans it, so both athletes' numbers sit side by side. *Share as text* works too.

The screen stays on, changes flash, vibrate (Android) and beep, a reload or locked screen resumes where you were, and after the first visit the app works offline.

## Files

- `index.html` the whole app
- `sw.js` offline cache (bump `VERSION` with every change)
- `vendor/qrcode.min.js` QR code generator by Kazuhiko Arase (MIT)
- `vendor/jsQR.min.js` QR code reader by Cosmo Wolfe (Apache 2.0, see `vendor/jsQR-LICENSE.txt`), loaded only on phones without a built-in scanner (iPhone)
- `fonts/` Barlow and Barlow Condensed (SIL Open Font License, see `fonts/OFL.txt`)

## Privacy

The app stores the workout and your counts in your browser's local storage on your own phone. The camera is only used, after you allow it, to read a QR code on the other phone; no picture is stored or sent. GitHub Pages hosts the files and, like any web host, sees your IP address when the page loads.

## Publish

Settings > Pages > Deploy from a branch > `main` / root. The app is then at `https://<user>.github.io/two-player-simulation/`.
