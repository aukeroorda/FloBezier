/**
 * Returns the exact derivative of the power basis representation of a
 * bezier curve of order cubic or less.
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are Shewchuk floating point
 * expansions
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function getDxyExact(ps: number[][]): number[][][];
/** @internal */
declare function getDxy3Exact(ps: number[][]): number[][][];
/** @internal */
declare function getDxy2Exact(ps: number[][]): number[][][];
/** @internal */
declare function getDxy1Exact(ps: number[][]): number[][][];
export { getDxyExact, getDxy1Exact, getDxy2Exact, getDxy3Exact };
