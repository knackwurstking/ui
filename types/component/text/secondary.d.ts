/**
 * @typedef SecondaryOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 * }}
 */
export default class Secondary extends base.Base {
    /**
     * @param {import("../base").BaseOptions & SecondaryOptions} options
     */
    constructor(options?: import("../base").BaseOptions & SecondaryOptions);
}
export type SecondaryOptions = {
    text?: string;
    html?: string;
};
import * as base from "../base";
