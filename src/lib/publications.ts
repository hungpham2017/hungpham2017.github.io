/**
 * Publications, pulled from ORCID at build time.
 *
 * Why ORCID and not Google Scholar or OpenAlex:
 *  - Scholar has no public API and blocks framing; scraping violates its ToS.
 *  - OpenAlex maps this ORCID to 85 works because its author disambiguation
 *    merged in an unrelated geotechnical engineer (soil-water characteristic
 *    curves, Canadian Geotechnical Journal). Its citation totals are wrong for
 *    the same reason, so they are not displayed anywhere.
 *  - ORCID is author-curated, so every record is genuinely his.
 *
 * The fetch runs at build time — no client JS, no CORS, no third-party widget.
 * If ORCID is unreachable the build falls back to the committed snapshot in
 * publications-cache.json rather than failing the deploy or shipping an empty
 * section. Refresh that snapshot with `npm run sync:pubs`.
 */
import cache from '../data/publications-cache.json';

export const ORCID_ID = '0000-0003-3608-1298';
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;
export const SCHOLAR_URL = 'https://scholar.google.com/citations?user=MIe6vYUAAAAJ';

export interface Publication {
  title: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
}

/** ORCID records the same paper more than once when it arrives from several sources. */
function dedupe(works: Publication[]): Publication[] {
  const byTitle = new Map<string, Publication>();

  for (const work of works) {
    const key = (work.title ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!key) continue;
    const seen = byTitle.get(key);
    // Keep whichever copy carries the most metadata.
    const score = (p: Publication) => (p.doi ? 2 : 0) + (p.journal ? 1 : 0);
    if (!seen || score(work) > score(seen)) byTitle.set(key, work);
  }

  return [...byTitle.values()];
}

function normalize(group: any): Publication | null {
  const summary = group?.['work-summary']?.[0];
  if (!summary) return null;

  const ids: any[] = summary['external-ids']?.['external-id'] ?? [];
  const doi = ids.find((id) => id['external-id-type'] === 'doi')?.['external-id-value'] ?? null;
  const year = Number(summary['publication-date']?.year?.value) || null;

  return {
    title: summary.title?.title?.value?.trim() ?? null,
    journal: summary['journal-title']?.value?.trim() ?? null,
    year,
    doi,
  };
}

export async function fetchFromOrcid(): Promise<Publication[]> {
  const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`ORCID responded ${res.status}`);

  const data = await res.json();
  const works = (data.group ?? []).map(normalize).filter(Boolean) as Publication[];
  if (!works.length) throw new Error('ORCID returned no works');
  return works;
}

/** Published work, newest first. Falls back to the committed snapshot. */
export async function getPublications(): Promise<{
  publications: Publication[];
  source: 'orcid' | 'cache';
}> {
  let works: Publication[];
  let source: 'orcid' | 'cache';

  try {
    works = await fetchFromOrcid();
    source = 'orcid';
  } catch (error) {
    console.warn(
      `[publications] ORCID fetch failed (${(error as Error).message}); using cached snapshot.`
    );
    works = cache as Publication[];
    source = 'cache';
  }

  const publications = dedupe(works).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return { publications, source };
}
