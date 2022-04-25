/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned in objects very
 * similar to [[X]]
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the bezier curve
 *
 * @param circle
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function circleBezierIntersection(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): {
    p: number[];
    box: number[][];
    t: number;
    ri: import("flo-poly/node/roots/certified/root-interval").RootInterval;
}[];
export { circleBezierIntersection };
