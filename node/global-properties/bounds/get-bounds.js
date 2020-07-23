"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYBoundsTight = exports.getXBoundsTight = exports.getBounds = void 0;
const flo_memoize_1 = require("flo-memoize");
const get_dx_1 = require("../../to-power-basis/get-dx");
const get_dy_1 = require("../../to-power-basis/get-dy");
const flo_poly_1 = require("flo-poly");
const get_interval_box_1 = require("./get-interval-box/get-interval-box");
const error_analysis_1 = require("../../error-analysis/error-analysis");
const double_double_1 = require("double-double");
const eval_de_casteljau_1 = require("../../local-properties-at-t/t-to-xy/eval-de-casteljau");
const { sqrtWithErr, divWithErr } = double_double_1.operators;
const abs = Math.abs;
const u = Number.EPSILON / 2;
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps
 */
let getXBoundsTight = flo_memoize_1.memoize(function getXBoundsTight(ps) {
    let pS = ps[0];
    let pE = ps[ps.length - 1];
    let minX;
    let maxX;
    if (pS[0] < pE[0]) {
        minX = { ts: [0, 0], box: [pS, pS] };
        maxX = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minX = { ts: [1, 1], box: [pE, pE] };
        maxX = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minX, maxX };
    }
    let dx = get_dx_1.getDx(ps); // <= exact if 48-bit aligned
    // Roots of derivative
    let rootsX;
    if (ps.length === 4) {
        rootsX = quadRoots(dx);
    }
    else { // ps.length === 3
        rootsX = getLinearRoots(dx);
    }
    // Test points
    for (let i = 0; i < rootsX.length; i++) {
        let r = rootsX[i];
        let ts = [r.r - r.rE, r.r + r.rE];
        let box = get_interval_box_1.getIntervalBox(ps, ts);
        if (box[0][0] < minX.box[0][0]) {
            minX = { ts, box };
        }
        if (box[1][0] > maxX.box[0][0]) {
            maxX = { ts, box };
        }
    }
    return { minX, maxX };
});
exports.getXBoundsTight = getXBoundsTight;
// TODO - move this another library
function getLinearRoots([a, b]) {
    let r = -b / a;
    let rE = u * abs(b / a);
    if (r + rE > 0 && r - rE < 1) {
        return [{ r, rE }];
    }
    return [];
}
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps
 */
let getYBoundsTight = flo_memoize_1.memoize(function getYBoundsTight(ps) {
    let pS = ps[0];
    let pE = ps[ps.length - 1];
    let minY;
    let maxY;
    if (pS[1] < pE[1]) {
        minY = { ts: [0, 0], box: [pS, pS] };
        maxY = { ts: [1, 1], box: [pE, pE] };
    }
    else {
        minY = { ts: [1, 1], box: [pE, pE] };
        maxY = { ts: [0, 0], box: [pS, pS] };
    }
    if (ps.length === 2) {
        return { minY, maxY };
    }
    let dy = get_dy_1.getDy(ps); // <= exact if 48-bit aligned
    // Roots of derivative
    let rootsY;
    if (ps.length === 4) {
        rootsY = quadRoots(dy);
    }
    else { // ps.length === 3
        rootsY = getLinearRoots(dy);
    }
    // Test points
    for (let i = 0; i < rootsY.length; i++) {
        let r = rootsY[i];
        let ts = [r.r - r.rE, r.r + r.rE];
        let box = get_interval_box_1.getIntervalBox(ps, ts);
        if (box[0][1] < minY.box[0][1]) {
            minY = { ts, box };
        }
        if (box[1][1] > maxY.box[0][1]) {
            maxY = { ts, box };
        }
    }
    return { minY, maxY };
});
exports.getYBoundsTight = getYBoundsTight;
/**
 * Return quad roots in range [0,1] with error assuming input coefficients
 * are exact.
 */
// TODO - move this another library
function quadRoots([a, b, c]) {
    // first check a !== 0, else get root of the line 'bt + c = 0'
    if (a === 0) {
        return getLinearRoots([b, c]);
    }
    // DD = discriminant = b^2 - 4ac
    // calculate DD and its absolute error DD_
    let bb = b * b;
    let bb_ = u * bb; // the error bound in b**2
    let ac4 = 4 * a * c;
    let ac4_ = 4 * u * abs(a * c);
    let DD = bb - ac4;
    let DD_ = bb_ + ac4_ + error_analysis_1.γ1 * abs(DD);
    // If the discriminant is smaller than negative the error bound then
    // certainly there are no roots.
    if (DD <= -DD_) {
        // discriminant is definitely negative
        return [];
    }
    // discriminant is definitely positive
    let { est: D, err: D_ } = sqrtWithErr(DD, DD_);
    let q1;
    if (b >= 0) {
        // let r1 = (-b - D) / 2*a;
        // let r2 = (2*c) / (-b - D);
        q1 = -b - D;
    }
    else {
        // let r2 = (-b + D) / 2*a;
        // let r1 = (2*c) / (-b + D);
        q1 = -b + D;
    }
    let q1_ = D_ + error_analysis_1.γ1 * abs(q1);
    let { est: r1, err: r1_ } = divWithErr(q1, 2 * a, q1_, 0);
    let { est: r2, err: r2_ } = divWithErr(2 * c, q1, 0, q1_);
    let res = [];
    if (r1 + r1_ > 0 && r1 - r1_ < 1) {
        res.push({ r: r1, rE: r1_ });
    }
    if (r2 + r2_ > 0 && r2 - r2_ < 1) {
        res.push({ r: r2, rE: r2_ });
    }
    return res;
}
/**
 * Returns the approximate axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
let getBounds = flo_memoize_1.memoize(function (ps) {
    // Roots of derivative
    let rootsX = flo_poly_1.allRoots(get_dx_1.getDx(ps), 0, 1);
    let rootsY = flo_poly_1.allRoots(get_dy_1.getDy(ps), 0, 1);
    // Endpoints
    rootsX.push(0, 1);
    rootsY.push(0, 1);
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let tMinX;
    let tMaxX;
    let tMinY;
    let tMaxY;
    // Test points
    for (let i = 0; i < rootsX.length; i++) {
        let t = rootsX[i];
        let x = eval_de_casteljau_1.evalDeCasteljauX(ps, t);
        if (x < minX) {
            minX = x;
            tMinX = t;
        }
        if (x > maxX) {
            maxX = x;
            tMaxX = t;
        }
    }
    for (let i = 0; i < rootsY.length; i++) {
        let t = rootsY[i];
        let y = eval_de_casteljau_1.evalDeCasteljauY(ps, t);
        if (y < minY) {
            minY = y;
            tMinY = t;
        }
        if (y > maxY) {
            maxY = y;
            tMaxY = t;
        }
    }
    let ts = [[tMinX, tMinY], [tMaxX, tMaxY]];
    let box = [[minX, minY], [maxX, maxY]];
    return { ts, box };
});
exports.getBounds = getBounds;
//# sourceMappingURL=get-bounds.js.map