/**
 * HTML: `ui-check`
 *
 * Attributes:
 *  - **checked**: `boolean`
 */
export class UICheck extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /**
         * @type {HTMLInputElement | null}
         */
        input: HTMLInputElement | null;
        checked: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(name: string, _oV: string | null, nV: string | null): void;
}
