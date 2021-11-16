"use strict";
exports.__esModule = true;
exports.splitAtExact = exports.splitAtPrecise = exports.splitAt = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var big_float_ts_1 = require("big-float-ts");
var tp = big_float_ts_1.twoProduct;
var sum = big_float_ts_1.eSum;
var estimate = big_float_ts_1.eEstimate;
var epr = big_float_ts_1.expansionProduct;
var fes = big_float_ts_1.fastExpansionSum;
var sce = big_float_ts_1.scaleExpansion;
var splitAtFs = [splitLineAt, splitQuadAt, splitCubicAt];
/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 *
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 *
 * @doc
 */
function splitAt(ps, t) {
    return splitAtFs[ps.length - 2](ps, t);
}
exports.splitAt = splitAt;
var splitAtPreciseFs = [
    splitLineAtPrecise,
    splitQuadAtPrecise,
    splitCubicAtPrecise
];
/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 *
 * The result is precise, i.e. each returned coordinate is rounded to the
 * nearest ulp (unit in the last place)
 *
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 *
 * @doc
 */
function splitAtPrecise(ps, t) {
    return splitAtPreciseFs[ps.length - 2](ps, t);
}
exports.splitAtPrecise = splitAtPrecise;
var splitAtExactFs = [
    splitLineAtExact,
    splitQuadAtExact,
    splitCubicAtExact
];
// TODO - currently the bezier returned is exact, but not exactly according
// to the given ts due to division
function splitAtExact(ps, t) {
    return splitAtExactFs[ps.length - 2](ps, t);
}
exports.splitAtExact = splitAtExact;
/**
 * Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1]. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * and η is Number.EPSILON.
 *
 * @param ps A cubic bezier curve
 * @param t The t parameter where the curve should be split
 *
 * @doc
 */
function splitCubicAt(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var s = 1 - t;
    /** The split point */
    var p = [
        x3 * Math.pow(t, 3) + 3 * x2 * s * Math.pow(t, 2) + 3 * x1 * Math.pow(s, 2) * t + x0 * Math.pow(s, 3),
        y3 * Math.pow(t, 3) + 3 * y2 * s * Math.pow(t, 2) + 3 * y1 * Math.pow(s, 2) * t + y0 * Math.pow(s, 3)
    ];
    var ps1 = [
        [x0, y0],
        [x1 * t + x0 * s,
            y1 * t + y0 * s],
        [x2 * Math.pow(t, 2) + 2 * x1 * s * t + x0 * Math.pow(s, 2),
            y2 * Math.pow(t, 2) + 2 * y1 * s * t + y0 * Math.pow(s, 2)],
        p
    ];
    var ps2 = [
        p,
        [x3 * Math.pow(t, 2) + 2 * x2 * t * s + x1 * Math.pow(s, 2),
            y3 * Math.pow(t, 2) + 2 * y2 * t * s + y1 * Math.pow(s, 2)],
        [x3 * t + x2 * s,
            y3 * t + y2 * s],
        [x3, y3]
    ];
    return [ps1, ps2];
}
function splitCubicAtExact(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var s = 1 - t;
    var s2 = tp(s, s);
    var s3 = sce(s2, s);
    var t2 = tp(t, t);
    var t3 = sce(t2, t);
    var st = tp(s, t);
    var st2 = sce(t2, s);
    var s2t = sce(s2, t);
    /** The split point */
    var p = [
        //x3*t**3 + 3*x2*s*t**2 + 3*x1*s**2*t + x0*s**3,
        //y3*t**3 + 3*y2*s*t**2 + 3*y1*s**2*t + y0*s**3
        sum([
            epr(t3, x3),
            epr(st2, sce(x2, 3)),
            epr(s2t, sce(x1, 3)),
            epr(s3, x0)
        ]),
        sum([
            epr(t3, y3),
            epr(st2, sce(y2, 3)),
            epr(s2t, sce(y1, 3)),
            epr(s3, y0)
        ])
    ];
    var ps1 = [
        [x0, y0],
        [
            //x1*t + x0*s,
            //y1*t + y0*s
            fes(sce(x1, t), sce(x0, s)),
            fes(sce(y1, t), sce(y0, s))
        ],
        [
            //x2*t**2 + 2*x1*s*t + x0*s**2, 
            //y2*t**2 + 2*y1*s*t + y0*s**2
            sum([
                epr(t2, x2),
                epr(st, sce(x1, 2)),
                epr(s2, x0)
            ]),
            sum([
                epr(t2, y2),
                epr(st, sce(y1, 2)),
                epr(s2, y0)
            ])
        ],
        p
    ];
    var ps2 = [
        p,
        [
            //x3*t**2 + 2*x2*t*s + x1*s**2, 
            //y3*t**2 + 2*y2*t*s + y1*s**2
            sum([
                epr(t2, x3),
                epr(st, sce(x2, 2)),
                epr(s2, x1)
            ]),
            sum([
                epr(t2, y3),
                epr(st, sce(y2, 2)),
                epr(s2, y1)
            ])
        ],
        [
            //x3*t + x2*s, 
            //y3*t + y2*s
            fes(sce(x3, t), sce(x2, s)),
            fes(sce(y3, t), sce(y2, s)),
        ],
        [x3, y3]
    ];
    return [ps1, ps2];
}
/**
 * Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1]. Uses de Casteljau's algorithm.
 *
 * The result is precise, i.e. each returned coordinate is rounded to the
 * nearest ulp (unit in the last place)
 * @param ps A cubic bezier curve
 * @param t The t parameter where the curve should be split
 */
