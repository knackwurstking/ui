export class UILangType extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        name: string;
        href: string;
        fallback: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
