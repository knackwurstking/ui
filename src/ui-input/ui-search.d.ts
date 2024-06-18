/**
 * @template {UISearchEvents} E
 * @extends {HTMLElement}
 */
export class UISearch<E extends import(".").UISearchEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    cleanup: CleanUp;
    ui: {
        root: this;
        submit: UIIconButton;
        input: HTMLInputElement;
        /** @type {Events<E>} */
        events: Events<E>;
        /**
         * @param {string | null} value
         */
        setTitle(value: string | null): void;
        getTitle(): string;
        setValue(value: any): void;
        getValue(): string;
        /**
         * @param {string} value
         */
        setPlaceholder(value: string): void;
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
}
export type UISearchEvents = import(".").UISearchEvents;
import { CleanUp } from "../js";
import { UIIconButton } from "../ui-button";
import { Events } from "../js";
