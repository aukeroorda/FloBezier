/**
 * Returns the 2nd derivative of the power basis representation of a
 * bezier curve of order cubic or less (with intermediate calculations done in
 * double precision).
 *
 * * returns the resulting power basis x and y coordinate polynomials from
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c`
 * and `y(t) = dt^2 + et + f` then  the result is returned
 * as `[[a,b,c],[d,e,f]]`
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function getDdxy(ps) {
    if (ps.length === 4) {
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return [[
                6 * ((x3 - x0) + 3 * (x1 - x2)),
                6 * ((x2 + x0) - 2 * x1)
            ], [
                6 * ((y3 - y0) + 3 * (y1 - y2)),
                6 * ((y2 + y0) - 2 * y1)
            ]];
    }
    if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [[
                2 * (x2 - 2 * x1 + x0)
            ], [
                2 * (y2 - 2 * y1 + y0)
            ]];
    }
    if (ps.length <= 2) {
        return [[0], [0]];
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { getDdxy };
//# sourceMappingURL=get-ddxy.js.map