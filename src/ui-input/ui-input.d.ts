/**
 * @typedef UIInputTypes
 * @type {(
 *  | "text"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )}
 */
/**
 * @template {UIInputTypes} T
 * @extends {HTMLElement}
 */
export class UIInput<T extends UIInputTypes> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        root: this;
        /** @type {Events<{ input: string; change: string; }>} */
        events: Events<{
            input: string;
            change: string;
        }>;
        title: string;
        type: string;
        value: string;
        placeholder: string;
        invalid: boolean;
        min: string;
        max: string;
        /**
         * @param {FocusOptions | null} [options]
         */
        focus(options?: FocusOptions | null): void;
        blur(): void;
    };
    shadowRender(): void;
    render(): void;
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
     * @param {string | null} type
     */
    setType(type: string | null): void;
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
     * @param {string | null} min
     */
    setMin(min: string | null): void;
    /**
     * @param {string | null} max
     */
    setMax(max: string | null): void;
}
export type UIInputTypes = ("text" | "number" | "month" | "date" | "email");
import { Events } from "../js";
