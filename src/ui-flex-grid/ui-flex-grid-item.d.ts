/**
 * HTML: `ui-flex-grid-item`
 *
 * Attributes:
 *  - __flex__: *string*
 *
 * Slots:
 *  - __\*__
 */
export class UIFlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /** @private */
    private flex;
    ui: {
        root: this;
        flex: string;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
