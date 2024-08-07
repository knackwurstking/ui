/**
 * @typedef UIInputEvents
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 *
 * @typedef UIInputTypes
 * @type {(
 *  | "text"
 *  | "search"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )}
 */
/**
 * @template {UIInputEvents} E
 * @extends {HTMLElement}
 */
export class UIInput<E extends UIInputEvents> extends HTMLElement {
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
export type UIInputEvents = {
    input: string;
    change: string;
};
export type UIInputTypes = ("text" | "search" | "number" | "month" | "date" | "email");
import { Events } from "../js";
