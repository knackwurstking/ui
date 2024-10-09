/**
 * HTML: `ui-label`
 *
 * Attributes:
 *  - __primary__: *string*
 *  - __secondary__: *string*
 *  - __ripple__: *boolean* - this enables click forwarding
 *
 * Slots:
 *  - __inputs__ - inputs slot items get click forwarding if ripple is set
 *  - __\*__
 */
export class UILabel extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @type {import("../utils").Ripple | null}
     */
    ripple: import("../utils").Ripple | null;
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
    #private;
}
