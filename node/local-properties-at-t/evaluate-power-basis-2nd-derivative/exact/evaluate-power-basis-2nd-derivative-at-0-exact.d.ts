/**
 * Returns the result, `[x,y]`, of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function evaluatePowerBasis_2ndDerivativeAt0Exact(ps: number[][]): number[][];
export { evaluatePowerBasis_2ndDerivativeAt0Exact };