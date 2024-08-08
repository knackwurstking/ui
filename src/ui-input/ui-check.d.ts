export class UICheck extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /**
         * @type {import("../ui-text").UILabel | null}
         */
        label: import("../ui-text").UILabel | null;
        /**
         * @type {HTMLInputElement | null}
         */
        input: HTMLInputElement | null;
        primary: any;
        secondary: any;
        value: string;
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
