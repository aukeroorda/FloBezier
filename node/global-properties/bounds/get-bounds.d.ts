/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps
 */
declare const getXBoundsTight: (a: number[][]) => {
    minX: {
        ts: number[];
        box: number[][];
    };
    maxX: {
        ts: number[];
        box: number[][];
    };
};
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps
 */
declare const getYBoundsTight: (a: number[][]) => {
    minY: {
        ts: number[];
        box: number[][];
    };
    maxY: {
        ts: number[];
        box: number[][];
    };
};
/**
 * Returns the approximate axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
declare const getBounds: (a: number[][]) => {
    ts: number[][];
    box: number[][];
};
export { getBounds, getXBoundsTight, getYBoundsTight };
