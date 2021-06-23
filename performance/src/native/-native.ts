import { closestPointOnBezierPrecise, X } from "../../../src/index";
import { settings } from '../settings'; 
import { draw, ctx } from '../draw-stuff';
import { distanceBetween } from "flo-vector2d";
import { showResults } from "../show-results";
import { drawIntersections } from './draw-intersections';
import { bezierBezierIntersection2 } from './bezier-bezier-intersection-2';


const { num } = settings;


const { timingOnly, showNativeXs } = settings;


function native(
        pss: number[][][]) {

    let total = 0;
    const ds: number[] = [];
    let timing: number;
    const xss: X[][][] = [];

    const timeStart = performance.now();
    for (let i=0; i<2*num; i++, i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];

        const xs = bezierBezierIntersection2(ps1, ps2);

        if (!xs) { 
            if (!timingOnly) {
                xss.push(undefined)
            }
            continue; 
        } 

        total += xs.length;

        if (showNativeXs && i < 1) {
            drawIntersections(xs);
        }
        if (!timingOnly) {
            for (const x of xs) {
                const box = x[0].box;
                const px = (box[1][0] + box[0][0])/2;
                const py = (box[1][1] + box[0][1])/2;
                const p = [px,py];
                const bp = closestPointOnBezierPrecise(ps2, p);
                const d = distanceBetween(p, bp.p);
                ds.push(d);
            }
            xss.push(xs);
        }
    }
    timing = performance.now() - timeStart;

    showResults('native', true, timing, ds, total);

    return xss;
}


export { native }
    