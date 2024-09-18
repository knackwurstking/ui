/**
 * @typedef UISearchEvents
 * @type {{
 *  input: string;
 *  storage: string;
 *  submit: string;
 * }}
 */
/**
 * HTML: `ui-search`
 *
 * Attributes:
 *  - **title**: `string`
 *  - **value**: `string`
 *  - **placeholder**: `string`
 *  - **invalid**: `boolean`
 *  - **nosubmit**: `boolean`
 *  - **storage**: `boolean`
 *  - **storageprefix**: `string`
 *  - **storagekey**: `string`
 *
 * Slots:
 *  - **title**
 *
 * @template {UISearchEvents} [E=UISearchEvents]
 */
export class UISearch<E extends UISearchEvents = UISearchEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    storagekey: string;
    ui: {
        root: this;
        /** @type {Events<E>} */
        events: Events<E>;
        /** @type {HTMLInputElement | null} */
        input: HTMLInputElement | null;
        /** @type {import("../ui-button").UIIconButton} */
        submit: import("../ui-button").UIIconButton;
        title: string;
        value: string;
        placeholder: string;
        invalid: boolean;
        nosubmit: boolean;
        storage: boolean;
        storageprefix: string;
        storagekey: string;
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
export type UISearchEvents = {
    input: string;
    storage: string;
    submit: string;
};
import { Events } from "../utils";
