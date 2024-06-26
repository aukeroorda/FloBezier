import type { BezierPiece } from './bezier-piece.js';
import type { Bound, XBounds, YBounds } from './global-properties/bounds/bounds.js';
import type { X } from './intersection/bezier-bezier-intersection/x.js';
import type { Extrema } from './get-curvature-extrema/get-curvature-extrema.js';
import type { ClassificationType, Classification, NodeType } from './global-properties/classification/classify.js';

import { getBoundingHull } from './global-properties/bounds/get-bounding-hull.js';
import { classify, classifications, classification } from './global-properties/classification/classify.js';
import { area } from './global-properties/area.js';
import { length } from './global-properties/length/length.js';
import { totalLength } from './global-properties/length/total-length.js';
import { clone } from './transformation/clone.js';
import { getTAtLength } from './local-properties-to-t/get-t-at-length.js';
import { equal } from './simultaneous-properties/equal.js';
import { γ, γγ } from './error-analysis/error-analysis.js'
import { fromToInclErrorBound } from './transformation/split/from-to-incl-error-bound.js';
import { fromTo } from './transformation/split/from-to.js';
import { fitQuadsToCubic } from './fit/fit-quads-to-cubic.js';
import { getControlPointBox } from './global-properties/bounds/get-control-point-box.js';
import { closestPointOnBezier } from './simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { furthestPointOnBezier } from './simultaneous-properties/closest-and-furthest-point-on-bezier/furthest-point-on-bezier.js';
import { generateQuarterCircle } from './create/generate-quarter-circle.js';
import { bezierBezierIntersectionFast } from './intersection/bezier-bezier-intersection-fast/bezier-bezier-intersection-fast.js';
import { intersectBoxes } from './boxes/intersect-boxes.js';
import { areBoxesIntersecting } from './boxes/are-boxes-intersecting.js';
import { evalDeCasteljau } from './local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { evalDeCasteljauError } from './local-properties-at-t/evaluate/eval-de-casteljau-error.js';
import { evalDeCasteljauWithErr } from './local-properties-at-t/evaluate/double/eval-de-casteljau-with-err.js';
import { evalDeCasteljauWithErrDd } from './local-properties-at-t/evaluate/double-double/eval-de-casteljau-with-err-dd.js';
import { evalDeCasteljauDd } from './local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';
import { isPointOnBezierExtension } from './simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension.js';
import { totalCurvature, totalAbsoluteCurvature } from './global-properties/total-absolute-curvature.js';
import { reverse } from './transformation/reverse.js';
import { getInflections } from './global-properties/get-inflections.js';
import { getCoeffsBezBez } from './intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez.js';
import { evaluateImplicit3 } from './implicit-form/evaluate/double/evaluate-implicit3.js';
import { getImplicitForm3 } from './implicit-form/double/get-implicit-form3.js';
import { getImplicitForm3Dd } from './implicit-form/double-double/get-implicit-form3-dd.js'
import { getImplicitForm3ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form3-error-counters.js';
import { getImplicitForm3DdWithRunningError } from './implicit-form/double-double/get-implicit-form3-dd-with-running-error.js';
import { getImplicitForm3Exact } from './implicit-form/exact/get-implicit-form3-exact.js';
import { evaluateImplicit2 } from './implicit-form/evaluate/double/evaluate-implicit2.js';
import { getImplicitForm2 } from './implicit-form/double/get-implicit-form2.js';
import { getImplicitForm2Dd } from './implicit-form/double-double/get-implicit-form2-dd.js'
import { getImplicitForm2ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form2-error-counters.js';
import { getImplicitForm2DdWithRunningError } from './implicit-form/double-double/get-implicit-form2-dd-with-running-error.js';
import { getImplicitForm2Exact } from './implicit-form/exact/get-implicit-form2-exact.js';
import { evaluateImplicit1 } from './implicit-form/evaluate/double/evaluate-implicit1.js';
import { getImplicitForm1 } from './implicit-form/double/get-implicit-form1.js';
import { getImplicitForm1Dd } from './implicit-form/double-double/get-implicit-form1-dd.js'
import { getImplicitForm1ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form1-error-counters.js';
import { getImplicitForm1DdWithRunningError } from './implicit-form/double-double/get-implicit-form1-dd-with-running-error.js';
import { getImplicitForm1Exact } from './implicit-form/exact/get-implicit-form1-exact.js';
import { fromPowerBasis } from './from-power-basis/from-power-basis.js';
import { getHodograph } from './transformation/get-hodograph.js';
import { generateCuspAtHalf3 } from './create/generate-cusp-at-half-t.js';
import { generateSelfIntersecting } from './create/generate-self-intersecting.js';
import { cubicThroughPointGiven013 } from './create/cubic-through-point-given013.js';
import { bezierSelfIntersection } from './intersection/self-intersection/bezier-self-intersection.js';
import { getEndpointIntersections } from './intersection/get-endpoint-intersections/get-endpoint-intersections.js';
import { tFromXY } from './local-properties-to-t/t-from-xy.js';
import { toPowerBasis } from './to-power-basis/to-power-basis/double/to-power-basis.js';
import { toPowerBasis_1stDerivative } from './to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { toPowerBasis_2ndDerivative } from './to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js';
import { toPowerBasis_3rdDerivative } from './to-power-basis/to-power-basis-3rd-derivative/double/to-power-basis-3rd-derivative.js';
import { toPowerBasisDd } from './to-power-basis/to-power-basis/double-double/to-power-basis-dd.js';
import { toPowerBasis_1stDerivativeDd } from './to-power-basis/to-power-basis-1st-derivative/double-double/to-power-basis-1st-derivative-dd.js';
import { toPowerBasis_2ndDerivativeDd } from './to-power-basis/to-power-basis-2nd-derivative/double-double/to-power-basis-2nd-derivative-dd.js';
import { toPowerBasis_3rdDerivativeDd } from './to-power-basis/to-power-basis-3rd-derivative/double-double/to-power-basis-3rd-derivative-dd.js';
import { toPowerBasisExact } from './to-power-basis/to-power-basis/exact/to-power-basis-exact.js';
import { toPowerBasis_1stDerivativeExact } from './to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js';
import { toPowerBasis_2ndDerivativeExact } from './to-power-basis/to-power-basis-2nd-derivative/exact/to-power-basis-2nd-derivative-exact.js';
import { toPowerBasis_3rdDerivativeExact } from './to-power-basis/to-power-basis-3rd-derivative/exact/to-power-basis-3rd-derivative-exact.js';
import { toPowerBasisWithRunningError } from './to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js';
import { toPowerBasisDdWithRunningError } from './to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';
import { toPowerBasisErrorCounters } from './to-power-basis/to-power-basis/to-power-basis-error-counters.js';
import { toPowerBasis_1stDerivativeErrorCounters } from './to-power-basis/to-power-basis-1st-derivative/to-power-basis-1st-derivative-error-counters.js';
import { normal } from './local-properties-at-t/normal/normal.js';
import { normal2 } from './local-properties-at-t/normal/normal2.js';
import { bezierBezierIntersection } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection.js';
import { toCubic } from './transformation/degree-or-type/to-cubic.js';
import { κ, curvature } from './local-properties-at-t/curvature.js';
import { eCurvature } from './local-properties-at-t/e-curvature.js';
import { ddCurvature } from './local-properties-at-t/dd-curvature.js';
import { quadraticToPolyline } from './fit/quadratic-to-polyline.js';
import { isQuadObtuse } from './global-properties/classification/is-quad-obtuse.js';
import { getIntervalBox } from './global-properties/bounds/get-interval-box/get-interval-box.js';
import { getIntervalBoxDd } from './global-properties/bounds/get-interval-box/get-interval-box-dd.js';
import { getInterfaceRotation } from './simultaneous-properties/get-interface-rotation.js';
import { closestPointOnBezierCertified } from './simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier-certified.js';
import { getFootPointsOnBezierCertified } from './simultaneous-properties/closest-and-furthest-point-on-bezier/get-foot-points-on-bezier-certified.js';
import { getFootPointsOnBezierPolysCertified } from './simultaneous-properties/closest-and-furthest-point-on-bezier/get-foot-points-polys-on-bezier-certified.js';
import { hausdorffDistanceOneSided } from './simultaneous-properties/hausdorff-distance/hausdorff-distance-one-sided.js';
import { hausdorffDistance } from './simultaneous-properties/hausdorff-distance/hausdorff-distance.js';
import { controlPointLinesLength } from './global-properties/length/control-point-lines-length.js';
import { splitByLength } from './transformation/split/split-by-length.js';
import { getCurvatureExtrema } from './get-curvature-extrema/get-curvature-extrema.js';
import { getCurvatureExtremaDd } from './get-curvature-extrema-dd/get-curvature-extrema-dd.js';
import { getCurvatureExtremaE } from './get-curvature-extrema-e/get-curvature-extrema-e.js';
import { curviness } from './global-properties/curviness.js';
import { splitByCurvature } from './transformation/split/split-by-curvature.js';
import { splitByCurvatureAndLength } from './transformation/split/split-by-curvature-and-length.js';
import { isCollinear, isHorizontal, isVertical } from './global-properties/classification/is-collinear.js';
import { isSelfOverlapping } from './global-properties/classification/is-self-overlapping.js';
import { getBounds } from './global-properties/bounds/get-bounds.js';
import { getBoundingBoxTight } from './global-properties/bounds/get-bounding-box-tight.js';
import { getBoundingBox } from './global-properties/bounds/get-bounding-box.js';
import { cubicToHybridQuadratic } from './transformation/degree-or-type/cubic-to-hybrid-quadratic.js';
import { isCubicReallyLine } from './global-properties/classification/is-cubic-really-line.js';
import { isCubicReallyQuad } from './global-properties/classification/is-cubic-really-quad.js';
import { isQuadReallyLine } from  './global-properties/classification/is-quad-really-line.js';
import { isReallyPoint } from './global-properties/classification/is-really-point.js';
import { cubicToQuadratic } from './transformation/degree-or-type/cubic-to-quadratic.js';
import { quadraticToCubic } from './transformation/degree-or-type/quadratic-to-cubic.js';
import { circleBezierIntersection } from './intersection/circle-bezier-intersection/circle-bezier-intersection.js';
import { evaluateExact } from './local-properties-at-t/evaluate/exact/evaluate-exact.js';
import { evaluate } from './local-properties-at-t/evaluate/double/evaluate.js';
import { lineToQuadratic } from './transformation/degree-or-type/line-to-quadratic.js';
import { lineToCubic } from './transformation/degree-or-type/line-to-cubic.js';
import { tangent } from './local-properties-at-t/tangent/double/tangent.js';
import { evaluate2ndDerivative } from './local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative.js';
import { tangentExact } from './local-properties-at-t/tangent/exact/tangent-exact.js'
import { evaluate2ndDerivativeExact } from './local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-exact.js'
import { tangentAt0Exact } from './local-properties-at-t/tangent/exact/tangent-at-0-exact.js'
import { evaluate2ndDerivativeAt0Exact } from './local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-at-0-exact.js'
import { tangentAt1Exact } from './local-properties-at-t/tangent/exact/tangent-at-1-exact.js'
import { evaluate2ndDerivativeAt1Exact } from './local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-at-1-exact.js'
import { tangentAt0 } from './local-properties-at-t/tangent/double/tangent-at-0.js';
import { evaluate2ndDerivativeAt0 } from './local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative-at-0.js';
import { tangentAt1 } from './local-properties-at-t/tangent/double/tangent-at-1.js';
import { evaluate2ndDerivativeAt1 } from './local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative-at-1.js';
import { toString } from './transformation/to-string.js';
import { bezierBezierIntersectionBoundless } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection-boundless.js';
import { getXBoundsTight } from './global-properties/bounds/get-x-bounds-tight.js';
import { getYBoundsTight } from './global-properties/bounds/get-y-bounds-tight.js';
import { getFootpointPolyExact } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/exact/get-footpoint-poly-exact.js";
import { getFootpointPoly } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly.js";
import { getFootpointPolyDd } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double-double/get-footpoint-poly-dd.js";
import { reduceOrderIfPossible } from './transformation/reduce-order-if-possible.js'
import { getAbsAreaBetween } from './fit/get-abs-area-between.js';
import { getBendingEnergy } from './global-properties/get-bending-energy.js';
import { AnglesAndSpeeds } from './angles-and-speeds/angles-and-speeds.js';
import { cubicFromAnglesAndSpeeds } from './angles-and-speeds/bezier-by-angles-and-speeds/cubic-from-angles-and-speeds.js';
import { cubicToAnglesAndSpeeds } from './angles-and-speeds/bezier-by-angles-and-speeds/cubic-to-angles-and-speeds.js';
import { getCubicSpeeds } from './angles-and-speeds/bezier-by-angles-and-speeds/get-cubic-speeds.js';
import { setCubicSpeeds } from './angles-and-speeds/bezier-by-angles-and-speeds/set-cubic-speeds.js';
import { closestPointsBetweenBeziers } from './simultaneous-properties/closest-distance-between-beziers/closest-distance-between-beziers.js';
import { maxAbsCoordinate } from './error-analysis/max-abs-coordinate.js';


export {
	classify,
	classifications, 
	classification,

	toPowerBasis,
	toPowerBasis_1stDerivative,
	toPowerBasis_2ndDerivative,
	toPowerBasis_3rdDerivative,
	tangentAt1,
	evaluate2ndDerivativeAt1,
	tangentAt0,
	evaluate2ndDerivativeAt0,

	toPowerBasis_3rdDerivativeDd,
	toPowerBasis_2ndDerivativeDd,
	toPowerBasis_1stDerivativeDd,
	toPowerBasisDd,

	toPowerBasisExact,
	toPowerBasis_1stDerivativeExact,
	toPowerBasis_2ndDerivativeExact,
	toPowerBasis_3rdDerivativeExact,

	toPowerBasisWithRunningError,
	toPowerBasisDdWithRunningError,

	toPowerBasisErrorCounters,
	toPowerBasis_1stDerivativeErrorCounters,

	κ, curvature,
	eCurvature,
	ddCurvature,
	tangent,
	normal,
	normal2,

	getTAtLength,

	toCubic,
	fromPowerBasis,
	cubicToHybridQuadratic,

	reverse,
	fromToInclErrorBound,
	fromTo,
	splitByLength,
	splitByCurvature,
	splitByCurvatureAndLength,
	clone,

	toString,

	quadraticToPolyline,

	evaluateImplicit3,
	getImplicitForm3,
	getImplicitForm3Dd,
	getImplicitForm3ErrorCounters,
	getImplicitForm3DdWithRunningError,
	getImplicitForm3Exact,

	evaluateImplicit2,
	getImplicitForm2,
	getImplicitForm2Dd,
	getImplicitForm2ErrorCounters,
	getImplicitForm2DdWithRunningError,
	getImplicitForm2Exact,

	evaluateImplicit1,
	getImplicitForm1,
	getImplicitForm1Dd,
	getImplicitForm1ErrorCounters,
	getImplicitForm1DdWithRunningError,
	getImplicitForm1Exact,

	getBounds,
	getXBoundsTight, getYBoundsTight,
	getBoundingHull,
	getBoundingBoxTight,
	getBoundingBox,
	controlPointLinesLength,
	getIntervalBox,

	getCurvatureExtrema,
	getCurvatureExtremaDd,
	getCurvatureExtremaE,
	totalCurvature,
	totalAbsoluteCurvature,

	length,
	getBendingEnergy,
	area,
	totalLength,
	isQuadObtuse,
	curviness,
	isCollinear, isHorizontal, isVertical,
	isSelfOverlapping,
	getHodograph,
	isReallyPoint,
	isQuadReallyLine,
	isCubicReallyQuad,
	isCubicReallyLine,
	cubicToQuadratic,
	quadraticToCubic,
	getInflections,

	equal,
	γ,γγ,
	closestPointOnBezierCertified,
	getFootPointsOnBezierCertified,
	getFootPointsOnBezierPolysCertified,
	getInterfaceRotation,
	closestPointOnBezier,
	furthestPointOnBezier,
	generateQuarterCircle,
	hausdorffDistanceOneSided,
	hausdorffDistance,
	tFromXY,

	bezierBezierIntersection, 
	getCoeffsBezBez,
	intersectBoxes,
	areBoxesIntersecting,
	
	circleBezierIntersection,
	bezierSelfIntersection,

	generateCuspAtHalf3,
	generateSelfIntersecting,
	cubicThroughPointGiven013,

	getIntervalBoxDd,
	evalDeCasteljau,
	evalDeCasteljauError,
	evalDeCasteljauWithErr,
	evalDeCasteljauWithErrDd,
	evaluateExact,
	isPointOnBezierExtension,

	evaluate,

	evaluate2ndDerivative,
	tangentExact,
	evaluate2ndDerivativeExact,
	evaluate2ndDerivativeAt0Exact,
	evaluate2ndDerivativeAt1Exact,
	tangentAt0Exact,
	tangentAt1Exact,
	evalDeCasteljauDd,
	bezierBezierIntersectionBoundless,
	reduceOrderIfPossible,

	bezierBezierIntersectionFast,

	getControlPointBox,
	fitQuadsToCubic,

	lineToQuadratic,
	lineToCubic,

	getFootpointPoly,
	getFootpointPolyDd,
	getFootpointPolyExact,

	getEndpointIntersections,
	getAbsAreaBetween,

	cubicFromAnglesAndSpeeds,
	cubicToAnglesAndSpeeds,
	getCubicSpeeds,
	setCubicSpeeds,

	closestPointsBetweenBeziers,
	maxAbsCoordinate
}


export type { 
	BezierPiece,
	X,
	Bound, XBounds, YBounds,
	Extrema,
	ClassificationType,
	Classification,
	NodeType,
	AnglesAndSpeeds
}
