"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6162],{718:function(t,e,n){n.r(e),n.d(e,{assets:function(){return v},contentTitle:function(){return g},default:function(){return C},frontMatter:function(){return _},metadata:function(){return f},toc:function(){return y}});var r=n(7462),i=n(3366),a=n(7294),l=n(3905),m=n(2041),d=n(6085),o=n(9354),p=n(3546),u=(0,n(4388).t)(d.E,d.d),c=p.wj,k=[[10,7],[8,4],[3,2],[1,8]];function b(t){var e=(0,o.P)(t,"#f00","transparent"),n=[k],r=c.apply(void 0,n);return e(k.map(u)),[{result:r,params:[n]}]}function s(){return a.createElement(a.Fragment,null,a.createElement(m.O,{functionName:"getImplicitForm3Dd",draw:b,draggables:k}))}var N=["components"],_={id:"implicit_form_double_double_get_implicit_form3_dd",title:"get-implicit-form3-dd"},g=void 0,f={unversionedId:"modules/implicit_form_double_double_get_implicit_form3_dd",id:"modules/implicit_form_double_double_get_implicit_form3_dd",title:"get-implicit-form3-dd",description:"Defined in implicit-form/double-double/get-implicit-form3-dd.ts:30",source:"@site/docs/modules/implicit_form_double_double_get_implicit_form3_dd.mdx",sourceDirName:"modules",slug:"/modules/implicit_form_double_double_get_implicit_form3_dd",permalink:"/FloBezier/docs/modules/implicit_form_double_double_get_implicit_form3_dd",draft:!1,tags:[],version:"current",frontMatter:{id:"implicit_form_double_double_get_implicit_form3_dd",title:"get-implicit-form3-dd"},sidebar:"sidebar",previous:{title:"get-implicit-form2-dd-with-running-error",permalink:"/FloBezier/docs/modules/implicit_form_double_double_get_implicit_form2_dd_with_running_error"},next:{title:"get-implicit-form3-dd-with-running-error",permalink:"/FloBezier/docs/modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error"}},v={},y=[{value:"Parameters:",id:"parameters",level:4}],h={toc:y};function C(t){var e=t.components,n=(0,i.Z)(t,N);return(0,l.kt)("wrapper",(0,r.Z)({},h,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"function getImplicitForm3Dd(ps: number[][]): object\n")),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Defined in ",(0,l.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/implicit-form/double-double/get-implicit-form3-dd.ts#L30"},"implicit-form/double-double/get-implicit-form3-dd.ts:30"))),(0,l.kt)("p",null,"Returns a double-double precision implicit form of the given cubic bezier\ncurve.\nReturned coefficients are subscripted to match their monomial's variables,\ne.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"v\u2093\u1d67")," is the coefficient of the monomial ",(0,l.kt)("inlineCode",{parentName:"p"},"v\u2093\u1d67xy")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"the implicit form is given by: ",(0,l.kt)("inlineCode",{parentName:"li"},"v\u2093\u2093\u2093x\xb3 + v\u2093\u2093\u1d67x\xb2y + v\u2093\u1d67\u1d67xy\xb2 + v\u1d67\u1d67\u1d67y\xb3 + v\u2093\u2093x\xb2 +v\u2093\u1d67xy + v\u1d67\u1d67y\xb2 + v\u2093x + v\u1d67y + v = 0")),(0,l.kt)("li",{parentName:"ul"},"intermediate calculations are done in double-double precision"),(0,l.kt)("li",{parentName:"ul"},"adapted from ",(0,l.kt)("a",{parentName:"li",href:"http://www.mare.ee/indrek/misc/2d.pdf"},"Indrek Mandre"))),(0,l.kt)(s,{mdxType:"GetImplicitForm3Dd"}),(0,l.kt)("h4",{id:"parameters"},"Parameters:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"ps")),(0,l.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,l.kt)("td",{parentName:"tr",align:null},"a cubic bezier curve given as an array of its control points, e.g. ",(0,l.kt)("inlineCode",{parentName:"td"},"[[1,2],[3,4],[5,7],[0,0]]"))))),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Returns:")," object"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u2093")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"v")),(0,l.kt)("td",{parentName:"tr",align:null},"number[]")))))}C.isMDXComponent=!0}}]);