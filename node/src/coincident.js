"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector = require("flo-vector2d");
const evaluate_1 = require("./evaluate");
const line_intersection_1 = require("./line-intersection");
const normal_1 = require("./normal");
const sdst = Vector.squaredDistanceBetween;
/**
 * Check if the two given cubic beziers are nearly coincident everywhere along
 * a finite stretch and returns the coincident stretch (if any), otherwise
 * returns undefined.
 * @param P - A cubic bezier curve.
 * @param Q - Another cubic bezier curve.
 * @param δ - An indication of how closely the curves should stay to
 * each other before considered coincident.
 */
function coincident(P, Q, δ = 1e-6) {
    //let [P0, P1, P2, P3] = P; 
    //let [Q0, Q1, Q2, Q3] = Q; 
    let PtoQs = [0.01, 0.99].map(i => calcPointAndNeighbor(P, Q, i));
    let QtoPs = [0.01, 0.99].map(i => calcPointAndNeighbor(Q, P, i));
    // Check if start and end points are coincident.
    let tStartQ = 0.01;
    let tEndQ = 0.99;
    let tStartP = 0.01;
    let tEndP = 0.99;
    /*
    let c = 0;
    if (PtoQs[0].d <= δ) { tStartQ = PtoQs[0].t;  c++; }
    if (PtoQs[1].d <= δ) { tEndQ   = PtoQs[1].t;  c++; }
    if (QtoPs[0].d <= δ) { tStartP = QtoPs[0].t;  c++; }
    if (QtoPs[1].d <= δ) { tEndP   = QtoPs[1].t;  c++; }
    // At least 2 endpoints must be coincident.
    if (c < 2) { return undefined; }
    */
    if (PtoQs[0].d <= δ) {
        tStartQ = PtoQs[0].t;
    }
    if (PtoQs[1].d <= δ) {
        tEndQ = PtoQs[1].t;
    }
    if (QtoPs[0].d <= δ) {
        tStartP = QtoPs[0].t;
    }
    if (QtoPs[1].d <= δ) {
        tEndP = QtoPs[1].t;
    }
    if (tStartP > tEndP) {
        [tStartP, tEndP] = [tEndP, tStartP];
    }
    if (tStartQ > tEndQ) {
        [tStartQ, tEndQ] = [tEndQ, tStartQ];
    }
    let tSpanP = tEndP - tStartP;
    let tSpanQ = tEndQ - tStartQ;
    // We must check at least 10 points to ensure entire curve is coincident, 
    // otherwise we may simply have found intersection points. We cannot simply 
    // check the control points for closeness since well seperated control 
    // points does not necessarily translate into well seperated curves.
    //let lengthP = sdst(P0,P1) + sdst(P1,P2) + sdst(P2,P3);
    //let lengthQ = sdst(Q0,Q1) + sdst(Q1,Q2) + sdst(Q2,Q3);
    // If the overlapping part is smaller than 1/10 (a heuristical value) then
    // do not consider pieces overlapping.
    if (tSpanP < 0.1 && tSpanQ < 0.1) {
        return undefined;
    }
    let res = true;
    //for (let i=1; i<10; i++) {
    for (let i = 0; i < 10; i++) {
        let t = tStartP + tSpanP * (i / 10);
        let { d } = calcPointAndNeighbor(P, Q, t);
        if (d > δ) {
            return undefined;
        }
    }
    return { p: [tStartP, tEndP], q: [tStartQ, tEndQ] };
}
exports.coincident = coincident;
function calcPointAndNeighbor(P, Q, t) {
    // TODO - must also check crossing of normals - for if two curves open
    // at endpoints and stop essentially at same point.
    let pp1 = evaluate_1.evaluate(P)(t);
    //let normalVector = normal(P)(0);
    let normalVector = normal_1.normal(P)(t);
    let pp2 = Vector.translate(pp1, normalVector);
    let ts = line_intersection_1.lineIntersection(Q, [pp1, pp2]);
    let bestT = undefined;
    let bestQ = undefined;
    let bestD = Number.POSITIVE_INFINITY;
    for (let t of ts) {
        let q = evaluate_1.evaluate(Q)(t);
        let d = Vector.distanceBetween(q, pp1);
        if (d < bestD) {
            bestT = t;
            bestQ = q;
            bestD = d;
        }
    }
    return { t: bestT, p: bestQ, d: bestD };
}

//# sourceMappingURL=coincident.js.map
