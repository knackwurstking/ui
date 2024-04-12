/**
 * @typedef IconButtonOptions
 * @type {{
 *  icon?: string;
 *  ghost?: boolean;
 *  color?: "primary" | "secondary" | "destructive";
 * }}
 */
export default class IconButton extends base.Base {
    /**
     * @param {Object & import("../base").BaseOptions & IconButtonOptions} options
     */
    constructor(options?: any & import("../base").BaseOptions & IconButtonOptions);
    /** @returns {HTMLButtonElement} */
    get element(): HTMLButtonElement;
}
export type IconButtonOptions = {
    icon?: string;
    ghost?: boolean;
    color?: "primary" | "secondary" | "destructive";
};
import * as base from "../base";
