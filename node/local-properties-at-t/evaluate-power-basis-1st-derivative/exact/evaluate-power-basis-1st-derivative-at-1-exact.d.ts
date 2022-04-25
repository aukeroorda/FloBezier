/**
 * Returns the exact result (`[x,y]`) of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 1`.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function evaluatePowerBasis_1stDerivativeAt1Exact(ps: number[][]): number[][];
export { evaluatePowerBasis_1stDerivativeAt1Exact };