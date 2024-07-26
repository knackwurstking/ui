/**
 * @typedef UISearchEvents
 * @type {{
 *  input: string;
 *  change: string;
 *  submit: string;
 * }}
 */
/**
 * @template {UISearchEvents} E
 * @extends {HTMLElement}
 */
export class UISearch<E extends UISearchEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        root: this;
        /** @type {Events<E>} */
        events: Events<E>;
        /**
         * @param {FocusOptions | null} [options]
         */
        focus(options?: FocusOptions | null): void;
        blur(): void;
        title: string;
        value: string;
        placeholder: string;
        invalid: boolean;
        nosubmit: boolean;
        storage: boolean;
        storageprefix: string;
        storagekey: string;
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
    /**
     * @param {string | null} title
     */
    setTitle(title: string | null): void;
    /**
     * @param {string | null} value
     */
    setValue(value: string | null): void;
    /**
     * @param {string | null} placeholder
     */
    setPlaceholder(placeholder: string | null): void;
    /**
     * @param {string | null} invalid
     */
    setInvalid(invalid: string | null): void;
    /**
     * @param {string | null} nosubmit
     */
    setNoSubmit(nosubmit: string | null): void;
    /**
     * @param {string | null} value
     */
    setStorageKey(value: string | null): void;
}
export type UISearchEvents = {
    input: string;
    change: string;
    submit: string;
};
import { Events } from "../js";
