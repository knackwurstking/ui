/**
 * HTML: `ui-spinner`
 *
 * Attributes:
 *  - nobg
 */
export class UISpinner extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        root: this;
        nobg: boolean;
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
