/**
 * @typedef LabelOptions
 * @type {{
 *  input?: base.Base;
 *  primary?: string;
 *  secondary?: string;
 * }}
 */
export default class Label extends base.Base {
    /**
     * @param {import("../base").BaseOptions & LabelOptions} options
     */
    constructor(options?: import("../base").BaseOptions & LabelOptions);
    primary: Primary;
    secondary: Secondary;
    input: base.Base;
}
export type LabelOptions = {
    input?: base.Base;
    primary?: string;
    secondary?: string;
};
import * as base from "../base";
import Primary from "./primary";
import Secondary from "./secondary";
