# rohitmaruri.is-a.dev

Personal site for Rohit Maruri — work, experience, résumé, and contact.

Three files, no build step, no dependencies. `index.html`, `styles.css`, `script.js`
ship exactly as written; GitHub Pages serves the directory as-is.

## Local preview

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## What's in here

| File | Purpose |
| ---- | ------- |
| `index.html` | All content, plus JSON-LD `Person` markup and Open Graph tags |
| `styles.css` | Design tokens, layout, animation. Dark and light themes swap on one attribute |
| `script.js` | Theme persistence, scrollspy, reveal-on-scroll, count-up, typed subtitle, canvas backdrop |
| `assets/Rohit_Maruri_Resume.pdf` | The résumé the download buttons point at |
| `CNAME` | Custom domain |

## Notes

- **Theme** follows `prefers-color-scheme` on a first visit, then whatever the visitor
  last chose. Written through a `try`/`catch` so a blocked `localStorage` degrades to
  session-only rather than throwing.
- **Motion** is fully gated on `prefers-reduced-motion`. With it set, the canvas and
  spotlight are removed from the layout, the typed subtitle renders its first phrase as
  static text, counters jump to their final value, and every reveal starts visible.
- **No JS is a working site.** Reveal elements are the only thing JS un-hides, and the
  observer falls back to showing everything when `IntersectionObserver` is missing.
- **The canvas stops on a hidden tab.** `visibilitychange` cancels the animation frame
  instead of leaving a rAF loop running in a background tab.

## Deployment

`.github/workflows/deploy-pages.yml` publishes the repository root to GitHub Pages on
every push to `main`.
