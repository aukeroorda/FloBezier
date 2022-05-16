"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5424],{8132:function(e,t,n){n.d(t,{O:function(){return o}});var r=n(3546),a=n(809);function o(e,t,n){var o=function(n){return(0,a.x)(e,t,t)(n,4)};return function(a,i,l,s){void 0===l&&(l=!0),void 0===s&&(s=!0);var d=(0,r.JQ)(a,i[0],i[1]);if(4===a.length){var u=d[0],p=d[1],b=d[2],m=d[3],g=u[0],_=u[1],v=p[0],c=p[1],f=b[0],k=b[1],x=m[0],h=m[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(g,_),e.bezierCurveTo(v,c,f,k,x,h),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(g,_),e.lineTo(v,c),e.lineTo(f,k),e.lineTo(x,h),e.stroke(),e.restore()),l&&(o(u),o(p),o(b),o(m))}else if(3===a.length){var N=d[0],y=d[1],T=d[2],C=N[0],P=N[1],S=y[0],z=y[1],B=T[0],D=T[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(C,P),e.quadraticCurveTo(S,z,B,D),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(C,P),e.lineTo(S,z),e.lineTo(B,D),e.stroke(),e.restore()),l&&(o(N),o(y),o(T))}else if(2===a.length){var w=d[0],F=d[1],M=w[0],W=w[1],I=F[0],O=F[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(M,W),e.lineTo(I,O),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(M,W),e.lineTo(I,O),e.stroke(),e.restore()),l&&(o(w),o(F))}}}},8601:function(e,t,n){function r(e,t,n){return function(r){var a=r[0],o=a[0],i=a[1],l=r[1],s=l[0],d=l[1];t&&(e.strokeStyle=t),n&&(e.fillStyle=n),e.beginPath(),e.moveTo(o,i),e.lineTo(o,d),e.lineTo(s,d),e.lineTo(s,i),e.lineTo(o,i),t&&e.stroke(),n&&e.fill()}}n.d(t,{M:function(){return r}})},7632:function(e,t,n){n.r(t),n.d(t,{assets:function(){return T},contentTitle:function(){return N},default:function(){return S},frontMatter:function(){return h},metadata:function(){return y},toc:function(){return C}});var r=n(7462),a=n(3366),o=n(7294),i=n(3905),l=n(2041),s=n(6085),d=n(3546),u=n(4388),p=n(8601),b=n(9354),m=n(8132),g=(0,u.t)(s.E,s.d),_=d.I3,v=[[13.375,2.343],[3.15,4.41],[10.34,8.8],[15.818,2.406]],c=[{title:"t start",val:.15,min:0,max:1,step:.01},{title:"t end",val:.65,min:0,max:1,step:.01}];function f(e){var t=(0,p.M)(e,"#ff0",void 0),n=(0,b.P)(e,"#f00","transparent"),r=(0,m.O)(e,"#0f0",void 0),a=[v,[[0,c[0].val],[0,c[1].val]]],o=_.apply(void 0,a);return t(o.map((function(e){return e.map((function(e){return e[0]+e[1]}))})).map(g)),n(v.map(g)),r(v.map(g),[c[0].val,c[1].val],!0,!0),[{result:o,params:[a]}]}function k(){return o.createElement(l.O,{functionName:_.name,draw:f,draggables:v,scalars:c})}var x=["components"],h={id:"global_properties_bounds_get_interval_box_get_interval_box_dd",title:"get-interval-box-dd"},N=void 0,y={unversionedId:"modules/global_properties_bounds_get_interval_box_get_interval_box_dd",id:"modules/global_properties_bounds_get_interval_box_get_interval_box_dd",title:"get-interval-box-dd",description:"Defined in global-properties/bounds/get-interval-box/get-interval-box-dd.ts:59",source:"@site/docs/modules/global_properties_bounds_get_interval_box_get_interval_box_dd.mdx",sourceDirName:"modules",slug:"/modules/global_properties_bounds_get_interval_box_get_interval_box_dd",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_interval_box_get_interval_box_dd",draft:!1,tags:[],version:"current",frontMatter:{id:"global_properties_bounds_get_interval_box_get_interval_box_dd",title:"get-interval-box-dd"},sidebar:"sidebar",previous:{title:"get-interval-box",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_interval_box_get_interval_box"},next:{title:"classify",permalink:"/FloBezier/docs/modules/global_properties_classification_classify"}},T={},C=[{value:"Parameters:",id:"parameters",level:4}],P={toc:C};function S(e){var t=e.components,n=(0,a.Z)(e,x);return(0,i.kt)("wrapper",(0,r.Z)({},P,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function getIntervalBoxDd(ps: number[][], ts: number[][]): number[][][]\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/global-properties/bounds/get-interval-box/get-interval-box-dd.ts#L59"},"global-properties/bounds/get-interval-box/get-interval-box-dd.ts:59"))),(0,i.kt)("p",null,"Returns an axis-aligned-box that is guaranteed to engulf the entire\ngiven bezier curve from ",(0,i.kt)("inlineCode",{parentName:"p"},"t1")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"t2"),". The returned box is given as an array\nof points in double-double precision, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"[[[0,1],[0,1]], [[0,2],[0,2]]]"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"precondition"),": (to satisfy guarantee) t1 < t2"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"precondition"),": (to satisfy guarantee) t1,t2 >= 0 && t1,t2 <= 1")),(0,i.kt)(k,{mdxType:"GetIntervalBoxDd"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 1,2 or 3 bezier curve given as an array of its control points, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ts")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"parameter values, given in double-double precision, e.g. [","[0,0.11]",", ","[0,0.12]","]. (Use ",(0,i.kt)("a",{parentName:"td",href:"/FloBezier/docs/modules/global_properties_bounds_get_interval_box_get_interval_box#getintervalbox"},"getIntervalBox")," instead for double precision)")))))}S.isMDXComponent=!0}}]);