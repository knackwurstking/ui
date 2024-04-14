/**
 * @typedef LabelOptions
 * @type {{
 *  input?: Element;
 *  primary?: string;
 *  secondary?: string;
 * }}
 */
export default class Label extends base.Base {
    /**
     * @param {import("../base").BaseOptions & LabelOptions} options
     */
    constructor(options?: import("../base").BaseOptions & LabelOptions);
}
export type LabelOptions = {
    input?: Element;
    primary?: string;
    secondary?: string;
};
import * as base from "../base";
