

/**
 * Returns the 2nd derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x-coordinates. 
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 6 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * 
 * @doc
 */
function getDdxy(ps: number[][]): number[][] {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			6*((x3 - x0) + 3*(x1 - x2)), // t^1 - max bitlength increase 6
			6*((x2 + x0) - 2*x1)         // t^0 - max bitlength increase 5
		], [
			6*((y3 - y0) + 3*(y1 - y2)), // t^1 - max bitlength increase 6
			6*((y2 + y0) - 2*y1)         // t^0 - max bitlength increase 5
		]]
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [[
			2*(x2 - 2*x1 + x0) // t^0 - max bitlength increase 3
		], [
			2*(y2 - 2*y1 + y0) // t^0 - max bitlength increase 3
		]];
	} 
	
	if (ps.length === 2 || ps.length === 1) {
		return [[0],[0]];
	}


	// TODO - add case of degenerate point
	throw new Error('The given bezier curve must be of order 0, 1, 2 or 3.');
}


export { getDdxy }