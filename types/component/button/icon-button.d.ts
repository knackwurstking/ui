export default class IconButton extends Base {
    /**
     * @param {Object} option
     * @param {string} option.icon - will be added to the innerHTML
     * @param {"primary" | "secondary" | "destructive"} option.color
     * @param {boolean} option.ghost
     * @param {ElementCreationOptions | null | undefined} option.elementCreationOptions
     * @param {string} option.className
     * @param {{ [key: string]: string }} option.attributes
     */
    constructor({ icon, color, ghost, elementCreationOptions, className, attributes }: {
        icon: string;
        color: "primary" | "secondary" | "destructive";
        ghost: boolean;
        elementCreationOptions: ElementCreationOptions | null | undefined;
        className: string;
        attributes: {
            [key: string]: string;
        };
    });
    /** @returns {HTMLButtonElement} */
    get element(): HTMLButtonElement;
}
import { Base } from "../base";
