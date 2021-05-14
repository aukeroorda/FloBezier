import { getImplicitForm1 } from "../../../../implicit-form/double/get-implicit-form1";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 2 bezier curve (i.e. a line and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez1Bez2(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    //const v2 = c2*vₓ + d2*vᵧ;
    const p1 = c2*vₓ;
    const p2 = d2*vᵧ;
    const v2 = p1 + p2;

    //const v1 = c1*vₓ + d1*vᵧ;
    const p3 = c1*vₓ;
    const p4 = d1*vᵧ;
    const v1 = p3 + p4;

    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p5 = c0*vₓ;
    const p6 = d0*vᵧ;
    const p7 = p5 + p6;
    const v0 = p7 + v;

    return [v2, v1, v0];
}


export { getCoeffsBez1Bez2 }
