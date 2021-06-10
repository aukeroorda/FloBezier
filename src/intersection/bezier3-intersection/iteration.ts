
/**
 * Represents a single iteration node in the geometric interval bezier-bezier
 * intersection algorithm.
 * 
 * @internal
 */
interface Iteration {
    /** the bezier curve to be fat line bounded */
    F: number[][];
    /** the bezier curve to be geometric interval bounded */
    G: number[][];
    /** a paramter t value range of the F bezier that potentially contains an intersection */
    fRange: number[];
    /** a paramter t value range of the G bezier that potentially contains an intersection */
    gRange: number[];
    /** 
     * if not undefined this this is the final iteration to get the `t` of the 
     * other bezier curve too? 
     */
    last: Iteration | undefined;
}


export { Iteration }
