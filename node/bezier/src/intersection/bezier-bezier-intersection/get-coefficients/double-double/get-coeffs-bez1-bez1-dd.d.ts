/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of two
 * order 1 bezier curves (i.e. 2 lines).
 *
 * The returned polynomial degree will be 1
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none TODO - include underflow / overflow
 * * intermediate calculations are done in double-double precision and the
 * result is exact if the precondition is met
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1 a linear bezier curve
 * @param ps2 a linear bezier curve
 *
 * @doc mdx
 */
declare function getCoeffsBez1Bez1Dd(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
};
export { getCoeffsBez1Bez1Dd };