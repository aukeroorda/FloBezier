/**
 * Returns a human readable string representation of the given bezier curve.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
declare function toString(ps: number[][]): string;
export { toString };
