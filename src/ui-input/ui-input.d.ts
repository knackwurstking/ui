/**
 * @typedef UIInput_Events
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 */
/**
 * HTML: `ui-input`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __type__: *string*
 *  - __value__: *string*
 *  - __placeholder__: *string*
 *  - __min__: *string*
 *  - __max__: *string*
 *  - __invalid__: *boolean*
 *
 * Slots:
 *  - __title__
 *
 * @template {UIInput_Events} [E=UIInput_Events]
 */
export class UIInput<E extends UIInput_Events = UIInput_Events> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        root: this;
        /** @type {Events<E>} */
        events: Events<E>;
        /** @type {HTMLInputElement | null} */
        input: HTMLInputElement | null;
        title: string;
        type: string;
        value: string;
        placeholder: string;
        invalid: boolean;
        min: string;
        max: string;
        /**
         * @param {FocusOptions | null} [options]
         */
        focus(options?: FocusOptions | null): void;
        blur(): void;
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
export type UIInput_Events = {
    input: string;
    change: string;
};
import { Events } from "../utils";
