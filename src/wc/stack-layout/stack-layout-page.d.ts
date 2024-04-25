export class StackLayoutPage extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    name: string;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
