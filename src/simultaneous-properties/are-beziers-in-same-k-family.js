"use strict";
exports.__esModule = true;
exports.areBeziersInSameKFamily = void 0;
var evaluate_exact_js_1 = require("../local-properties-at-t/t-to-xy/exact/evaluate-exact.js");
var is_point_on_bezier_extension_js_1 = require("./is-point-on-bezier-extension/is-point-on-bezier-extension.js");
// TODO - bitlength calculation below is wrong due to evaluation.
// TODO - this algorithm is wrong - it actually checks for infinite number
// of intersections (which includes same-k-family cases) - could implicitizion provide a solution??
// TODO - also consider order 1 and 2 (and 0?) cases
/**
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions is the same curve.
 *
 * * probably better to use the bezierBezierIntersection function and see if it
 * returns undefined which is the case iff the two beziers are in the same
 * k-family.
 * * **precondition:** neither given bezier curve may have *all* its control
 * points the same point (i.e. neither bezier curve may effectively be a point)
 * * **precondition:** underflow / overflow
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 *
 * @doc
 */
function areBeziersInSameKFamily(ps1, ps2) {
    // Get `(ps1.length * ps2.length) + 1` points on the first bezier or its 
    // extension. This number is chosen because there are a maximum of 
    // `(ps1.length * ps2.length)` intersections between the two bezier curves
    // according to Bezout's Theorem. Thus if say 10 (for 2 cubics) unique 
    // points on one curve are also on the other then they are algebraically
    // identical.
    var len = (ps1.length - 1) * (ps2.length - 1) + 1;
    var mid = Math.ceil(len / 2);
    for (var i = 1; i < len + 1; i++) {
        // Make each parametric `t`-value an integer power of two to keep the 
        // bitlength a minimum (1 in this case).
        // For 2 cubics for example we will have t values of:
        // `[0.0625, 0.125, 0.25, 0.5, 1, 2, 4, 8, 16, 32]`
        var t = Math.pow(2, (i - mid));
        var p = (0, evaluate_exact_js_1.evaluateExact)(ps1, t);
        if (!(0, is_point_on_bezier_extension_js_1.isPointOnBezierExtension)(ps2, p)) {
            return false;
        }
    }
    return true;
}
exports.areBeziersInSameKFamily = areBeziersInSameKFamily;