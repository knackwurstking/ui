export default class Button extends Base {
    /**
     * @param {Object} option
     * @param {"full" | "outline" | "ghost"} option.variant
     * @param {"primary" | "secondary" | "destructive"} option.color
     * @param {ElementCreationOptions | null | undefined} option.elementCreationOptions
     * @param {string} option.className
     * @param {{ [key: string]: string }} option.attributes
     */
    constructor({ variant, color, elementCreationOptions, className, attributes }: {
        variant: "full" | "outline" | "ghost";
        color: "primary" | "secondary" | "destructive";
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
