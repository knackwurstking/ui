export class UILangType extends HTMLElement {
    static register: () => void;
    ui: UI;
}
declare class UI {
    /**
    * @param {UILangType} root
    */
    constructor(root: UILangType);
    set name(value: string);
    get name(): string;
    set href(value: string);
    get href(): string;
    set fallback(state: boolean);
    get fallback(): boolean;
    #private;
}
export {};
