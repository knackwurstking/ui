export class SelectOption extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
declare class UI {
    /** @type {any | null} */
    value: any | null;
    selected: boolean;
}
export {};
