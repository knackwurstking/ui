/**
 * @typedef PrimaryOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 * }}
 */
export default class Primary extends base.Base {
    /**
     * @param {import("../base").BaseOptions & PrimaryOptions} options
     */
    constructor(options?: import("../base").BaseOptions & PrimaryOptions);
}
export type PrimaryOptions = {
    text?: string;
    html?: string;
};
import * as base from "../base";
