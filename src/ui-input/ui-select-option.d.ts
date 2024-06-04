export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: UI;
}
declare class UI {
    /** @param {UISelectOption} root */
    constructor(root: UISelectOption);
    set value(value: string);
    get value(): string;
    set selected(state: boolean);
    get selected(): boolean;
    #private;
}
export {};
