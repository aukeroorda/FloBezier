/**
 * Returns the resulting bezier curve when rounding each control point
 * coordinate (given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions) of the given bezier curve to double precision.
 *
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function toEstimation(ps: number[][][]): number[][];
export { toEstimation };
