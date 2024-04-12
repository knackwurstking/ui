export default class Base {
    /**
    * @param {any} tagName
    * @param {ElementCreationOptions} options
    */
    constructor(tagName: any, options?: ElementCreationOptions);
    get element(): HTMLElement;
    set innerHTML(value: string);
    get innerHTML(): string;
    set innerText(value: string);
    get innerText(): string;
    #private;
}
