import { getDxy } from "../to-power-basis/get-dxy/double/get-dxy.js";
import { Horner } from 'flo-poly';


/**
 * Returns `ds` (the length differential) for a linear, quadratic or cubic 
 * bezier curve. This function is curried.
 * 
 * @param ps an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value
 * 
 * @internal
 */
function ds(ps: number[][], t: number): number;
function ds(ps: number[][]): (t: number) => number;
function ds(ps: number[][], t?: number) {
	const [dX, dY] = getDxy(ps);

	function f(t: number): number {
		const dx = Horner(dX, t);
		const dy = Horner(dY, t);
		
		return Math.sqrt(dx*dx + dy*dy);	
	}

	// Curry
	return t === undefined ? f : f(t);	
}


export { ds }
