/**
 * @typedef SelectItem
 * @type {{
 *  value: string,
 *  label: string,
 *  selected?: boolean
 * }}
 *
 * @typedef SelectOptions
 * @type {{
 *  items?: SelectItem[];
 * }}
 */
export default class Select extends base.Base {
    /**
     * @param {import("../base").BaseOptions & SelectOptions} options
     */
    constructor(options?: import("../base").BaseOptions & SelectOptions);
    getItems(): SelectItem[];
    /**
     * @param {SelectItem[]} items
     */
    setItems(items: SelectItem[]): this;
    #private;
}
export type SelectItem = {
    value: string;
    label: string;
    selected?: boolean;
};
export type SelectOptions = {
    items?: SelectItem[];
};
import * as base from "../base";
