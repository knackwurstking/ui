export class FlexGrid extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    connectedCallback(): void;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    set gap(value: string);
    get gap(): string;
    #private;
}
