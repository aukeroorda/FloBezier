/// <reference path="../chai-extensions.d.ts" />
const eps = Number.EPSILON;
const abs = Math.abs;


/**
 * @param ulps If a number then 2\*\*1 means last bit, 2\*\*2 means last 2 bits, etc... 
 * else if an array containing a single number then 1 means 1 eps, 2 means 2 eps, etc...
 */
function closeTo(ulpsOrEps: number | number[]) {
    let isUlps = true;
    if (Array.isArray(ulpsOrEps)) {
        isUlps = false;
        ulpsOrEps = ulpsOrEps[0];
    }

    function check(
            expected: NumberObjOrArray,
            actual: NumberObjOrArray): boolean {

        if (typeof expected === 'number') {
            if (typeof actual !== 'number') { return false; }
            const error = abs((isUlps ? expected : 1)*(ulpsOrEps as number)*eps);
            const actual_ = actual as number;

            return (
                (actual_ >= expected - error) && 
                (actual_ <= expected + error)
            );
        }

        if (Array.isArray(expected)) {
            if (!Array.isArray(actual)) { return false; }
            if (expected.length !== actual.length) { return false; }

            for (let i=0; i<expected.length; i++) {
                const e = expected[i];
                const a = actual[i];
    
                if (!check(e,a)) { return false; }
            }

            return true;
        }
        
        if (typeof expected === 'object') {
            if (typeof actual !== 'object') { return false; }
            const keys = Object.keys(expected);
            const keysE = Object.keys(actual);
            if (keys.length !== keysE.length) { return false; }
            for (let key of keys) {
                const e = expected[key];
                const a = actual[key];

                if (!check(e,a)) { return false; }
            }

            return true;
        }

        return false;  // unsupported types
    }

    return check;
}


export { closeTo }
