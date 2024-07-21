/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    static defaultAttr: {};
    constructor();
    ui: {
        /** @private */
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
    shadowRender(): void;
    render(): void;
}
