/**
 * Split the order 0,1,2 or 3 bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is flat within a given tolerance
 * given by the `curviness` function.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxCurviness maximum curviness (must be > 0) as calculated using
 * the `curviness` function (which measures the total angle in radians formed
 * by the vectors formed by the ordered control points); defaults to `0.4 radians`
 * @param minTSpan the minimum `t` span that can be returned for a bezier piece;
 * necessary for cubics otherwise a curve with a cusp would cause an infinite
 * loop; defaults to `2**-16`
 *
 * @doc
 */
declare function splitByCurvature(ps: number[][], maxCurviness?: number, minTSpan?: number): number[];
export { splitByCurvature };
