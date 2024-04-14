/**
 * @typedef BaseOptions
 * @type {{
 *  id?: string;
 *  className?: string;
 *  style?: { [key: string]: string };
 *  elementCreationOptions?: ElementCreationOptions | null | undefined;
 *  attributes?: { [key: string]: string };
 * }}
 */
/**
 *@type {BaseOptions}
 */
export const defaultOptions: BaseOptions;
export default class Base {
    /**
     * @param {any} tagName
     * @param {BaseOptions | null} options
     */
    constructor(tagName: any, options?: BaseOptions | null);
    get element(): HTMLElement;
    set innerHTML(value: string);
    get innerHTML(): string;
    set innerText(value: string);
    get innerText(): string;
    #private;
}
export type BaseOptions = {
    id?: string;
    className?: string;
    style?: {
        [key: string]: string;
    };
    elementCreationOptions?: ElementCreationOptions | null | undefined;
    attributes?: {
        [key: string]: string;
    };
};
