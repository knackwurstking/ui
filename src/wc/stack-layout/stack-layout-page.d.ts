export class StackLayoutPage extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
declare class UI {
    name: string;
}
export {};
