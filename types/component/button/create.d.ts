/**
 * @typedef ButtonTypes
 * @type {import(".").ButtonTypes}
 */
/**
 * @param {Object} option
 * @param {ButtonTypes} option.type
 * @param {ElementCreationOptions | undefined} option.elementCreationOptions
 * @param {string} option.className
 * @param {{ [key: string]: string }} option.attributes
 */
export default function create({ type, elementCreationOptions, className, attributes }: {
    type: ButtonTypes;
    elementCreationOptions: ElementCreationOptions | undefined;
    className: string;
    attributes: {
        [key: string]: string;
    };
}): Button;
export type ButtonTypes = import(".").ButtonTypes;
import Button from "./button";
