/**
 * Observed Attributes:
 *  - **primary**   - [type: string]
 *  - **secondary**   - [type: string]
 *  - **ripple**    - [type: flag]
 *
 * Special Slots:
 *  - **input** - click handling if "ripple" flag is set
 */
export class UILabel extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @type {(() => void|Promise<void>) | null}
     */
    removeRipple: (() => void | Promise<void>) | null;
    /** @private */
    private running;
    /** @private */
    private onClick;
    /** @private */
    private onInputClick;
    ui: {
        root: this;
        ripple: boolean;
        primary: string;
        secondary: string;
        readonly inputSlot: any[];
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
    enableRipple(): void;
    disableRipple(): void;
}
