/**
 * Publications, read from a committed file — the build makes no network calls.
 *
 * Refresh the list with `npm run update:pubs`, which merges ORCID (published
 * work) and arXiv (preprints), plus src/data/scholar.bib if you have exported
 * one. See scripts/update-publications.mjs for why Google Scholar cannot be
 * pulled automatically.
 *
 * Keeping the fetch out of the build means a deploy is deterministic: it can't
 * be slowed by a slow API, broken by an outage, or silently changed by an
 * upstream edit between two builds of the same commit.
 */
import data from '../data/publications.json';

export const ORCID_ID = '0000-0003-3608-1298';
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;
export const SCHOLAR_URL = 'https://scholar.google.com/citations?user=MIe6vYUAAAAJ';
export const ARXIV_URL = 'https://arxiv.org/a/pham_h_1';

export interface Publication {
  title: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
  /** Present when the work exists as a preprint. */
  arxivId?: string | null;
}

export const publications = data as Publication[];

/** Preprints are those with no journal version yet. */
export const preprintCount = publications.filter((pub) => !pub.doi && pub.arxivId).length;

/** Where a given entry should link. */
export function publicationUrl(pub: Publication): string | null {
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  if (pub.arxivId) return `https://arxiv.org/abs/${pub.arxivId}`;
  return null;
}
