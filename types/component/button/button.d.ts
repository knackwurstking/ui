/**
 * @typedef ButtonOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 *  variant?: "full" | "outline" | "ghost";
 *  color?: "primary" | "secondary" | "destructive";
 *  ripple?: import("../../ripple").RippleOptions | boolean | null;
 * }}
 */
export default class Button extends base.Base {
    /**
     * @param {import("../base").BaseOptions & ButtonOptions} options
     */
    constructor(options?: import("../base").BaseOptions & ButtonOptions);
    /**
     * @param {ripple.RippleOptions | false | null} ripple
     */
    set ripple(ripple: false | ripple.RippleOptions);
    get ripple(): false | ripple.RippleOptions;
    /** @returns {HTMLButtonElement} */
    get element(): HTMLButtonElement;
    #private;
}
export type ButtonOptions = {
    text?: string;
    html?: string;
    variant?: "full" | "outline" | "ghost";
    color?: "primary" | "secondary" | "destructive";
    ripple?: import("../../ripple").RippleOptions | boolean | null;
};
import * as base from "../base";
import * as ripple from "../../ripple";
