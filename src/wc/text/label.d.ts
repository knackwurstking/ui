export class Label extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
