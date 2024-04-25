export class LangType extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    name: string;
    href: string;
    fallback: boolean;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
