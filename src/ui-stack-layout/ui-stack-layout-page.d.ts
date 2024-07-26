export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        name: string;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