function splitCubicAtPrecise(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var s = 1 - t;
    var s2 = tp(s, s);
    var s3 = sce(s2, s);
    var t2 = tp(t, t);
    var t3 = sce(t2, t);
    var st = tp(s, t);
    var st2 = sce(t2, s);
    var s2t = sce(s2, t);
    /** The split point */
    var p = [
        //x3*t**3 + 3*x2*s*t**2 + 3*x1*s**2*t + x0*s**3,
        //y3*t**3 + 3*y2*s*t**2 + 3*y1*s**2*t + y0*s**3
        estimate(sum([
            sce(t3, x3),
            sce(st2, 3 * x2),
            sce(s2t, 3 * x1),
            sce(s3, x0)
        ])),
        estimate(sum([
            sce(t3, y3),
            sce(st2, 3 * y2),
            sce(s2t, 3 * y1),
            sce(s3, y0)
        ]))
    ];
    var ps1 = [
        [x0, y0],
        [
            //x1*t + x0*s,
            //y1*t + y0*s
            estimate(fes(tp(x1, t), tp(x0, s))),
            estimate(fes(tp(y1, t), tp(y0, s)))
        ],
        [
            //x2*t**2 + 2*x1*s*t + x0*s**2, 
            //y2*t**2 + 2*y1*s*t + y0*s**2
            estimate(sum([
                sce(t2, x2),
                sce(st, 2 * x1),
                sce(s2, x0)
            ])),
            estimate(sum([
                sce(t2, y2),
                sce(st, 2 * y1),
                sce(s2, y0)
            ]))
        ],
        p
    ];
    var ps2 = [
        p,
        [
            //x3*t**2 + 2*x2*t*s + x1*s**2, 
            //y3*t**2 + 2*y2*t*s + y1*s**2
            estimate(sum([
                sce(t2, x3),
                sce(st, 2 * x2),
                sce(s2, x1)
            ])),
            estimate(sum([
                sce(t2, y3),
                sce(st, 2 * y2),
                sce(s2, y1)
            ]))
        ],
        [
            //x3*t + x2*s, 
            //y3*t + y2*s
            estimate(fes(tp(x3, t), tp(x2, s))),
            estimate(fes(tp(y3, t), tp(y2, s))),
        ],
        [x3, y3]
    ];
    return [ps1, ps2];
}
function splitQuadAt(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var s = 1 - t;
    /** The split point */
    var p = [
        x0 * Math.pow(s, 2) + 2 * x1 * s * t + x2 * Math.pow(t, 2),
        y0 * Math.pow(s, 2) + 2 * y1 * s * t + y2 * Math.pow(t, 2)
    ];
    var ps1 = [
        [x0, y0],
        [x0 * s + x1 * t,
            y0 * s + y1 * t],
        p
    ];
    var ps2 = [
        p,
        [x1 * s + x2 * t,
            y1 * s + y2 * t],
        [x2, y2]
    ];
    return [ps1, ps2];
}
function splitQuadAtExact(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var s = 1 - t;
    var t2 = tp(t, t);
    var s2 = tp(s, s);
    var st = tp(s, t);
    /** The split point */
    var p = [
        //x0*s**2 + 2*x1*s*t + x2*t**2,
        //y0*s**2 + 2*y1*s*t + y2*t**2
        sum([
            epr(s2, x0),
            epr(st, sce(x1, 2)),
            epr(t2, x2)
        ]),
        sum([
            epr(s2, y0),
            epr(st, sce(y1, 2)),
            epr(t2, y2)
        ])
    ];
    var ps1 = [
        [x0, y0],
        [
            //x0*s + x1*t, 
            //y0*s + y1*t
            fes(sce(x0, s), sce(x1, t)),
            fes(sce(y0, s), sce(y1, t)),
        ],
        p
    ];
    var ps2 = [
        p,
        [
            //x1*s + x2*t, 
            //y1*s + y2*t
            fes(sce(x1, s), sce(x2, t)),
            fes(sce(y1, s), sce(y2, t)),
        ],
        [x2, y2]
    ];
    return [ps1, ps2];
}
/**
 *
 * @param ps
 * @param t
 */
