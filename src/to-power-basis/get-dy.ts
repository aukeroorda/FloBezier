
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct } from "double-double";
import { eSum, fastExpansionSum, twoDiff } from 'big-float-ts';

const tp  = twoProduct;
const fes = fastExpansionSum;
const sum = eSum;
const td = twoDiff;


/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's y-coordinates. 
 * 
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDy(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[,y0], [,y1], [,y2], [,y3]] = ps;
		return [
			3*(y3 + 3*(y1 - y2) - y0), // t^2 - max bitlength increase 5
			6*(y2 - 2*y1 + y0),        // t^1 - max bitlength increase 5
			3*(y1 - y0)                // t^0 - max bitlength increase 3
		];
	} 
	
	if (ps.length === 3) {
		let [[,y0], [,y1], [,y2]] = ps;
		return [
			2*(y2 - 2*y1 + y0), // t^1 - max bitlength increase 3
			2*(y1 - y0),        // t^0 - max bitlength increase 2
		];
	} 
	
	if (ps.length === 2) {
		let [[,y0], [,y1]] = ps;
		return [
			y1 - y0,  // t^0 - max bitlength increase 1
		];
	}

	throw new Error('The bezier curve must be of order 1, 2 or 3.');
}


/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's y-coordinates. 
 * 
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDyExact(ps: number[][]): number[][] {
	if (ps.length === 4) {
		let [[,y0], [,y1], [,y2], [,y3]] = ps;
		return [
			//3*y3 - 9*y2 + 9*y1 - 3*y0,
			sum([
				tp(3,y3), 
				tp(-9,y2), 
				tp(9,y1), 
				tp(-3,y0)
			]),
			//6*y2 - 12*y1 + 6*y0,
			sum([
				tp(6,y2), 
				tp(-12,y1), 
				tp(6,y0)
			]),
			//3*y1 - 3*y0
			sum([
				tp(3,y1), 
				tp(-3,y0)
			])
		];
	} 
	
	if (ps.length === 3) {
		let [[,y0], [,y1], [,y2]] = ps;
		return [
			//2*y2 - 4*y1 + 2*y0,
			sum([
				[2*y2], [-4,y1], [2*y0]
			]),
			//2*y1 - 2*y0,
			fes([2*y1], [-2,y0])
		];
	} 
	
	if (ps.length === 2) {
		let [[,y0], [,y1]] = ps;
		return [
			//y1 - y0,
			td(y1, y0)
		];
	}

	throw new Error('The bezier curve must be of order 1, 2 or 3.');
}


export { getDy, getDyExact }
