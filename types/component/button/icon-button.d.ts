/**
 * @typedef IconButtonOptions
 * @type {{
 *  icon?: string;
 *  ghost?: boolean;
 *  color?: "primary" | "secondary" | "destructive";
 *  ripple?: import("../../ripple").RippleOptions | false | null;
 * }}
 */
export default class IconButton extends base.Base {
    /**
     * @param {import("../base").BaseOptions & IconButtonOptions} options
     */
    constructor(options?: import("../base").BaseOptions & IconButtonOptions);
    /**
     * @param {ripple.RippleOptions | false | null} ripple
     */
    set ripple(ripple: false | ripple.RippleOptions);
    get ripple(): false | ripple.RippleOptions;
    /** @returns {HTMLButtonElement} */
    get element(): HTMLButtonElement;
    #private;
}
export type IconButtonOptions = {
    icon?: string;
    ghost?: boolean;
    color?: "primary" | "secondary" | "destructive";
    ripple?: import("../../ripple").RippleOptions | false | null;
};
import * as base from "../base";
import * as ripple from "../../ripple";
