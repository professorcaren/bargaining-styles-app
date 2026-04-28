# Bargaining Styles Self-Assessment

A phone-first, single-page web app that administers a 30-item forced-choice
self-assessment of bargaining-style inclinations and shows the test-taker their
profile across the five styles (Competing, Collaborating, Compromising,
Avoiding, Accommodating).

Built for SOCI 474 / MNGT 474 Week 1 ("Know Your Default").

## Files

- `index.html` — three-screen UI (intro, quiz, results)
- `styles.css` — mobile-first styles, dark-mode aware
- `app.js` — item loading/parsing, randomization, scoring, rendering. Pure vanilla JS, no deps
- `data.js` — item source path, letter→style mapping, profile descriptions
- `bsi-items.md` — source markdown for the 30 forced-choice item pairs

## Behavior

- Randomizes the 30-item question order on each session
- Randomizes the within-pair option order (so the same option is not always shown first)
- Loads item text from `bsi-items.md` and preserves each option's A/B/C/D/E letter for scoring
- Tallies A/B/C/D/E counts and maps to the five styles
- Highlights the dominant style; handles ties
- "Take it again" resets and re-randomizes
- "Previous" button lets the test-taker walk back one item
- No data leaves the browser (no analytics, no backend)

## Before you deploy

The app now reads the questionnaire text from `bsi-items.md`. Keep the source
format as numbered items with two lettered options per item (for example `A.`
or `E.`), because those letter codes determine which style each response scores
for.

The five-style profile descriptions in `STYLE_PROFILES` are written generically
about the well-known Blake/Mouton, Thomas/Kilmann five-style framework. Edit
freely for voice and length.

## Deploy to GitHub Pages

If you want to host this from its own repo:

```sh
cd bargaining-styles-app
git init
git add .
git commit -m "initial"
git branch -M main
git remote add origin <your repo URL>
git push -u origin main
```

Then in the repo's GitHub settings, enable Pages: Source = `main`, folder = `/ (root)`.

If you want to host it from a subfolder of an existing repo, set Pages source
to the branch and folder containing this app, or use a `/docs` directory.

## Local preview

```sh
cd bargaining-styles-app
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes on the public-deployment posture

GitHub Pages serves publicly. Reproducing the verbatim 30 items of a
copyrighted instrument on a public URL is a different posture than
classroom-only delivery via Canvas. Two cleaner paths if that matters for
your use case:

1. Host this on Canvas as an external tool / HTML page, where access is
   gated to enrolled students.
2. Use a public-domain or open-licensed instrument (e.g., the Rahim ROCI-II,
   subject to its own licensing) so the items can sit on a public page
   without further permission.

The randomization, scoring, and UI shell are agnostic to which instrument's
items you load.
