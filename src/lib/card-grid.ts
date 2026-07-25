/**
 * Layout rule for the 2-column card grids (Projects, Education).
 *
 * A plain `md:grid-cols-2` grid leaves the last card stuck to the left with a
 * visible hole beside it whenever the item count is odd. The fix is purely
 * mechanical — the leftover card keeps its normal width but is centered in the
 * final row, so the section stays balanced at any count:
 *
 *   1 item  ->    [ a ]
 *   2 items -> [ a ][ b ]
 *   3 items -> [ a ][ b ] /    [ c ]
 *   4 items -> [ a ][ b ] / [ c ][ d ]
 *   5 items -> [ a ][ b ] / [ c ][ d ] /    [ e ]
 *
 * Deliberately NOT a "featured card" mechanism. Card widths stay uniform
 * because the copy is uniform (~25-30 words each) and only fills a readable
 * block at half width — stretching one card to full width would leave a wide,
 * two-line band. Prominence, if it's ever wanted, should be an explicit flag in
 * the content rather than a side effect of the item count being odd.
 */
export function isOrphan(index: number, total: number): boolean {
  return total % 2 === 1 && index === total - 1;
}

/**
 * Centers the leftover card in its row at its normal width.
 * The 0.75rem is half of the grid's `gap-6` (1.5rem) — keep the two in sync.
 */
export const CENTER_ORPHAN = 'md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto';
