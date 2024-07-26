export class UIContainer extends HTMLElement {
    static register: () => void;
    ui: {};
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
