/**
 * Returns a clone of the given cubic bezier (with a different reference).
 *
 * @param ps A cubic bezier given by its array of control points
 *
 * @doc
 */
declare function clone(ps: number[][]): number[][] | undefined;
export { clone };