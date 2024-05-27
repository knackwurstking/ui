/**
 * @template {InputEvents} T
 * @extends {HTMLElement}
 */
export class Input<T extends InputEvents> extends HTMLElement {
    static register: void;
    static observedAttributes: string[];
    constructor();
    /** @type {UI<InputEvents & T>} */
    ui: UI<InputEvents & T>;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /** @private */
    private create;
}
export type InputEvents = {};
export type InputTypes = ("text" | "number");
/**
 * @template {InputEvents} T
 */
declare class UI<T extends InputEvents> {
    /** @type {Events<T>} */
    events: Events<T>;
    /** @type {HTMLInputElement} */
    input: HTMLInputElement;
}
import { Events } from "../../js/events";
export {};
