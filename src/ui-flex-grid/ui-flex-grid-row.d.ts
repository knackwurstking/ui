export class UIFlexGridRow extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /** @private */
    private gap;
    ui: {
        root: this;
        gap: string;
        justify: string;
        align: string;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
