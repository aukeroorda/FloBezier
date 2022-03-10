import { isCollinear } from "./is-collinear.js";
/**
 * Returns true if the given bezier is a line and self-overlapping, i.e. if it
 * intersects itself at an infinite number of points.
 *
 * * a bezier curve can only intersect itself at an infinite number of
 * points if is a self-overlapping line.
 *
 * * **Robust** via adaptive infinite precision floating point arithmetic.
 *
 * @param ps An order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function isSelfOverlapping(ps) {
    if (!isCollinear(ps)) {
        return false;
    }
    // Check if control points are non-strict monotone
    const xs = ps.map(p => p[0]);
    const ys = ps.map(p => p[1]);
    return !(isMonotone(xs) && isMonotone(ys));
}
/**
 * Returns true if the given array of numbers are non-strict monotone increasing.
 * @param xs An array of numbers
 *
 * @internal
 */
function isMonotoneIncreasing(xs) {
    for (let i = 1; i < xs.length; i++) {
        if (xs[i - 1] > xs[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if the given array of numbers are non-strict monotone decreasing.
 * @param xs An array of numbers
 *
 * @internal
 */
function isMonotoneDecreasing(xs) {
    for (let i = 1; i < xs.length; i++) {
        if (xs[i - 1] < xs[i]) {
            return false;
        }
    }
    return true;
}
/**
 * @param xs
 *
 * @internal
 */
function isMonotone(xs) {
    return isMonotoneIncreasing(xs) || isMonotoneDecreasing(xs);
}
export { isSelfOverlapping };
//# sourceMappingURL=is-self-overlapping.js.map