# hungqpham.com

Personal site for Hung Q. Pham — scientist and tech builder. Built with Astro,
deployed to GitHub Pages on every push to `master`.

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build to dist/
npm run preview    # serve the production build
```

## Content

All copy lives in `src/data/content.ts` — projects, software, experience,
education, the hero identity block, and every outbound URL. Both pages render
from that one module, so nothing can drift between them.

Publications are separate, in `src/data/publications.json`:

```bash
npm run update:pubs
```

That merges published work from ORCID with preprints from arXiv, de-duplicates
by title, and writes the JSON the site imports. The build makes no network
calls, so a deploy cannot be slowed by a slow API or broken by an outage.
Google Scholar has no public API and blocks scraping; export BibTeX from the
Scholar profile to `src/data/scholar.bib` and the script merges that too.

Icons are generated rather than hand-drawn:

```bash
npm run make:icons
```

## Pages

- `/` — the site
- `/classic` — the previous design, kept for reference, marked `noindex`

## Editing the layout

`src/pages/index.astro` carries its own styles. Two things worth knowing first:
the column width is set once by `--measure` rather than by per-element caps,
because `ch` resolves against each element's own font and silently produced
three different widths; and the type scale is three families with three jobs,
documented at the top of the stylesheet.
