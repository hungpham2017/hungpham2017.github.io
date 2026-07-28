/**
 * Refresh the committed ORCID snapshot used as a build-time fallback.
 *
 *   npm run sync:pubs
 *
 * The site fetches ORCID live on every build; this snapshot only matters when
 * that fetch fails, so it needs updating rarely — mainly so a network blip
 * during deploy does not serve a stale-by-years list.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const ORCID_ID = '0000-0003-3608-1298';
const OUT = new URL('../src/data/publications-cache.json', import.meta.url);

const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
  headers: { Accept: 'application/json' },
});
if (!res.ok) {
  console.error(`ORCID responded ${res.status}`);
  process.exit(1);
}

const data = await res.json();
const works = (data.group ?? [])
  .map((group) => {
    const summary = group['work-summary']?.[0];
    if (!summary) return null;
    const ids = summary['external-ids']?.['external-id'] ?? [];
    return {
      title: summary.title?.title?.value?.trim() ?? null,
      journal: summary['journal-title']?.value?.trim() ?? null,
      year: Number(summary['publication-date']?.year?.value) || null,
      doi: ids.find((id) => id['external-id-type'] === 'doi')?.['external-id-value'] ?? null,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

mkdirSync(new URL('../src/data/', import.meta.url), { recursive: true });
writeFileSync(OUT, JSON.stringify(works, null, 2) + '\n');
console.log(`Wrote ${works.length} works to src/data/publications-cache.json`);
