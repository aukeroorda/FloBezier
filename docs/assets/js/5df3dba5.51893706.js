"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6856],{5485:function(e,t,a){a.r(t),a.d(t,{assets:function(){return v},contentTitle:function(){return N},default:function(){return w},frontMatter:function(){return b},metadata:function(){return g},toc:function(){return y}});var n=a(7462),r=a(3366),i=a(7294),s=a(3905),d=a(3546),o=a(2041),l=a(6085),u=a(9354),p=(0,a(4388).t)(l.E,l.d),m=d.sn,c=[[2.5,6.5],[10.3,8.6],[15.3,.9],[5.3,1.7]],f=[[1,1],[5.125,8],[15.375,.875],[4.375,5.125]];function _(e){var t=[c,f],a=(0,u.P)(e,"#0f0","transparent"),n=(0,u.P)(e,"#f00","transparent"),r=m.apply(void 0,t);return a(c.map(p)),n(f.map(p)),[{result:r,params:[t]}]}function h(){return i.createElement(i.Fragment,null,i.createElement(o.O,{functionName:m.name,draw:_,draggables:[].concat(c,f)}))}var k=["components"],b={id:"simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",title:"hausdorff-distance-one-sided"},N=void 0,g={unversionedId:"modules/simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",id:"modules/simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",title:"hausdorff-distance-one-sided",description:"Defined in simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided.ts:60",source:"@site/docs/modules/simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided.mdx",sourceDirName:"modules",slug:"/modules/simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",permalink:"/FloBezier/docs/modules/simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",draft:!1,tags:[],version:"current",frontMatter:{id:"simultaneous_properties_hausdorff_distance_hausdorff_distance_one_sided",title:"hausdorff-distance-one-sided"},sidebar:"sidebar",previous:{title:"hausdorff-distance",permalink:"/FloBezier/docs/modules/simultaneous_properties_hausdorff_distance_hausdorff_distance"},next:{title:"to-power-basis-1st-derivative-error-counters",permalink:"/FloBezier/docs/modules/to_power_basis_to_power_basis_1st_derivative_to_power_basis_1st_derivative_error_counters"}},v={},y=[{value:"Parameters:",id:"parameters",level:4}],C={toc:y};function w(e){var t=e.components,a=(0,r.Z)(e,k);return(0,s.kt)("wrapper",(0,n.Z)({},C,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"function hausdorffDistanceOneSided(A: number[][], B: number[][], tolerance?: undefined | number, maxIterations?: number): number\n")),(0,s.kt)("p",null,(0,s.kt)("em",{parentName:"p"},"Defined in simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided.ts:60")),(0,s.kt)("p",null,"Calculates and returns an accurate approximation to the one-sided Hausdorff\ndistance from the bezier curve ",(0,s.kt)("inlineCode",{parentName:"p"},"A")," to the bezier curve ",(0,s.kt)("inlineCode",{parentName:"p"},"B"),"."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"partially based off ",(0,s.kt)("a",{parentName:"li",href:"https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016"},"Computing the Hausdorff distance between two sets of parametric curves"))),(0,s.kt)(h,{mdxType:"HausdorffDistanceOneSided"}),(0,s.kt)("h4",{id:"parameters"},"Parameters:"),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Name"),(0,s.kt)("th",{parentName:"tr",align:null},"Type"),(0,s.kt)("th",{parentName:"tr",align:null},"Default value"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"A")),(0,s.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,s.kt)("td",{parentName:"tr",align:null},"-"),(0,s.kt)("td",{parentName:"tr",align:null},"a bezier curve (the 'from' curve) given by an ordered array of its control points e.g. ",(0,s.kt)("inlineCode",{parentName:"td"},"[[0,0],[1,1],[2,1],[2,0]]"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"B")),(0,s.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,s.kt)("td",{parentName:"tr",align:null},"-"),(0,s.kt)("td",{parentName:"tr",align:null},"a bezier curve (the 'to' curve) given by an ordered array of its control points e.g. ",(0,s.kt)("inlineCode",{parentName:"td"},"[[0,0],[1,1],[2,1],[2,0]]"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"tolerance?")),(0,s.kt)("td",{parentName:"tr",align:null},"undefined ","|"," number"),(0,s.kt)("td",{parentName:"tr",align:null},"-"),(0,s.kt)("td",{parentName:"tr",align:null},"optional; defaults to ",(0,s.kt)("inlineCode",{parentName:"td"},"Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000"),"; if the calculated absolute error bound is less than this, the result is returned; this is ",(0,s.kt)("em",{parentName:"td"},"not")," a hard tolerance and the bound can be less accurate in hard cases (due to the ",(0,s.kt)("inlineCode",{parentName:"td"},"maxIterations")," parameter). Luckily however, specifically the lower bound will be very accurate due to its fast convergence in such hard cases (see the paper)")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"maxIterations")),(0,s.kt)("td",{parentName:"tr",align:null},"number"),(0,s.kt)("td",{parentName:"tr",align:null},"50"),(0,s.kt)("td",{parentName:"tr",align:null},"optional; defaults to ",(0,s.kt)("inlineCode",{parentName:"td"},"50"),"; if the desired guaranteed error bound has not been achieved after ",(0,s.kt)("inlineCode",{parentName:"td"},"maxIterations")," then the result will be returned")))))}w.isMDXComponent=!0}}]);