export class SelectOption extends HTMLElement {
    static register: () => void;
    ui: UI;
}
declare class UI {
    /** @param {SelectOption} root */
    constructor(root: SelectOption);
    set value(value: string);
    get value(): string;
    set selected(state: boolean);
    get selected(): boolean;
    #private;
}
export {};
