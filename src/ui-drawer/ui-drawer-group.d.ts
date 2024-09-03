/**
 * HTML: `ui-drawer-group`
 *
 * Attributes:
 *  - title: string
 *  - fold
 *  - nofold
 *
 * Slots:
 *  - *
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
