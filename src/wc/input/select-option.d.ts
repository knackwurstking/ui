export class SelectOption extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    type: string;
    /** @type {any | null} */
    value: any | null;
    selected: boolean;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
