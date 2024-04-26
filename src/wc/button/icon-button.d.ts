export class IconButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    connectedCallback(): void;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
