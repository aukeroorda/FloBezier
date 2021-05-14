
import { getImplicitForm3InclError } from "../../../../implicit-form/double-incl-error/get-implicit-form3-incl-error";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez3Bez2InclError(
        ps1: number[][], 
        ps2: number[][]) {

    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3InclError(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    const _vₓₓₓ  = abs(vₓₓₓ);
    const _vₓₓᵧ  = abs(vₓₓᵧ);
    const _vₓᵧᵧ  = abs(vₓᵧᵧ);
    const _vᵧᵧᵧ  = abs(vᵧᵧᵧ);
    const _vₓₓ   = abs(vₓₓ);
    const _vₓᵧ   = abs(vₓᵧ);
    const _vᵧᵧ   = abs(vᵧᵧ);

    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);

    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0c2 = c0*c2;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c0d2 = c0*d2;
    const c1c1 = c1*c1;
    const c1c2 = c1*c2;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const c1d2 = c1*d2;
    const c2c2 = c2*c2;
    const c2d0 = c2*d0;
    const c2d1 = c2*d1;
    const c2d2 = c2*d2;
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;
    const d0d2 = d0*d2;
    const d1d1 = d1*d1;
    const d1d2 = d1*d2;
    const d2d2 = d2*d2;

    const _c0c0 = abs(c0c0);
    const _c0c1 = abs(c0c1);
    const _c0c2 = abs(c0c2);
    const _c0d0 = abs(c0d0);
    const _c0d1 = abs(c0d1);
    const _c0d2 = abs(c0d2);
    const _c1c1 = abs(c1c1);
    const _c1c2 = abs(c1c2);
    const _c1d0 = abs(c1d0);
    const _c1d1 = abs(c1d1);
    const _c1d2 = abs(c1d2);
    const _c2c2 = abs(c2c2);
    const _c2d0 = abs(c2d0);
    const _c2d1 = abs(c2d1);
    const _c2d2 = abs(c2d2);
    const _d0d0 = abs(d0d0);
    const _d0d1 = abs(d0d1);
    const _d0d2 = abs(d0d2);
    const _d1d1 = abs(d1d1);
    const _d1d2 = abs(d1d2);
    const _d2d2 = abs(d2d2);
   

    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //const v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    const e1 = c2*vₓₓₓ;
    const e1_ = _c2*vₓₓₓ_ + abs(e1);
    const e2 = c2*vₓᵧᵧ;
    const e2_ = _c2*vₓᵧᵧ_ + abs(e2);
    const e3 = d2*vₓₓᵧ;
    const e3_ = _d2*vₓₓᵧ_ + abs(e3);
    const e4 = d2*vᵧᵧᵧ;
    const e4_ = _d2*vᵧᵧᵧ_ + abs(e4);
    const e5 = e1 + e3;
    const _e5 = abs(e5);
    const e5_ = e1_ + e3_ + _e5;
    const e6 = e2 + e4;
    const _e6 = abs(e6);
    const e6_ = e2_ + e4_ + _e6;
    const e7 = c2c2*e5;
    const e7_ = _c2c2*(_e5 + e5_) + abs(e7);
    const e8 = d2d2*e6;
    const e8_ = _d2d2*(_e6 + e6_) + abs(e8);
    const v6 = e7 + e8;
    const v6_ = e7_ + e8_ + abs(v6);


    const z1 = c0c2 + c1c1;
    const z1_ = _c0c2 + _c1c1 + abs(z1);
    const z2 = d0d2 + d1d1;
    const z2_ = _d0d2 + _d1d1 + abs(z2);
    const z3 = 2*c0c2 + c1c1;
    const _z3 = abs(z3);
    const z3_ = 2*_c0c2 + _c1c1 + _z3;
    const z4 = 2*d0d2 + d1d1;
    const _z4 = abs(z4);
    const z4_ = 2*_d0d2 + _d1d1 + _z4;
    const z5 = 2*c1d1 + c2d0;
    const _z5 = abs(z5);
    const z5_ = 2*_c1d1 + _c2d0 + _z5;
    const z6 = 2*c1d1 + c0d2;
    const z6_ = 2*_c1d1 + _c0d2 + abs(z6);
    const z7 = 2*c2d0 + c1d1;
    const z7_ = 2*_c2d0 + _c1d1 + abs(z7);
    const z8 = 6*c0c2 + c1c1;
    const z8_ = 12*_c0c2 + _c1c1 + abs(z8);
    const z9 = 6*d0d2 + d1d1;
    const z9_ = 12*_d0d2 + _d1d1 + abs(z9);
    const za = c1d2 + c2d1;
    const _za = abs(za);
    const za_ = _c1d2 + _c2d1 + _za;
    const zb = c0d2 + c2d0;
    const zb_ = _c0d2 + _c2d0 + abs(zb);
    const zc = 2*c1d0 + c0d1;
    const zc_ = 2*_c1d0 + _c0d1 + abs(zc);
    const zd = 2*c0d1 + c1d0;
    const zd_ = 2*_c0d1 + _c1d0 + abs(zd);
    const zf = c0d2 + c1d1;
    const zf_ = _c0d2 + _c1d1 + abs(zf);
    const ze = zf + c2d0;
    const _ze = abs(ze);
    const ze_ = zf_ + _c2d0 + _ze;


    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //const v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    const s0 = 3*c2c2;
    const _s0 = abs(s0);
    const s0_ = 3*_c2c2 + _s0;
    const t1 = 3*d2d2;
    const _t1 = abs(t1);
    const t1_ = 3*_d2d2 + _t1;
    const s1 = s0*vₓₓₓ;
    const s1_ = s0_*_vₓₓₓ + _s0*vₓₓₓ_ + abs(s1);
    const s2 = c2c2*vₓₓᵧ;
    const s2_ = _c2c2*(_vₓₓᵧ + vₓₓᵧ_) + abs(s2);
    const s3 = 2*c2d2*vₓₓᵧ;
    const s3_ = 2*(_c2d2*(_vₓₓᵧ + vₓₓᵧ_)) + abs(s3);
    const s4 = 2*c2d2*vₓᵧᵧ;
    const s4_ = 2*(_c2d2*(_vₓᵧᵧ + vₓᵧᵧ_)) + abs(s4);
    const s5 = d2d2*vₓᵧᵧ;
    const s5_ = _d2d2*(_vₓᵧᵧ + vₓᵧᵧ_) + abs(s5);
    const s6 = t1*vᵧᵧᵧ;
    const s6_ = t1_*_vᵧᵧᵧ + _t1*vᵧᵧᵧ_ + abs(s6);
    const s7 = s1 + s3;
    const s7_ = s1_ + s3_ + abs(s7);
    const s8 = s2 + s4;
    const s8_ = s2_ + s4_ + abs(s8);
    const s9 = s7 + s5;
    const s9_ = s7_ + s5_ + abs(s9);
    const sa = s8 + s6;
    const sa_ = s8_ + s6_ + abs(sa);
    const sb = c1*s9;
    const sb_ = _c1*s9_ + abs(sb);
    const sc = d1*sa;
    const sc_ = _d1*sa_ + abs(sc);
    const v5 = sb + sc;
    const v5_ = sb_ + sc_ + abs(v5);


    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    //const v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //const v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    const sd = d2*z3;
    const sd_ = _d2*z3_ + abs(sd);
    const se = d2*z6;
    const se_ = _d2*z6_ + abs(se);
    const sf = c2*z5;
    const sf_ = _c2*z5_ + abs(sf);
    const sg = c2*z4;
    const sg_ = _c2*z4_ + abs(sg);
    const sh = (3*c2)*z1;
    const _sh = abs(sh);
    const sh_ = (3*_c2)*z1_ + _sh;  // 3*c2: 47-bit aligned => error free
    const si = (3*d2)*z2;
    const _si = abs(si);
    const si_ = (3*_d2)*z2_ + _si;  // 3*d2: 47-bit aligned => error free
    const sj = sd + sf;
    const _sj = abs(sj);
    const sj_ = sd_ + sf_ + _sj;
    const sk = se + sg;
    const _sk = abs(sk);
    const sk_ = se_ + sg_ + _sk;
    const sl = sh*vₓₓₓ;
    const sl_ = sh_*_vₓₓₓ + _sh*vₓₓₓ_ + abs(sl);
    const sm = si*vᵧᵧᵧ;
    const sm_ = si_*_vᵧᵧᵧ + _si*vᵧᵧᵧ_ + abs(sm);
    const sn = sj*vₓₓᵧ;
    const sn_ = sj_*_vₓₓᵧ + _sj*vₓₓᵧ_ + abs(sn);
    const so = sk*vₓᵧᵧ;
    const so_ = sk_*_vₓᵧᵧ + _sk*vₓᵧᵧ_ + abs(so);
    const sp = sl + sm;
    const sp_ = sl_ + sm_ + abs(sp);
    const sq = sn + so;
    const sq_ = sn_ + so_ + abs(sq);
    const sr = c2c2*vₓₓ;
    const sr_ = _c2c2*(vₓₓ_ + _vₓₓ) + abs(sr);
    const ss = d2d2*vᵧᵧ;
    const ss_ = _d2d2*(vᵧᵧ_ + _vᵧᵧ) + abs(ss);
    const st = c2d2*vₓᵧ;
    const st_ = _c2d2*(vₓᵧ_ + _vₓᵧ) + abs(st);
    const su = sr + ss;
    const su_ = sr_ + ss_ + abs(su);
    const sv = sp + sq;
    const sv_ = sp_ + sq_ + abs(sv);
    const sw = su + st;
    const sw_ = su_ + st_ + abs(sw);
    const v4 = sv + sw;
    const v4_ = sv_ + sw_ + abs(v4);


    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    //const v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //const v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    const sx = c1*z8;
    const _sx = abs(sx);
    const sx_ = _c1*z8_ + _sx;
    const sy = d1*z9;
    const _sy = abs(sy);
    const sy_ = _d1*z9_ + _sy;
    const sz = 2*c0*za;
    const sz_ = 2*(_c0*za_) + abs(sz);
    const o1 = 2*d1*zb;
    const o1_ = 2*(_d1*zb_) + abs(o1);
    const o2 = c1*z7;
    const o2_ = _c1*z7_ + abs(o2);
    const o3 = c1*z4;
    const o3_ = _c1*z4_ + abs(o3);
    const o4 = sz + o2;
    const _o4 = abs(o4);
    const o4_ = sz_ + o2_ + _o4;
    const o5 = o1 + o3;
    const _o5 = abs(o5);
    const o5_ = o1_ + o3_ + _o5;
    const o6 = d1d2*vᵧᵧ;
    const o6_ = _d1d2*(_vᵧᵧ + vᵧᵧ_) + abs(o6);
    const o7 = c1c2*vₓₓ;
    const o7_ = _c1c2*(_vₓₓ + vₓₓ_) + abs(o7);
    const o8 = za*vₓᵧ;
    const o8_ = za_*_vₓᵧ + _za*vₓᵧ_ + abs(o8);
    const o9 = o6 + o7;
    const o9_ = o6_ + o7_ + abs(o9);
    const oa = sx*vₓₓₓ;
    const oa_ = sx_*_vₓₓₓ + _sx*vₓₓₓ_ + abs(oa);
    const ob = o4*vₓₓᵧ;
    const ob_ = o4_*_vₓₓᵧ + _o4*vₓₓᵧ_ + abs(ob);
    const oc = sy*vᵧᵧᵧ;
    const oc_ = sy_*_vᵧᵧᵧ + _sy*vᵧᵧᵧ_ + abs(oc);
    const od = o5*vₓᵧᵧ;
    const od_ = o5_*_vₓᵧᵧ + _o5*vₓᵧᵧ_ + abs(od);
    const oe = oa + oc;
    const oe_ = oa_ + oc_ + abs(oe);
    const og = ob + od;
    const og_ = ob_ + od_ + abs(og);
    const oh = oe + og;
    const oh_ = oe_ + og_ + abs(oh);
    const oi = 2*o9 + o8;
    const oi_ = 2*o9_ + o8_ + abs(oi);
    const v3 = oh + oi;
    const v3_ = oh_ + oi_ + abs(v3);


    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    //const v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    const oj = (3*c0)*z1;
    const _oj = abs(oj);
    const oj_ = (3*_c0)*z1_ + _oj;
    const ok = (3*d0)*z2;
    const _ok = abs(ok);
    const ok_ = (3*_d0)*z2_ + _ok;
    const ol = c0*z6;
    const ol_ = _c0*z6_ + abs(ol);
    const om = c0*z4;
    const om_ = _c0*z4_ + abs(om);
    const on = d0*z3;
    const on_ = _d0*z3_ + abs(on);
    const oo = d0*z5;
    const oo_ = _d0*z5_ + abs(oo);
    const op = ol + on;
    const _op = abs(op);
    const op_ = ol_ + on_ + _op;
    const oq = om + oo;
    const _oq = abs(oq);
    const oq_ = om_ + oo_ + _oq;
    const or = oj*vₓₓₓ;
    const or_ = oj_*_vₓₓₓ + _oj*vₓₓₓ_ + abs(or);
    const os = ok*vᵧᵧᵧ;
    const os_ = ok_*_vᵧᵧᵧ + _ok*vᵧᵧᵧ_ + abs(os);
    const ot = op*vₓₓᵧ;
    const ot_ = op_*_vₓₓᵧ + _op*vₓₓᵧ_ + abs(ot);
    const ou = oq*vₓᵧᵧ;
    const ou_ = oq_*_vₓᵧᵧ + _oq*vₓᵧᵧ_ + abs(ou);
    const ov = z3*vₓₓ;
    const ov_ = z3_*_vₓₓ + _z3*vₓₓ_ + abs(ov);
    const ow = z4*vᵧᵧ;
    const ow_ = z4_*_vᵧᵧ + _z4*vᵧᵧ_ + abs(ow);
    const ox = ze*vₓᵧ;
    const ox_ = ze_*_vₓᵧ + _ze*vₓᵧ_ + abs(ox);
    const oy = c2*vₓ;
    const oy_ = _c2*vₓ_ + abs(oy);
    const oz = d2*vᵧ;
    const oz_ = _d2*vᵧ_ + abs(oz);
    const p1 = or + os;
    const p1_ = or_ + os_ + abs(p1);
    const p2 = ot + ou;
    const p2_ = ot_ + ou_ + abs(p2);
    const p3 = ov + ow;
    const p3_ = ov_ + ow_ + abs(p3);
    const p4 = p1 + p2;
    const p4_ = p1_ + p2_ + abs(p4);
    const p5 = p3 + ox;
    const p5_ = p3_ + ox_ + abs(p5);
    const p6 = oy + oz;
    const p6_ = oy_ + oz_ + abs(p6);
    const p7 = p4 + p5;
    const p7_ = p4_ + p5_ + abs(p7);
    const v2 = p7 + p6;
    const v2_ = p7_ + p6_ + abs(v2);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    const p8 = (3*c0)*c0c1;
    const _p8 = abs(p8);
    const p8_ = (3*_c0)*_c0c1 + _p8;
    const p9 = (3*d0)*d0d1;
    const _p9 = abs(p9);
    const p9_ = (3*_d0)*_d0d1 + _p9;
    const pa = c0*zc;
    const _pa = abs(pa);
    const pa_ = _c0*zc_ + _pa;
    const pb = d0*zd;
    const _pb = abs(pb);
    const pb_ = _d0*zd_ + _pb;
    const pc = c0c1*vₓₓ;
    const pc_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(pc);
    const pd = d0d1*vᵧᵧ;
    const pd_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(pd);
    const pe = c0d1*vₓᵧ;
    const pe_ = _c0d1*(_vₓᵧ + vₓᵧ_) + abs(pe);
    const pf = c1d0*vₓᵧ;
    const pf_ = _c1d0*(_vₓᵧ + vₓᵧ_) + abs(pf);
    const pg = 2*(pc + pd);
    const pg_ = 2*(pc_ + pd_) + abs(pg);
    const ph = pe + pf;
    const ph_ = pe_ + pf_ + abs(ph);
    const pi = c1*vₓ;
    const pi_ = _c1*vₓ_ + abs(pi);
    const pj = d1*vᵧ;
    const pj_ = _d1*vᵧ_ + abs(pj);
    const pk = p8*vₓₓₓ;
    const pk_ = p8_*_vₓₓₓ + _p8*vₓₓₓ_ + abs(pk);
    const pl = p9*vᵧᵧᵧ;
    const pl_ = p9_*_vᵧᵧᵧ + _p9*vᵧᵧᵧ_ + abs(pl);
    const pm = pa*vₓₓᵧ;
    const pm_ = pa_*_vₓₓᵧ + _pa*vₓₓᵧ_ + abs(pm);
    const pn = pb*vₓᵧᵧ;
    const pn_ = pb_*_vₓᵧᵧ + _pb*vₓᵧᵧ_ + abs(pn);
    const po = pk + pl;
    const po_ = pk_ + pl_ + abs(po);
    const pp = pm + pn;
    const pp_ = pm_ + pn_ + abs(pp);
    const pq = po + pp;
    const pq_ = po_ + pp_ + abs(pq);
    const pr = pg + ph;
    const pr_ = pg_ + ph_ + abs(pr);
    const ps = pi + pj;
    const ps_ = pi_ + pj_ + abs(ps);
    const pt = pq + pr;
    const pt_ = pq_ + pr_ + abs(pt);
    const v1 = pt + ps;
    const v1_ = pt_ + ps_ + abs(v1);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const pu = c0*vₓₓₓ;
    const pu_ = _c0*vₓₓₓ_ + abs(pu);
    const pv = c0*vₓᵧᵧ;
    const pv_ = _c0*vₓᵧᵧ_ + abs(pv);
    const pw = d0*vₓₓᵧ;
    const pw_ = _d0*vₓₓᵧ_ + abs(pw);
    const px = d0*vᵧᵧᵧ;
    const px_ = _d0*vᵧᵧᵧ_ + abs(px);
    const py = pu + pw;
    const py_ = pu_ + pw_ + abs(py);
    const pz = pv + px;
    const pz_ = pv_ + px_ + abs(pz);
    const u1 = py + vₓₓ;
    const _u1 = abs(u1);
    const u1_ = py_ + vₓₓ_ + _u1;
    const u2 = pz + vᵧᵧ;
    const _u2 = abs(u2);
    const u2_ = pz_ + vᵧᵧ_ + _u2;
    const u3 = c0c0*u1;
    const u3_ = _c0c0*(_u1 + u1_) + abs(u3);
    const u4 = d0d0*u2;
    const u4_ = _d0d0*(_u2 + u2_) + abs(u4);
    const u5 = c0d0*vₓᵧ;
    const u5_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(u5);
    const u6 = c0*vₓ;
    const u6_ = _c0*vₓ_ + abs(u6);
    const u7 = d0*vᵧ;
    const u7_ = _d0*vᵧ_ + abs(u7);
    const u8 = u3 + u4;
    const u8_ = u3_ + u4_ + abs(u8);
    const u9 = u8 + u5;
    const u9_ = u8_ + u5_ + abs(u9);
    const ua = u6 + u7;
    const ua_ = u6_ + u7_ + abs(ua);
    const ub = u9 + ua;
    const ub_ = u9_ + ua_ + abs(ub);
    const v0 = ub + v;
    const v0_ = ub_ + v_ + abs(v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez3Bez2InclError }
