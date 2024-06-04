/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 * @extends {HTMLElement}
 */
export class UIInput<E extends import(".").UIInputEvents, T extends import(".").UIInputTypes> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    cleanup: CleanUp;
    /** @type {UI<UIInputEvents & E, T>} */
    ui: UI<UIInputEvents & E, T>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @private
     * @param {string | null} value
     * @returns {UIInputTypeValues[T]}
     */
    private parseNewValue;
}
export type UIInputEvents = import(".").UIInputEvents;
export type UIInputTypes = import(".").UIInputTypes;
export type UIInputTypeValues = import(".").UIInputTypeValues;
import { CleanUp } from "../js";
/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 */
declare class UI<E extends import(".").UIInputEvents, T extends import(".").UIInputTypes> {
    /**
     * @param {UIInput} root
     */
    constructor(root: UIInput<any, any>);
    /**
     * @private
     * @type {UIInput}
     */
    private root;
    /**
     * @type {events.Events<E>}
     */
    events: events.Events<E>;
    /**
     * @type {HTMLInputElement}
     */
    input: HTMLInputElement;
    /**
     * @param {string | null} v
     */
    set title(v: string);
    get title(): string;
    /**
     * @param {UIInputTypes} value
     */
    set type(value: import(".").UIInputTypes);
    /**
     * @returns {UIInputTypes}
     */
    get type(): import(".").UIInputTypes;
    /**
     * @param {UIInputTypeValues[T]} value
     */
    set value(value: import(".").UIInputTypeValues[T]);
    /**
     * @returns {UIInputTypeValues[T]}
     */
    get value(): import(".").UIInputTypeValues[T];
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
    /**
     * @param {UIInputTypeValues[T]} n
     */
    set min(n: import(".").UIInputTypeValues[T]);
    /**
     * @returns {UIInputTypeValues[T]}
     */
    get min(): import(".").UIInputTypeValues[T];
    /**
     * @param {UIInputTypeValues[T]} n
     */
    set max(n: import(".").UIInputTypeValues[T]);
    /**
     * @returns {UIInputTypeValues[T]}
     */
    get max(): import(".").UIInputTypeValues[T];
}
import { events } from "../js";
export {};
