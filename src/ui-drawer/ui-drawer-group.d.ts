/**
 * HTML: `ui-drawer-group`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __fold__: *boolean*
 *  - __nofold__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UIDrawerGroup extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        root: this;
        title: string;
        fold: boolean;
        nofold: boolean;
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
