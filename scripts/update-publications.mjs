/**
 * Refresh the publication list.
 *
 *   npm run update:pubs
 *
 * Writes src/data/publications.json, which the site reads directly. The build
 * makes no network calls, so a deploy can never be slowed, broken, or silently
 * changed by an upstream API.
 *
 * Sources, merged and de-duplicated by title:
 *
 *   ORCID   — published work with a DOI. Author-curated, so nothing foreign
 *             creeps in.
 *   arXiv   — preprints, which is where the newest work lives before it has a
 *             DOI. The author search also returns a different Hung Pham (a
 *             particle physicist, ~15 hep-ph papers, 1998-2015), so entries
 *             are kept only on an exact author-name match.
 *   scholar.bib — OPTIONAL. Google Scholar has no API and blocks scraping, but
 *             its profile page exports BibTeX. If src/data/scholar.bib exists
 *             it is merged too. To refresh it:
 *               scholar.google.com profile -> select all -> Export -> BibTeX
 *               -> save as src/data/scholar.bib
 *
 * A published record always wins over a preprint of the same paper.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';

const ORCID_ID = '0000-0003-3608-1298';
const ARXIV_AUTHOR = 'Hung Q. Pham';

const DATA_DIR = new URL('../src/data/', import.meta.url);
const OUT = new URL('publications.json', DATA_DIR);
const BIB = new URL('scholar.bib', DATA_DIR);

const norm = (title) => (title ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

async function fromOrcid() {
  const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`ORCID responded ${res.status}`);
  const data = await res.json();

  return (data.group ?? [])
    .map((group) => {
      const s = group['work-summary']?.[0];
      if (!s) return null;
      const ids = s['external-ids']?.['external-id'] ?? [];
      return {
        title: s.title?.title?.value?.trim() ?? null,
        journal: s['journal-title']?.value?.trim() ?? null,
        year: Number(s['publication-date']?.year?.value) || null,
        doi: ids.find((i) => i['external-id-type'] === 'doi')?.['external-id-value'] ?? null,
        arxivId: null,
      };
    })
    .filter(Boolean);
}

async function fromArxiv() {
  const url =
    'http://export.arxiv.org/api/query' +
    `?search_query=${encodeURIComponent(`au:"${ARXIV_AUTHOR}"`)}` +
    '&start=0&max_results=200&sortBy=submittedDate&sortOrder=descending';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`arXiv responded ${res.status}`);
  const xml = await res.text();

  const tag = (entry, name) => {
    const m = entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
    return m ? m[1].replace(/\s+/g, ' ').trim() : '';
  };

  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((m) => m[1])
    .filter((entry) => {
      const authors = [...entry.matchAll(/<name>([^<]+)<\/name>/g)].map((a) =>
        a[1].trim().replace(/\s+/g, ' ')
      );
      return authors.includes(ARXIV_AUTHOR);
    })
    .map((entry) => ({
      title: tag(entry, 'title') || null,
      journal: null,
      year: Number(tag(entry, 'published').slice(0, 4)) || null,
      doi: null,
      arxivId: (tag(entry, 'id').split('/abs/')[1] ?? '').replace(/v\d+$/, '') || null,
    }));
}

function fromScholarBib() {
  if (!existsSync(BIB)) return [];
  const text = readFileSync(BIB, 'utf8');
  const field = (block, name) => {
    const m = block.match(new RegExp(`${name}\\s*=\\s*[{"]([\\s\\S]*?)[}"],?\\s*\\n`, 'i'));
    return m ? m[1].replace(/[{}]/g, '').replace(/\s+/g, ' ').trim() : null;
  };
  return [...text.matchAll(/@\w+\s*\{[\s\S]*?\n\}/g)]
    .map((m) => m[0])
    .map((block) => ({
      title: field(block, 'title'),
      journal: field(block, 'journal') ?? field(block, 'booktitle'),
      year: Number(field(block, 'year')) || null,
      doi: field(block, 'doi'),
      arxivId: null,
    }))
    .filter((p) => p.title);
}

/** More metadata wins, so a journal article beats its own preprint. */
const score = (p) => (p.doi ? 4 : 0) + (p.journal ? 2 : 0) + (p.arxivId ? 1 : 0);

function merge(lists) {
  const byTitle = new Map();
  for (const p of lists.flat()) {
    const key = norm(p.title);
    if (!key) continue;
    const seen = byTitle.get(key);
    if (!seen) {
      byTitle.set(key, p);
    } else {
      // Keep the richer record, but never lose an arXiv id we already had.
      const better = score(p) > score(seen) ? p : seen;
      byTitle.set(key, { ...better, arxivId: better.arxivId ?? seen.arxivId ?? p.arxivId });
    }
  }
  return [...byTitle.values()].sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0) || (a.title ?? '').localeCompare(b.title ?? '')
  );
}

const results = await Promise.allSettled([fromOrcid(), fromArxiv()]);
const [orcid, arxiv] = results.map((r) => (r.status === 'fulfilled' ? r.value : []));
results.forEach((r, i) => {
  if (r.status === 'rejected') console.error(`  ${['ORCID', 'arXiv'][i]} failed: ${r.reason.message}`);
});

const scholar = fromScholarBib();
const merged = merge([orcid, arxiv, scholar]);

if (!merged.length) {
  console.error('No publications resolved — refusing to overwrite with an empty list.');
  process.exit(1);
}

mkdirSync(DATA_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify(merged, null, 2) + '\n');

const preprints = merged.filter((p) => !p.doi && p.arxivId).length;
console.log(`ORCID ${orcid.length} · arXiv ${arxiv.length} · scholar.bib ${scholar.length || '(absent)'}`);
console.log(`Wrote ${merged.length} works (${preprints} preprints) to src/data/publications.json`);
