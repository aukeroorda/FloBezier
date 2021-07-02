
function getClosestOnBezier1FromPoint(ps: number[][], p: number[]) {
    const [[x0, y0], [x1, y1]] = ps;
    const [xp, yp] = p;

    const xx0 = x0 - xp;
    const xx1 = x1 - xp;
    const yy0 = y0 - yp;
    const yy1 = y1 - yp;

    const x00 = xx0*xx0;
    const x01 = xx0*xx1;
    const x11 = xx1*xx1;

    const y00 = yy0*yy0;
    const y01 = yy0*yy1;
    const y11 = yy1*yy1;

    const s1 = x01 + y01;
    const s2 = y00 + x00;

    const t1 = (x11 + y11) + (s2 - 2*s1);
    const t0 = s1 - s2;

    return [t1,t0];
}


export { getClosestOnBezier1FromPoint }
