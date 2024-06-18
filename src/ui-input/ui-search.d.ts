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
        /** @type {Events<E>} */
        events: Events<E>;
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
import { Events } from "../js";
