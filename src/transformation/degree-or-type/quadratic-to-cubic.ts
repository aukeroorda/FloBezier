
/**
 * Returns the cubic version of the given quadratic bezier curve (by degree
 * elevation). 
 * 
 * * quadratic bezier curves can always be represented exactly by cubics - the 
 * converse is false
 * 
 * @param ps a quadratic bezier curve.
 * 
 * @internal
 */
function quadraticToCubic(ps: number[][]) {
	const [[x0,y0],[x1,y1],[x2,y2]] = ps;

	return [
		[x0,y0],
		[(1/3)*x0+(2/3)*x1, (1/3)*y0+(2/3)*y1],
		[(2/3)*x1+(1/3)*x2, (2/3)*y1+(1/3)*y2],
		[x2,y2]
	];
}


export { quadraticToCubic }
