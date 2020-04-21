
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { calculate } from "flo-numerical";
import { getImplicitForm2Exact } from "../../../implicit-form/exact/get-implicit-form2";


function getCoeffs2x3Exact(ps1: number[][], ps2: number[][]) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2Exact(ps1);

    let [c3, c2, c1, c0] = getXExact(ps2);
    let [d3, d2, d1, d0] = getYExact(ps2);


    // a3**2*v_xx + a3*b3*v_xy + b3**2*v_yy
    let v6 = calculate([
        [c3,c3,vₓₓ], [c3,d3,vₓᵧ], [d3,d3,vᵧᵧ]
    ]);

    // 2*a2*a3*v_xx + a2*b3*v_xy + a3*b2*v_xy + 2*b2*b3*v_yy
    let v5 = calculate([
        [[2],c2,c3,vₓₓ], [    c2,d3,vₓᵧ], 
        [    c3,d2,vₓᵧ], [[2],d2,d3,vᵧᵧ]
    ]);

    // 2*a1*a3*v_xx + a1*b3*v_xy + a2**2*v_xx + a2*b2*v_xy + a3*b1*v_xy + 2*b1*b3*v_yy + b2**2*v_yy
    let v4 = calculate([
        [[2],c1,c3,vₓₓ], [c1,d3,vₓᵧ], [    c2,c2,vₓₓ],
        [    c2,d2,vₓᵧ], [c3,d1,vₓᵧ], [[2],d1,d3,vᵧᵧ],
        [    d2,d2,vᵧᵧ]
    ]);

    // 2*a0*a3*v_xx + a0*b3*v_xy + 2*a1*a2*v_xx + 
    // a1*b2*v_xy + a2*b1*v_xy + a3*b0*v_xy + 
    // a3*v_x + 2*b0*b3*v_yy + 2*b1*b2*v_yy + b3*v_y
    let v3 = calculate([
        [[2],c0,c3,vₓₓ], [c0,d3,vₓᵧ], [[2],c1,c2,vₓₓ],
        [c1,d2,vₓᵧ], [c2,d1,vₓᵧ], [c3,d0,vₓᵧ], 
        [c3,vₓ], [[2],d0,d3,vᵧᵧ], [[2],d1,d2,vᵧᵧ], 
        [d3,vᵧ]
    ]);
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    let v2 = calculate([
        [[2],c0,c2,vₓₓ], [c0,d2,vₓᵧ], [c1,c1,vₓₓ], 
        [c1,d1,vₓᵧ], [c2,d0,vₓᵧ], [c2,vₓ], 
        [[2],d0,d2,vᵧᵧ], [d1,d1,vᵧᵧ], [d2,vᵧ]
    ]);

    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + a1*v_x + 2*b0*b1*v_yy + b1*v_y
    let v1 = calculate([
        [[2],c0,c1,vₓₓ], [c0,d1,vₓᵧ], [c1,d0,vₓᵧ], 
        [c1,vₓ], [[2],d0,d1,vᵧᵧ], [d1,vᵧ]
    ]);
    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + b0**2*v_yy + b0*v_y + v_0
    let v0 = calculate([
        [c0,c0,vₓₓ], [c0,d0,vₓᵧ], [c0,vₓ], 
        [d0,d0,vᵧᵧ], [d0,vᵧ], [v]
    ]);    

    return [v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffs2x3Exact }
