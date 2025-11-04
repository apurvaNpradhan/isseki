/**
 * Calculate a new position between two positions
 * @param prev previous item's position (nullable)
 * @param next next item's position (nullable)
 */
export function getNewPosition(
	prev?: number | null,
	next?: number | null,
): number {
	if (prev == null && next == null) return 1;
	if (prev == null) return next! - 1;
	if (next == null) return prev + 1;
	return (prev + next) / 2;
}
