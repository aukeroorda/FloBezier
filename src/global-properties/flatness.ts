import { toUnitVector } from "flo-vector2d";

const abs = Math.abs;


/**
 * TODO - not calculated that way anymore - deprecate??
 * Returns a flatness measure of the given curve - calculated as the total 
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 * 
 * * the returned flatness, say `f` is such that `1 <= f <= ∞`, where `1` means 
 * maximum flatness (all points collinear with monotone increasing coordinates)
 * and `∞` means minimum flatness (at least 3 points collinear with alternating
 * coordinates).
 * 
 * @param ps An order 1,2 or 3 bezier curve.
 * 
 * @doc mdx
 */
function flatness(ps: number[][]): number {
    // The below was the old heuristic which did not work well e.g. if an end 
    // control point was far away from the other 3
    //return controlPointLinesLength(ps) / distanceBetween(ps[0], ps[ps.length-1]);

    const vs: number[][] = [];
    for (let i=0; i<ps.length-1; i++) {
        const v = [ps[i+1][0] - ps[i][0], ps[i+1][1] - ps[i][1]];
        if ((v[0] !== 0 || v[1]) !== 0) {
            vs.push(v);
        }
    }

    const len = vs.length;
    if (len <= 1) { return 1; }
    
    let total = 0;
    for (let i=0; i<len-1; i++) {
        const u = toUnitVector(vs[i]);
        const v = toUnitVector(vs[i+1]);
        total += u[0]*v[0] + u[1]*v[1];
    }

    return (len-1) / abs(total);
}


export { flatness }
