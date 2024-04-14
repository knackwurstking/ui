/**
 * @typedef CheckboxOptions
 * @type {{
 *  items?: { value: string, label: string }[];
 * }}
 */
export default class Select extends base.Base {
    /**
     * @param {import("../base").BaseOptions & CheckboxOptions} options
     */
    constructor(options?: import("../base").BaseOptions & CheckboxOptions);
    getItems(): {
        value: string;
        label: string;
    }[];
    /**
     * @param {{ value: string, label: string }[]} items
     */
    setItems(items: {
        value: string;
        label: string;
    }[]): this;
    #private;
}
export type CheckboxOptions = {
    items?: {
        value: string;
        label: string;
    }[];
};
import * as base from "../base";
