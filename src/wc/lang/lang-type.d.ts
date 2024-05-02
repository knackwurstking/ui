export class LangType extends HTMLElement {
    static register: () => void;
    ui: UI;
}
declare class UI {
    /**
    * @param {LangType} root
    */
    constructor(root: LangType);
    set name(value: string);
    get name(): string;
    set href(value: string);
    get href(): string;
    set fallback(state: boolean);
    get fallback(): boolean;
    #private;
}
export {};
