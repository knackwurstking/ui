/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    static defaultAttributes: {};
    constructor();
    ui: {
        root: this;
        /**
         * @returns {T}
         */
        readonly child: T;
        /**
         * @param {string | null} [value]
         */
        show(value?: string | null): void;
        hide(): void;
    };
    connectedCallback(): void;
    shadowRender(): void;
    render(): void;
}
