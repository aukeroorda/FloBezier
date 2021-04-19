/**
 * Returns the tangent vector of an order 1, 2 or 3 bezier curve at a specific t.
 *
 * * this function is curried.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the parameter value where the tangent should be evaluated
 */
declare function tangent(ps: number[][], t: number): number[];
declare function tangent(ps: number[][]): (t: number) => number[];
export { tangent };