function splitQuadAtPrecise(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var s = 1 - t;
    var t2 = tp(t, t);
    var s2 = tp(s, s);
    var st = tp(s, t);
    /** The split point */
    var p = [
        //x0*s**2 + 2*x1*s*t + x2*t**2,
        //y0*s**2 + 2*y1*s*t + y2*t**2
        estimate(sum([
            sce(s2, x0),
            sce(st, 2 * x1),
            sce(t2, x2)
        ])),
        estimate(sum([
            sce(s2, y0),
            sce(st, 2 * y1),
            sce(t2, y2)
        ]))
    ];
    var ps1 = [
        [x0, y0],
        [
            //x0*s + x1*t, 
            //y0*s + y1*t
            estimate(fes(tp(x0, s), tp(x1, t))),
            estimate(fes(tp(y0, s), tp(y1, t))),
        ],
        p
    ];
    var ps2 = [
        p,
        [
            //x1*s + x2*t, 
            //y1*s + y2*t
            estimate(fes(tp(x1, s), tp(x2, t))),
            estimate(fes(tp(y1, s), tp(y2, t))),
        ],
        [x2, y2]
    ];
    return [ps1, ps2];
}
function splitLineAt(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var s = 1 - t;
    /** The split point */
    var p = [
        s * x0 + t * x1,
        s * y0 + t * y1
    ];
    var ps1 = [
        [x0, y0],
        p
    ];
    var ps2 = [
        p,
        [x1, y1]
    ];
    return [ps1, ps2];
}
function splitLineAtExact(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var s = 1 - t;
    /** The split point */
    var p = [
        //s*x0 + t*x1,
        //s*y0 + t*y1
        fes(sce(x0, s), sce(x1, t)),
        fes(sce(y0, s), sce(y1, t))
    ];
    var ps1 = [
        [x0, y0],
        p
    ];
    var ps2 = [
        p,
        [x1, y1]
    ];
    return [ps1, ps2];
}
/**
 *
 * @param ps
 * @param t
 */
function splitLineAtPrecise(ps, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var s = 1 - t;
    /** The split point */
    var p = [
        //s*x0 + t*x1,
        //s*y0 + t*y1
        estimate(fes(tp(s, x0), tp(t, x1))),
        estimate(fes(tp(s, y0), tp(t, y1)))
    ];
    var ps1 = [
        [x0, y0],
        p
    ];
    var ps2 = [
        p,
        [x1, y1]
    ];
    return [ps1, ps2];
}