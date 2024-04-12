/**
 * @typedef ButtonOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 *  variant?: "full" | "outline" | "ghost";
 *  color?: "primary" | "secondary" | "destructive";
 * }}
 */
export default class Button extends base.Base {
    /**
     * @param {import("../base").BaseOptions & ButtonOptions} options
     */
    constructor(options?: import("../base").BaseOptions & ButtonOptions);
    /** @returns {HTMLButtonElement} */
    get element(): HTMLButtonElement;
}
export type ButtonOptions = {
    text?: string;
    html?: string;
    variant?: "full" | "outline" | "ghost";
    color?: "primary" | "secondary" | "destructive";
};
import * as base from "../base";
