export class FlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    connectedCallback(): void;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    set flex(value: string);
    get flex(): string;
    #private;
}
