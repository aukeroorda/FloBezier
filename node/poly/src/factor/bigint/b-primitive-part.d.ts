/**
 * Returns the primitive part of the given polynomial.
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function bPrimitivePart(p: bigint[]): bigint[];
export { bPrimitivePart };
