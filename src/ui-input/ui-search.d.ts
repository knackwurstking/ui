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
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /**
         * @type {boolean}
         */
        useStorage: boolean;
        /**
         * @type {string | null}
         */
        storagePrefix: string | null;
        /** @type {UIIconButton | null} */
        submit: UIIconButton | null;
        /** @type {HTMLInputElement | null} */
        input: HTMLInputElement | null;
        /** @type {Events<E>} */
        events: Events<E>;
        /**
         * Used as storage key, if enabled
         *
         *  @param {string | null} value
         */
        setKey(value: string | null): void;
        getKey(): string;
        hasSubmit(): boolean;
        disableSubmit(): void;
        enableSubmit(): void;
        /**
         * @param {string | null} value
         */
        setTitle(value: string | null): void;
        getTitle(): string;
        /**
         * @param {string | null} value
         */
        setValue(value: string | null): void;
        getValue(): string;
        /**
         * @param {string | null} value
         */
        setPlaceholder(value: string | null): void;
        /**
         * @returns {string}
         */
        getPlaceholder(): string;
        /**
         * @param {boolean} state
         */
        setInvalid(state: boolean): void;
        /**
         * @returns {boolean}
         */
        getInvalid(): boolean;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    shadowRender(): void;
}
export type UISearchEvents = {
    input: string;
    change: string;
    submit: string;
};
import { CleanUp } from "../js";
import { UIIconButton } from "../ui-button";
import { Events } from "../js";
