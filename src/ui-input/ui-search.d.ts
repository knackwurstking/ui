/**
 * @template {UISearchEvents} E
 * @extends {HTMLElement}
 */
export class UISearch<E extends import(".").UISearchEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    cleanup: CleanUp;
    /** @type {UI<UISearchEvents & E>} */
    ui: UI<UISearchEvents & E>;
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
/**
 * @template {UISearchEvents} E
 */
declare class UI<E extends import(".").UISearchEvents> {
    /**
     * @param {UISearch} root
     */
    constructor(root: UISearch<any>);
    /**
     * @private
     * @type {UISearch}
     */
    private root;
    /**
     * @type {Events<E>}
     */
    events: Events<E>;
    /**
     * @type {HTMLInputElement}
     */
    input: HTMLInputElement;
    /**
     * @param {string | null} v
     */
    set title(v: string);
    get title(): string;
    set value(value: string | number | Number);
    get value(): string | number | Number;
    /**
     * @param {string} value
     */
    set placeholder(value: string);
    /**
     * @returns {string}
     */
    get placeholder(): string;
    /**
     * @param {boolean} state
     */
    set invalid(state: boolean);
    /**
     * @returns {boolean}
     */
    get invalid(): boolean;
}
import { Events } from "../js";
export {};
