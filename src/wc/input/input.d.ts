/**
 * @template {InputEvents} E
 * @template {InputTypes} T
 * @extends {HTMLElement}
 */
export class Input<E extends InputEvents, T extends InputTypes> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    /** @type {UI<InputEvents & E, T>} */
    ui: UI<InputEvents & E, T>;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @private
     * @param {string | null} value
     * @returns {InputTypeValues[T]}
     */
    private parseNewValue;
}
export type InputEvents = {
    input: string | number;
    change: string | number;
};
export type InputTypes = ("text" | "number" | "month" | "date" | "email");
export type InputTypeValues = {
    text: string;
    number: number;
    month: string;
    date: string;
    email: string;
};
/**
 * @template {InputEvents} E
 * @template {InputTypes} T
 */
declare class UI<E extends InputEvents, T extends InputTypes> {
    /**
     * @param {Input} root
     */
    constructor(root: Input<any, any>);
    /**
     * @private
     * @type {Input}
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
     * @param {string} v
     */
    set title(v: string);
    get title(): string;
    /**
     * @param {InputTypes} value
     */
    set type(value: InputTypes);
    /**
     * @returns {InputTypes}
     */
    get type(): InputTypes;
    /**
     * @param {InputTypeValues[T]} value
     */
    set value(value: InputTypeValues[T]);
    /**
     * @returns {InputTypeValues[T]}
     */
    get value(): InputTypeValues[T];
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
     * @param {InputTypeValues[T]} n
     */
    set min(n: InputTypeValues[T]);
    /**
     * @returns {InputTypeValues[T]}
     */
    get min(): InputTypeValues[T];
    /**
     * @param {InputTypeValues[T]} n
     */
    set max(n: InputTypeValues[T]);
    /**
     * @returns {InputTypeValues[T]}
     */
    get max(): InputTypeValues[T];
}
import { Events } from "../../js/events";
export {};
