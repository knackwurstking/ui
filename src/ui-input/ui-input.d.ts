/**
 * @typedef UIInputEvents
 * @type {{
 *  input: string | number;
 *  change: string | number;
 * }}
 *
 * @typedef UIInputTypes
 * @type {(
 *  | "text"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )}
 *
 * @typedef UIInputTypeValues
 * @type {{
 *  text: string;
 *  number: number;
 *  month: string;
 *  date: string;
 *  email: string;
 * }}
 */
/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 * @extends {HTMLElement}
 */
export class UIInput<E extends UIInputEvents, T extends UIInputTypes> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /** @type {HTMLInputElement | null} */
        input: HTMLInputElement | null;
        /**
         * @type {Events<E>}
         */
        events: Events<E>;
        /**
         * @param {string | null} v
         */
        setTitle(v: string | null): void;
        getTitle(): string;
        /**
         * @param {UIInputTypes | null} value
         */
        setType(value: UIInputTypes | null): void;
        /**
         * @returns {UIInputTypes}
         */
        getType(): UIInputTypes;
        /**
         * @param {UIInputTypeValues[T] | null} value
         */
        setValue(value: UIInputTypeValues[T] | null): void;
        /**
         * @returns {UIInputTypeValues[T]}
         */
        getValue(): UIInputTypeValues[T];
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
        /**
         * @param {UIInputTypeValues[T] | null} n
         */
        setMin(n: UIInputTypeValues[T] | null): void;
        /**
         * @returns {UIInputTypeValues[T]}
         */
        getMin(): UIInputTypeValues[T];
        /**
         * @param {UIInputTypeValues[T] | null} n
         */
        setMax(n: UIInputTypeValues[T] | null): void;
        /**
         * @returns {UIInputTypeValues[T]}
         */
        getMax(): UIInputTypeValues[T];
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    render(): void;
}
export type UIInputEvents = {
    input: string | number;
    change: string | number;
};
export type UIInputTypes = ("text" | "number" | "month" | "date" | "email");
export type UIInputTypeValues = {
    text: string;
    number: number;
    month: string;
    date: string;
    email: string;
};
import { CleanUp } from "../js";
import { Events } from "../js";
