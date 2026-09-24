# rohitmaruri.is-a.dev

Personal site for Rohit Maruri — work, experience, résumé, and contact.

Three files, no build step, no dependencies. `index.html`, `styles.css`, `script.js`
ship exactly as written; GitHub Pages serves the directory as-is.

## Local preview

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## Design

Warm paper canvas, terracotta accent, Lora italic for display type and Inter for body —
matching the palette and type treatment of the Extern portfolio, so the two read as the
same person's work.

| Token | Light | Dark |
| ----- | ----- | ---- |
| canvas | `#FAF4ED` | `#16110E` |
| surface (cards) | `#F0E6DA` | `#241C17` |
| text | `#1C1B1B` | `#F3E9DE` |
| heading | `#9D522C` | `#E09468` |
| accent | `#C07048` | `#D98455` |
| border | `#E5E2E1` | `#33291F` |

Radii are 24px (cards), 16px (inner), and a full pill for nav tabs, buttons, and chips.

## What's in here

| File | Purpose |
| ---- | ------- |
| `index.html` | All content, plus JSON-LD `Person` markup and Open Graph tags |
| `styles.css` | Design tokens, layout, animation. Light and dark swap on one attribute |
| `script.js` | Theme persistence, scrollspy, reveal-on-scroll, count-up |
| `assets/Rohit_Maruri_Resume.pdf` | The résumé the download buttons point at |
| `assets/portrait.jpg` | Hero portrait, served locally rather than hotlinked |
| `CNAME` | Custom domain |

## Notes

- **Warm paper is the default.** Dark is the same terracotta with the paper turned down,
  and it is opt-in: only an explicit choice or an OS dark preference selects it. The
  choice is written through a `try`/`catch`, so a blocked `localStorage` degrades to
  session-only rather than throwing.
- **The portrait needs `height: auto`.** The `width`/`height` attributes are there to
  reserve space before the image decodes, but the `height` attribute is a used value that
  beats `aspect-ratio` — without the override the circle renders as a 236×720 teardrop.
- **The arc caption rides a ring 32% wider than the photo.** Any tighter and the text
  lands on the portrait itself, where terracotta on a dark photo is unreadable.
- **Motion is gated on `prefers-reduced-motion`**: counters jump to their final value and
  every reveal starts visible.
- **No JS is a working site.** Reveal elements are the only thing JS un-hides, and the
  observer falls back to showing everything when `IntersectionObserver` is missing.

## Deployment

`.github/workflows/deploy-pages.yml` publishes the repository root to GitHub Pages on
every push to `main`.
