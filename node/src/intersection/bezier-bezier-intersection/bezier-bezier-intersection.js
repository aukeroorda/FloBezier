import { bezierBezierIntersectionBoundless } from './bezier-bezier-intersection-boundless.js';
import { isPointOnBezierExtension } from '../../simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension.js';
import { tFromXY } from '../../local-properties-to-t/t-from-xy.js';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box.js';
import { intersectBoxes } from '../../boxes/intersect-boxes.js';
import { bezierSelfIntersection } from '../self-intersection/bezier-self-intersection.js';
import { getEndpointIntersections } from '../get-endpoint-intersections/get-endpoint-intersections.js';
import { isCollinear } from '../../global-properties/classification/is-collinear.js';
import { createRootExact } from 'flo-poly';
import { reduceOrderIfPossible } from '../../transformation/reduce-order-if-possible.js';
const eps = Number.EPSILON;
const eps2 = 2 * eps;
// TODO finalize the description below
/**
 * Returns the intersection between two bezier curves up to cubic order (i.e.
 * points, linear, quadratic or cubic bezier curves (i.e. order 0,1,2 or 3
 * curves).
 *
 * The algorithm employed uses advanced techniques such as floating point error
 * bounding, adaptive multi-precision floating point arithmetic, pre-filtering
 * of easy cases, certified root finding and algebraic implicitization of the
 * curves in order to find *guaranteed* accurate results.
 *
 * * the returned intersections are *ordered* by `t` parameter value of the
 * first bezier curve
 * * if the two curves have an infinite number of intersections then the
 * intersection of the endpoints of each curve with the other is returned,
 * except in the extreme case of a curve degenerating to a point in which case
 * the intersection `t` value is returned (if any) having `tS === 0`
 * and `tE === 1`
 *
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the `t` values of the bezier curves (bar
 * underflow/overflow)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
function bezierBezierIntersection(ps1, ps2) {
    ps1 = reduceOrderIfPossible(ps1);
    ps2 = reduceOrderIfPossible(ps2);
    if (ps1.length === 1 || ps2.length === 1) {
        return handlePointDegenerateCases(ps1, ps2);
    }
    const ris2 = bezierBezierIntersectionBoundless(ps1, ps2);
    if (ris2 === undefined) {
        return handleInfiniteIntersections(ps1, ps2);
    }
    if (ris2.length === 0) {
        return [];
    }
    // `ris1` are ordered by inersection `t` values of `ps1`
    const ris1 = bezierBezierIntersectionBoundless(ps2, ps1);
    if (ris1.length === 0) {
        return [];
    }
    let is1 = ris1.map(ri => getIntervalBox(ps1, [ri.tS, ri.tE]));
    let is2 = ris2.map(ri => getIntervalBox(ps2, [ri.tS, ri.tE]));
    let xPairs = [];
    for (let i = 0; i < ris1.length; i++) {
        let box1 = is1[i];
        for (let j = 0; j < ris2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1, box2);
            if (box !== undefined) {
                let x1 = { ri: ris1[i], box, kind: 1 };
                let x2 = { ri: ris2[j], box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }
    return xPairs;
}
/**
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** neither bezier curve may be of order 1 (a point)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function handleInfiniteIntersections(ps1, ps2) {
    // At this point there are an infinite number of intersections, i.e.:
    // `bezierBezierIntersectionBoundless(ps1, ps2) === undefined`
    if (isCollinear(ps1) && !(ps1.length === 2 && ps2.length === 2)) {
        // `ps2` must also be collinear
        return handleCollinearIntersections(ps1, ps2);
    }
    // Now neither `ps1` nor `ps2` is collinear and they are thus algebraically
    // identical
    return [
        ...getEndpointIntersections(ps1, ps2, true),
        ...getCoincidingSelfIntersections(ps1, ps2)
    ].sort((a, b) => a[0].ri.tS - b[0].ri.tS);
}
/**
 * Get the intersection (if it exist) that is the double-point of both given
 * algebraically identical curves if both the double-points are given for `t`
 * values in `[0,1]` for each curve.
 *
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** neither curve is allowed to have all points collinear
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoincidingSelfIntersections(ps1, ps2) {
    const ts1 = bezierSelfIntersection(ps1, false);
    const ts2 = bezierSelfIntersection(ps2, false);
    const len1 = ts1.length;
    const len2 = ts2.length;
    if (len1 < 1 || len2 < 1) {
        return [];
    }
    const xPairs = [];
    // this is a *very* rare case
    for (let t1 of ts1) {
        for (let t2 of ts2) {
            xPairs.push([{
                    ri: { tS: t1 - eps2, tE: t1 + eps2, multiplicity: 1 },
                    kind: 1,
                    box: getIntervalBox(ps1, [t1 - eps2, t1 + eps2])
                }, {
                    ri: { tS: t2 - eps2, tE: t2 + eps2, multiplicity: 1 },
                    kind: 1,
                    box: getIntervalBox(ps2, [t2 - eps2, t2 + eps2])
                }]);
        }
    }
    return xPairs;
}
/**
 * * self-overlap is not considered, only endpoints
 *
 * * **precondition:** one curve must be of at least order 1 (line) and the
 * other of at least order 2 (quadratic)
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** all points (from both curves) must be collinear
 *
 * @param psA
 * @param psB
 *
 * @internal
 */
