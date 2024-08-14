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
 *  - title: string
 *  - value: string
 *  - palceholder: string
 *  - rows: number
 *  - cols: number
 *  - invalid
 *
 * Slots:
 *  - title
 *
 * @template {UITextarea_Events} E
 * @extends {HTMLElement}
 */
export class UITextarea<E extends UITextarea_Events> extends HTMLElement {
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
export type UITextarea_Events = {
    input: string;
    change: string;
};
import { Events } from "../utils";
