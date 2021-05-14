/**
 * Returns the result (`[x,y]`) of evaluating the derivative of a linear, 
 * quadratic or cubic bezier curve at `t === 1`. 
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength (incl bit shift) increase === 3 (for cubics)
 * * max bitlength (incl bit shift) increase === 2 (for quadratics)
 * * max bitlength (incl bit shift) increase === 1 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc mdx
 */
function getDxyAt1(ps: number[][]): number[] {
	if (ps.length === 4) {
		const [, , [x2,y2], [x3,y3]] = ps;
		return [
			3*(x3 - x2),
			3*(y3 - y2),
		]; // max bitlength increase 3
	} else if (ps.length === 3) {
		const [, [x1,y1], [x2,y2]] = ps;
		return [
			2*(x2 - x1),
			2*(y2 - y1),
		]; // max bitlength increase 2
	} else if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
			x1 - x0,
			y1 - y0
		]; // max bitlength increase 1
	}
}


export { getDxyAt1 }
