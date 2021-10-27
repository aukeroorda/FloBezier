import { γγ } from '../../../src/error-analysis/error-analysis';
import { getImplicitForm1DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form1-dd-with-running-error";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { ddAddDd, ddMultDd, ddMultDouble2 } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eEstimate, scaleExpansion2, eToDd } from 'big-float-ts';
import { getImplicitForm1Exact } from '../../implicit-form/exact/get-implicit-form1-exact';

const qaq = ddAddDd;
const epr = expansionProduct;
const fes = fastExpansionSum;
const sign = eSign;
const estimate = eEstimate;
const qmd = ddMultDouble2;
const sce = scaleExpansion2;
const qmq = ddMultDd;
const etodd = eToDd;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns true if the given point is on the given line where 
 * the parameter `t` is allowed to extend to +-infinity, i.e. t is an element of 
 * [-inf, +inf], false otherwise.
 * 
 * * **Precondition:** TODO - underflow/overflow
 * * there are alternative implementations to this function, e.g. ccw, etc;
 * it is kept for symmetry.
 * 
 * @param ps a linear bezier curve (a line)
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as 1 and 2 set 
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 * 
 * @internal
 */
 function isPointOnBezierExtension1(
        ps: number[][], 
        p: number[][]): boolean {

    const [xe,ye] = p;
    const lenX = xe.length;
    const lenY = ye.length;
    const x = xe[lenX-1];  // get higest order double
    const y = ye[lenY-1];  // ...
    const isDouble = (lenX === 1 && lenY === 1);

    {
        //---- pre-filter - note all coefficients below vₓ, vᵧ, v are exact
        const { 
            coeffs: { vₓ, vᵧ, v },
            errorBound: { v_ }
        } = getImplicitForm1DdWithRunningError(ps);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h = vₓ*x + vᵧ*y + v;

        const xd = etodd(xe);
        const yd = etodd(ye);

        const _x = abs(x);
        const _y = abs(y);

        const _vₓ = abs(vₓ[1]);
        const _vᵧ = abs(vᵧ[1]);

        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        const x_ = _x/3;
        const y_ = _y/3;

        const $vₓx = vₓ[1]*x;
        const vₓx = qmq(xd,vₓ);
        const _vₓx = abs($vₓx);
        const vₓx_ = _vₓ*x_ + 2*_vₓx;

        const $vᵧy = vᵧ[1]*y;
        const vᵧy = qmq(yd,vᵧ);
        const _vᵧy = abs($vᵧy);
        const vᵧy_ = _vᵧ*y_ + 2*_vᵧy;

        // group the terms to reduce error, e.g. `v` usually has the highest bitlength
        //const h = (vₓx + vᵧy) + v;

        const q7 = qaq(vₓx,vᵧy);
        const q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        const h = qaq(q7,v);
        const h_ = q7_ + v_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    {
        const implictForm = getImplicitForm1Exact(ps);

        if (implictForm === undefined) {
            // both ps are the same point
            return isDouble && x === ps[0][0] && y === ps[0][1];
        }

        const { vₓ, vᵧ, v } = implictForm;

        const vₓx = epr(xe,vₓ);
        const vᵧy = epr(ye,vᵧ);

        const hh = fes(epr(vₓx,vᵧy),v);

        return sign(hh) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension1 }