/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 * * the precision of the returned coefficients can be high, e.g. for a cubic
 * the precision can require 6 doubles for the t^3 term.
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXYExact(ps: number[][]): [
    [number[], number[], number[], number],
    [
        number[],
        number[],
        number[],
        number
    ]
] | [
    [number[], number[], number],
    [
        number[],
        number[],
        number
    ]
] | [
    [number[], number],
    [
        number[],
        number
    ]
];
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXY3Exact(ps: number[][]): [
    [
        number[],
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number[],
        number
    ]
];
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A quadratic bezier curve, e.g. [[0,0],[1,1],[2,0]]
 *
 * @doc
 */
declare function getXY2Exact(ps: number[][]): [
    [
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number
    ]
];
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps An order 1 bezier curve (a line), e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXY1Exact(ps: number[][]): [
    [
        number[],
        number
    ],
    [
        number[],
        number
    ]
];
export { getXY1Exact, getXY2Exact, getXY3Exact, getXYExact };
