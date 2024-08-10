/**
 * @typedef UITextareaEvents
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 *
 * @typedef UITextareaTypes
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
 * @template {UITextareaEvents} E
 * @extends {HTMLElement}
 */
export class UITextarea<E extends UITextareaEvents> extends HTMLElement {
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
export type UITextareaEvents = {
    input: string;
    change: string;
};
export type UITextareaTypes = ("text" | "search" | "number" | "month" | "date" | "email");
import { Events } from "../utils";