function handleCollinearIntersections(psA, psB) {
    const A0 = psA[0];
    const A1 = psA[psA.length - 1];
    const B0 = psB[0];
    const B1 = psB[psB.length - 1];
    // Check for exact endpoint overlap
    const overlapSS = A0[0] === B0[0] && A0[1] == B0[1];
    const overlapSE = A0[0] === B1[0] && A0[1] == B1[1];
    const overlapES = A1[0] === B0[0] && A1[1] == B0[1];
    const overlapEE = A1[0] === B1[0] && A1[1] == B1[1];
    const overlapB0 = overlapSS || overlapES;
    const overlapB1 = overlapSE || overlapEE;
    const root0 = createRootExact(0);
    const root1 = createRootExact(1);
    const tA_B0 = overlapSS ? [root0] : overlapES ? [root1] : tFromXY(psA, B0);
    const tA_B1 = overlapSE ? [root0] : overlapEE ? [root1] : tFromXY(psA, B1);
    const tB_A0 = overlapSS || overlapSE ? [] : tFromXY(psB, A0);
    const tB_A1 = overlapES || overlapEE ? [] : tFromXY(psB, A1);
    return [
        ...tA_B0.map(ri => {
            const box = [B0, B0];
            const kind = overlapB0 ? 4 : 5;
            return [{ ri, kind, box }, { ri: root0, kind, box }];
        }),
        ...tA_B1.map(ri => {
            const box = [B1, B1];
            const kind = overlapB1 ? 4 : 5;
            return [{ ri, kind, box }, { ri: root1, kind, box }];
        }),
        ...tB_A0.map(ri => {
            const box = [A0, A0];
            const kind = 5;
            return [{ ri: root0, kind, box }, { ri, kind, box }];
        }),
        ...tB_A1.map(ri => {
            const box = [A1, A1];
            const kind = 5;
            return [{ ri: root1, kind, box }, { ri, kind, box }];
        })
    ]
        .sort((a, b) => a[0].ri.tS - b[0].ri.tS);
}
/**
 * Handles the degenerate cases where either bezier curve is really a point and
 * returns the relevant intersections if any.
 *
 * * **precondition:** either or both bezier curves must be a point
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function handlePointDegenerateCases(ps1, ps2) {
    if (ps1.length === 1) {
        const p1 = ps1[0];
        const box = [p1, p1];
        if (ps2.length === 1) {
            const p2 = ps2[0];
            if (p1[0] === p2[0] && p1[1] === p2[1]) {
                // literally the same points - very degenerate
                return [
                    [
                        { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                        { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                    ]
                ];
            }
            return [];
        }
        if (isPointOnBezierExtension(ps2, [[p1[0]], [p1[1]]])) {
            // keep TypeScript happy; at this point `tFromXY` cannot return `undefined`
            return tFromXY(ps2, p1).map(ri => [
                { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                { ri, kind: 6, box },
            ]);
        }
        return [];
    }
    const p2 = ps2[0];
    const box = [p2, p2];
    if (isPointOnBezierExtension(ps1, [[p2[0]], [p2[1]]])) {
        // keep TypeScript happy; at this point `tFromXY` cannot return `undefined`
        return tFromXY(ps1, p2).map(ri => [
            { ri, kind: 6, box },
            { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
        ]);
    }
    return [];
}
export { bezierBezierIntersection };
//# sourceMappingURL=bezier-bezier-intersection.js.map