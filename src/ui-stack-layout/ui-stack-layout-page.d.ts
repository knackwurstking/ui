/**
 * HTML: `ui-stack-layout-page`
 *
 * Attributes:
 *  - __name__: *string*
 *
 * Slots:
 *  - \*
 */
export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @param {string} name
     */
    constructor(name: string);
    _name: string;
    ui: {
        root: this;
        name: string;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} n
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(n: string, _oV: string | null, nV: string | null): void;
    #private;
}
