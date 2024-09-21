/**
 * @typedef UITextarea_Events
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 */
/**
 * HTML: `ui-textarea`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __value__: *string*
 *  - __palceholder__: *string*
 *  - __rows__: *number*
 *  - __cols__: *number*
 *  - __invalid__: *boolean*
 *
 * Slots:
 *  - __title__
 *
 * @template {UITextarea_Events} [E=UITextarea_Events]
 */
export class UITextarea<E extends UITextarea_Events = UITextarea_Events> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        root: this;
        /** @type {Events<E>} */
        events: Events<E>;
        /** @type {HTMLTextAreaElement | null} */
        textarea: HTMLTextAreaElement | null;
        title: string;
        value: string;
        placeholder: string;
        invalid: boolean;
        rows: number;
        cols: number;
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
export type UITextarea_Events = {
    input: string;
    change: string;
};
import { Events } from "../utils";
